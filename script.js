"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const menu = document.getElementById("menu");
    const navLinks = document.getElementById("navLinks");
    const skillTabs = document.querySelectorAll(".skill-tab");
    const skillContents = document.querySelectorAll(".skill-content");
    const revealElements = document.querySelectorAll(".reveal");
    const sections = document.querySelectorAll("main section[id]");
    const projects = document.querySelectorAll(".project");
    const roadmapItems = document.querySelectorAll(".roadmap-item");
    const contactLinks = document.querySelectorAll(".contact-link");
    const yearElement = document.getElementById("year");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;

    let currentSection = "home";
    let lastScrollY = window.scrollY;
    let ticking = false;
    let menuOpen = false;
    let activeSkill = "frontend";
    let toastTimer = null;

    const CONFIG = {
        scrollOffset: 80,
        revealThreshold: 0.12,
        skillTransitionDuration: 350,
        toastDuration: 3200,
        cursorEnabled: !isTouchDevice && !prefersReducedMotion,
        tiltEnabled: !isTouchDevice && !prefersReducedMotion,
        particlesEnabled: !prefersReducedMotion,
        typingSpeed: 75,
        typingDeleteSpeed: 45,
        typingPause: 1500,
        maxParticles: 55
    };

    const utils = {
        clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        },

        lerp(start, end, amount) {
            return start + (end - start) * amount;
        },

        debounce(callback, delay) {
            let timeout;

            return (...args) => {
                clearTimeout(timeout);

                timeout = setTimeout(() => {
                    callback(...args);
                }, delay);
            };
        },

        throttle(callback, delay) {
            let waiting = false;

            return (...args) => {
                if (waiting) {
                    return;
                }

                callback(...args);
                waiting = true;

                setTimeout(() => {
                    waiting = false;
                }, delay);
            };
        },

        isElementVisible(element) {
            if (!element) {
                return false;
            }

            const rect = element.getBoundingClientRect();

            return (
                rect.bottom > 0 &&
                rect.top < window.innerHeight
            );
        },

        createElement(tag, className = "", text = "") {
            const element = document.createElement(tag);

            if (className) {
                element.className = className;
            }

            if (text) {
                element.textContent = text;
            }

            return element;
        },

        safeFocus(element) {
            if (!element) {
                return;
            }

            try {
                element.focus({
                    preventScroll: true
                });
            } catch {
                element.focus();
            }
        },

        prefersReducedMotion() {
            return window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;
        }
    };

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    function initializeNavigation() {
        if (!menu || !navLinks) {
            return;
        }

        menu.setAttribute("aria-label", "Toggle navigation");
        menu.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-controls", "navLinks");

        menu.addEventListener("click", () => {
            toggleMobileMenu();
        });

        const links = navLinks.querySelectorAll("a");

        links.forEach((link) => {
            link.addEventListener("click", () => {
                closeMobileMenu();
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });

        window.addEventListener(
            "resize",
            utils.debounce(() => {
                if (window.innerWidth > 760) {
                    closeMobileMenu();
                }
            }, 150)
        );
    }

    function toggleMobileMenu() {
        if (!menu || !navLinks) {
            return;
        }

        menuOpen = !menuOpen;

        menu.classList.toggle("open", menuOpen);
        navLinks.classList.toggle("open", menuOpen);

        menu.setAttribute(
            "aria-expanded",
            String(menuOpen)
        );

        body.classList.toggle(
            "menu-open",
            menuOpen
        );
    }

    function closeMobileMenu() {
        if (!menu || !navLinks) {
            return;
        }

        menuOpen = false;

        menu.classList.remove("open");
        navLinks.classList.remove("open");

        menu.setAttribute(
            "aria-expanded",
            "false"
        );

        body.classList.remove("menu-open");
    }

    function initializeSmoothScrolling() {
        const anchors = document.querySelectorAll(
            'a[href^="#"]'
        );

        anchors.forEach((anchor) => {
            anchor.addEventListener("click", (event) => {
                const href = anchor.getAttribute("href");

                if (!href || href === "#") {
                    event.preventDefault();
                    return;
                }

                const target = document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    CONFIG.scrollOffset;

                if (prefersReducedMotion) {
                    window.scrollTo(
                        0,
                        targetPosition
                    );
                } else {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }

                closeMobileMenu();
            });
        });
    }

    function initializeSkillTabs() {
        if (!skillTabs.length || !skillContents.length) {
            return;
        }

        skillTabs.forEach((tab) => {
            tab.setAttribute("role", "tab");

            tab.addEventListener("click", () => {
                const targetId =
                    tab.dataset.target;

                if (!targetId) {
                    return;
                }

                activateSkill(
                    targetId,
                    tab
                );
            });

            tab.addEventListener("keydown", (event) => {
                handleSkillKeyboard(
                    event,
                    tab
                );
            });
        });

        const initialTab =
            document.querySelector(
                ".skill-tab.active"
            );

        if (initialTab) {
            const initialTarget =
                initialTab.dataset.target;

            if (initialTarget) {
                activateSkill(
                    initialTarget,
                    initialTab,
                    true
                );
            }
        }
    }

    function activateSkill(
        targetId,
        clickedTab,
        instant = false
    ) {
        const target =
            document.getElementById(targetId);

        if (!target) {
            return;
        }

        activeSkill = targetId;

        skillTabs.forEach((tab) => {
            const isActive =
                tab === clickedTab ||
                tab.dataset.target === targetId;

            tab.classList.toggle(
                "active",
                isActive
            );

            tab.setAttribute(
                "aria-selected",
                String(isActive)
            );

            tab.setAttribute(
                "tabindex",
                isActive ? "0" : "-1"
            );
        });

        skillContents.forEach((content) => {
            const isActive =
                content.id === targetId;

            if (isActive) {
                if (instant || prefersReducedMotion) {
                    content.classList.add("active");
                    content.hidden = false;
                    content.style.opacity = "1";
                    content.style.transform =
                        "translateY(0)";
                } else {
                    content.style.opacity = "0";
                    content.style.transform =
                        "translateY(10px)";

                    content.hidden = false;

                    requestAnimationFrame(() => {
                        content.classList.add("active");
                        content.style.transition =
                            `opacity ${CONFIG.skillTransitionDuration}ms ease, transform ${CONFIG.skillTransitionDuration}ms ease`;

                        requestAnimationFrame(() => {
                            content.style.opacity = "1";
                            content.style.transform =
                                "translateY(0)";
                        });
                    });
                }
            } else {
                content.classList.remove("active");
                content.hidden = true;
                content.style.opacity = "";
                content.style.transform = "";
                content.style.transition = "";
            }
        });

        animateSkillTags(target);
    }

    function handleSkillKeyboard(event, currentTab) {
        const tabs = Array.from(skillTabs);

        const currentIndex =
            tabs.indexOf(currentTab);

        if (currentIndex === -1) {
            return;
        }

        let nextIndex = currentIndex;

        if (
            event.key === "ArrowRight" ||
            event.key === "ArrowDown"
        ) {
            nextIndex =
                (currentIndex + 1) %
                tabs.length;
        }

        if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowUp"
        ) {
            nextIndex =
                (currentIndex - 1 + tabs.length) %
                tabs.length;
        }

        if (nextIndex !== currentIndex) {
            event.preventDefault();

            const nextTab =
                tabs[nextIndex];

            nextTab.focus();

            activateSkill(
                nextTab.dataset.target,
                nextTab
            );
        }

        if (event.key === "Home") {
            event.preventDefault();

            const firstTab = tabs[0];

            firstTab.focus();

            activateSkill(
                firstTab.dataset.target,
                firstTab
            );
        }

        if (event.key === "End") {
            event.preventDefault();

            const lastTab =
                tabs[tabs.length - 1];

            lastTab.focus();

            activateSkill(
                lastTab.dataset.target,
                lastTab
            );
        }
    }

    function animateSkillTags(container) {
        if (!container) {
            return;
        }

        const tags =
            container.querySelectorAll(".tag");

        tags.forEach((tag, index) => {
            tag.style.setProperty(
                "--tag-index",
                index
            );

            if (prefersReducedMotion) {
                tag.style.opacity = "1";
                tag.style.transform =
                    "translateY(0)";
                return;
            }

            tag.style.opacity = "0";
            tag.style.transform =
                "translateY(8px)";

            setTimeout(() => {
                tag.style.transition =
                    "opacity 0.35s ease, transform 0.35s ease";

                tag.style.opacity = "1";
                tag.style.transform =
                    "translateY(0)";
            }, index * 35);
        });
    }

    function initializeRevealAnimations() {
        if (!revealElements.length) {
            return;
        }

        if (
            prefersReducedMotion ||
            !("IntersectionObserver" in window)
        ) {
            revealElements.forEach((element) => {
                element.classList.add("in");
            });

            return;
        }

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add("in");

                        observerInstance.unobserve(
                            entry.target
                        );
                    });
                },
                {
                    threshold:
                        CONFIG.revealThreshold,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    }

    function initializeActiveNavigation() {
        if (!sections.length || !navLinks) {
            return;
        }

        const navAnchors =
            navLinks.querySelectorAll("a");

        const updateNavigation = () => {
            let activeId = currentSection;

            sections.forEach((section) => {
                const rect =
                    section.getBoundingClientRect();

                if (
                    rect.top <=
                    CONFIG.scrollOffset + 100
                ) {
                    activeId = section.id;
                }
            });

            if (activeId === currentSection) {
                return;
            }

            currentSection = activeId;

            navAnchors.forEach((link) => {
                const href =
                    link.getAttribute("href");

                const isActive =
                    href === `#${activeId}`;

                link.classList.toggle(
                    "active",
                    isActive
                );
            });
        };

        window.addEventListener(
            "scroll",
            utils.throttle(
                updateNavigation,
                50
            ),
            {
                passive: true
            }
        );

        updateNavigation();
    }

    function initializeNavbarScroll() {
        const navbar =
            document.querySelector(".navbar");

        if (!navbar) {
            return;
        }

        let previousY = window.scrollY;

        const updateNavbar = () => {
            const currentY =
                window.scrollY;

            navbar.classList.toggle(
                "scrolled",
                currentY > 20
            );

            if (
                currentY > previousY &&
                currentY > 150 &&
                !menuOpen
            ) {
                navbar.classList.add(
                    "nav-hidden"
                );
            } else {
                navbar.classList.remove(
                    "nav-hidden"
                );
            }

            previousY = currentY;
        };

        window.addEventListener(
            "scroll",
            utils.throttle(
                updateNavbar,
                50
            ),
            {
                passive: true
            }
        );

        updateNavbar();
    }

    function initializeScrollProgress() {
        const progress =
            utils.createElement(
                "div",
                "scroll-progress"
            );

        progress.setAttribute(
            "aria-hidden",
            "true"
        );

        Object.assign(
            progress.style,
            {
                position: "fixed",
                top: "0",
                left: "0",
                width: "0%",
                height: "3px",
                zIndex: "9999",
                background:
                    "linear-gradient(90deg, #8f7cff, #62d8ff)",
                transition:
                    "width 0.08s linear",
                pointerEvents: "none"
            }
        );

        body.appendChild(progress);

        const updateProgress = () => {
            const scrollTop =
                window.scrollY;

            const documentHeight =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;

            if (documentHeight <= 0) {
                progress.style.width = "0%";
                return;
            }

            const percentage =
                utils.clamp(
                    (scrollTop /
                        documentHeight) *
                        100,
                    0,
                    100
                );

            progress.style.width =
                `${percentage}%`;
        };

        window.addEventListener(
            "scroll",
            utils.throttle(
                updateProgress,
                30
            ),
            {
                passive: true
            }
        );

        updateProgress();
    }

    function initializeBackToTop() {
        const button =
            utils.createElement(
                "button",
                "back-to-top",
                "↑"
            );

        button.type = "button";

        button.setAttribute(
            "aria-label",
            "Back to top"
        );

        Object.assign(
            button.style,
            {
                position: "fixed",
                right: "24px",
                bottom: "24px",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(15,16,20,0.85)",
                color: "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                zIndex: "100",
                opacity: "0",
                visibility: "hidden",
                transform: "translateY(10px)",
                transition:
                    "opacity .25s ease, visibility .25s ease, transform .25s ease, background .25s ease"
            }
        );

        body.appendChild(button);

        const updateButton = () => {
            const visible =
                window.scrollY > 500;

            button.style.opacity =
                visible ? "1" : "0";

            button.style.visibility =
                visible ? "visible" : "hidden";

            button.style.transform =
                visible
                    ? "translateY(0)"
                    : "translateY(10px)";
        };

        button.addEventListener(
            "mouseenter",
            () => {
                button.style.background =
                    "rgba(255,255,255,0.14)";
            }
        );

        button.addEventListener(
            "mouseleave",
            () => {
                button.style.background =
                    "rgba(15,16,20,0.85)";
            }
        );

        button.addEventListener(
            "click",
            () => {
                window.scrollTo({
                    top: 0,
                    behavior: prefersReducedMotion
                        ? "auto"
                        : "smooth"
                });
            }
        );

        window.addEventListener(
            "scroll",
            utils.throttle(
                updateButton,
                50
            ),
            {
                passive: true
            }
        );
    }

    function initializeHeroTyping() {
        const heroBio =
            document.querySelector(
                ".hero-bio"
            );

        if (!heroBio) {
            return;
        }

        const originalText =
            heroBio.textContent.trim();

        if (!originalText) {
            return;
        }

        const roles = [
            "Full Stack Developer focused on MERN, Python and AI.",
            "Building modern web applications.",
            "Exploring AI with Python.",
            "Learning. Building. Improving."
        ];

        if (
            prefersReducedMotion ||
            window.innerWidth < 600
        ) {
            return;
        }

        let roleIndex = 0;
        let characterIndex = originalText.length;
        let deleting = true;

        heroBio.textContent =
            originalText;

        setTimeout(() => {
            typeRole();
        }, 2500);

        function typeRole() {
            const currentRole =
                roles[roleIndex];

            if (deleting) {
                characterIndex--;

                heroBio.textContent =
                    currentRole.substring(
                        0,
                        characterIndex
                    );

                if (characterIndex <= 0) {
                    deleting = false;
                    roleIndex =
                        (roleIndex + 1) %
                        roles.length;
                }

                setTimeout(
                    typeRole,
                    CONFIG.typingDeleteSpeed
                );
            } else {
                characterIndex++;

                heroBio.textContent =
                    currentRole.substring(
                        0,
                        characterIndex
                    );

                if (
                    characterIndex >=
                    currentRole.length
                ) {
                    deleting = true;

                    setTimeout(
                        typeRole,
                        CONFIG.typingPause
                    );

                    return;
                }

                setTimeout(
                    typeRole,
                    CONFIG.typingSpeed
                );
            }
        }
    }

    function initializeCodeAnimation() {
        const codeBody =
            document.querySelector(
                ".code-body"
            );

        if (!codeBody) {
            return;
        }

        const lines =
            Array.from(
                codeBody.children
            );

        if (
            prefersReducedMotion ||
            !lines.length
        ) {
            return;
        }

        lines.forEach((line, index) => {
            line.style.opacity = "0";
            line.style.transform =
                "translateX(-8px)";

            setTimeout(() => {
                line.style.transition =
                    "opacity .35s ease, transform .35s ease";

                line.style.opacity = "1";
                line.style.transform =
                    "translateX(0)";
            }, 300 + index * 90);
        });
    }

    function initializeProjectInteractions() {
        if (!projects.length) {
            return;
        }

        projects.forEach((project, index) => {
            project.dataset.projectIndex =
                String(index + 1);

            project.setAttribute(
                "tabindex",
                "0"
            );

            project.addEventListener(
                "keydown",
                (event) => {
                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {
                        const link =
                            project.querySelector(
                                ".project-link"
                            );

                        if (link) {
                            event.preventDefault();
                            link.click();
                        }
                    }
                }
            );

            project.addEventListener(
                "mouseenter",
                () => {
                    project.classList.add(
                        "project-hover"
                    );
                }
            );

            project.addEventListener(
                "mouseleave",
                () => {
                    project.classList.remove(
                        "project-hover"
                    );
                }
            );
        });
    }

    function initializeProjectLinks() {
        const links =
            document.querySelectorAll(
                ".project-link"
            );

        links.forEach((link) => {
            const href =
                link.getAttribute("href");

            if (
                !href ||
                href === "#"
            ) {
                link.addEventListener(
                    "click",
                    (event) => {
                        event.preventDefault();

                        showToast(
                            "Project link will be added soon.",
                            "info"
                        );
                    }
                );
            }

            link.addEventListener(
                "click",
                () => {
                    link.classList.add(
                        "clicked"
                    );

                    setTimeout(() => {
                        link.classList.remove(
                            "clicked"
                        );
                    }, 500);
                }
            );
        });
    }

    function initializeRoadmap() {
        if (!roadmapItems.length) {
            return;
        }

        roadmapItems.forEach(
            (item, index) => {
                item.dataset.step =
                    String(index + 1);

                item.addEventListener(
                    "click",
                    () => {
                        roadmapItems.forEach(
                            (other) => {
                                other.classList.remove(
                                    "selected"
                                );
                            }
                        );

                        item.classList.add(
                            "selected"
                        );
                    }
                );
            }
        );
    }

    function initializeContactLinks() {
        contactLinks.forEach((link) => {
            link.addEventListener(
                "mouseenter",
                () => {
                    link.classList.add(
                        "contact-hover"
                    );
                }
            );

            link.addEventListener(
                "mouseleave",
                () => {
                    link.classList.remove(
                        "contact-hover"
                    );
                }
            );

            const href =
                link.getAttribute("href");

            if (
                href &&
                href.startsWith("mailto:")
            ) {
                link.addEventListener(
                    "contextmenu",
                    () => {
                        saveContactEmail();
                    }
                );
            }
        });
    }

    function saveContactEmail() {
        const email =
            "muhammadfaizankhan525@gmail.com";

        try {
            localStorage.setItem(
                "faizan-email",
                email
            );
        } catch {
            return;
        }
    }

    function initializeEmailCopy() {
        const emailLinks =
            document.querySelectorAll(
                'a[href^="mailto:"]'
            );

        emailLinks.forEach((link) => {
            link.addEventListener(
                "click",
                async () => {
                    const email =
                        link.href
                            .replace(
                                "mailto:",
                                ""
                            )
                            .split("?")[0];

                    if (
                        navigator.clipboard &&
                        window.isSecureContext
                    ) {
                        try {
                            await navigator.clipboard.writeText(
                                email
                            );

                            showToast(
                                "Email copied to clipboard.",
                                "success"
                            );
                        } catch {
                            return;
                        }
                    }
                }
            );
        });
    }

    function createToastContainer() {
        let container =
            document.querySelector(
                ".toast-container"
            );

        if (container) {
            return container;
        }

        container =
            utils.createElement(
                "div",
                "toast-container"
            );

        Object.assign(
            container.style,
            {
                position: "fixed",
                right: "24px",
                bottom: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                zIndex: "10000",
                pointerEvents: "none"
            }
        );

        body.appendChild(container);

        return container;
    }

    function showToast(
        message,
        type = "info"
    ) {
        const container =
            createToastContainer();

        const toast =
            utils.createElement(
                "div",
                `toast toast-${type}`
            );

        toast.textContent = message;

        Object.assign(
            toast.style,
            {
                minWidth: "240px",
                maxWidth: "360px",
                padding: "13px 16px",
                borderRadius: "10px",
                border:
                    "1px solid rgba(255,255,255,.12)",
                background:
                    "rgba(18,19,23,.96)",
                color: "#f5f5f5",
                fontSize: "13px",
                lineHeight: "1.4",
                boxShadow:
                    "0 15px 45px rgba(0,0,0,.35)",
                transform:
                    "translateY(12px)",
                opacity: "0",
                transition:
                    "opacity .25s ease, transform .25s ease",
                pointerEvents: "auto"
            }
        );

        if (type === "success") {
            toast.style.borderColor =
                "rgba(98,216,166,.35)";
        }

        if (type === "error") {
            toast.style.borderColor =
                "rgba(255,95,95,.35)";
        }

        if (type === "info") {
            toast.style.borderColor =
                "rgba(120,150,255,.35)";
        }

        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = "1";
            toast.style.transform =
                "translateY(0)";
        });

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform =
                "translateY(10px)";

            setTimeout(() => {
                toast.remove();

                if (
                    !container.children.length
                ) {
                    container.remove();
                }
            }, 300);
        }, CONFIG.toastDuration);
    }

    function initializeCursorGlow() {
        if (!CONFIG.cursorEnabled) {
            return;
        }

        const glow =
            utils.createElement(
                "div",
                "cursor-glow"
            );

        Object.assign(
            glow.style,
            {
                position: "fixed",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: "0",
                background:
                    "radial-gradient(circle, rgba(130,110,255,.08), transparent 68%)",
                transform:
                    "translate(-50%, -50%)",
                left: "0",
                top: "0",
                opacity: "0",
                transition:
                    "opacity .3s ease"
            }
        );

        body.appendChild(glow);

        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener(
            "mousemove",
            (event) => {
                mouseX = event.clientX;
                mouseY = event.clientY;

                glow.style.opacity = "1";
            },
            {
                passive: true
            }
        );

        document.addEventListener(
            "mouseleave",
            () => {
                glow.style.opacity = "0";
            }
        );

        function animate() {
            currentX =
                utils.lerp(
                    currentX,
                    mouseX,
                    0.08
                );

            currentY =
                utils.lerp(
                    currentY,
                    mouseY,
                    0.08
                );

            glow.style.left =
                `${currentX}px`;

            glow.style.top =
                `${currentY}px`;

            requestAnimationFrame(
                animate
            );
        }

        animate();
    }

    function initializeTiltCards() {
        if (!CONFIG.tiltEnabled) {
            return;
        }

        const cards = document.querySelectorAll(
            ".project, .skill-panel, .contact-box, .hero-code"
        );

        cards.forEach((card) => {
            let rect;

            card.addEventListener(
                "mouseenter",
                () => {
                    rect =
                        card.getBoundingClientRect();

                    card.style.transition =
                        "transform .15s ease";
                }
            );

            card.addEventListener(
                "mousemove",
                (event) => {
                    if (!rect) {
                        rect =
                            card.getBoundingClientRect();
                    }

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -3;

                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        3;

                    card.style.transform =
                        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
                }
            );

            card.addEventListener(
                "mouseleave",
                () => {
                    card.style.transform =
                        "";

                    rect = null;
                }
            );
        });
    }

    function initializeMagneticButtons() {
        if (
            !CONFIG.tiltEnabled
        ) {
            return;
        }

        const buttons =
            document.querySelectorAll(
                ".btn, .project-link, .contact-link"
            );

        buttons.forEach((button) => {
            button.addEventListener(
                "mousemove",
                (event) => {
                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `translate(${x * 0.08}px, ${y * 0.08}px)`;
                }
            );

            button.addEventListener(
                "mouseleave",
                () => {
                    button.style.transform =
                        "";
                }
            );
        });
    }

    function initializeParallax() {
        if (
            prefersReducedMotion
        ) {
            return;
        }

        const hero =
            document.querySelector(
                ".hero"
            );

        const code =
            document.querySelector(
                ".hero-code"
            );

        const heroTitle =
            document.querySelector(
                ".hero h1"
            );

        if (!hero) {
            return;
        }

        window.addEventListener(
            "scroll",
            utils.throttle(() => {
                const scroll =
                    window.scrollY;

                if (
                    scroll >
                    window.innerHeight
                ) {
                    return;
                }

                if (code) {
                    code.style.transform =
                        `translateY(${scroll * 0.08}px)`;
                }

                if (heroTitle) {
                    heroTitle.style.transform =
                        `translateY(${scroll * 0.025}px)`;
                }
            }, 16),
            {
                passive: true
            }
        );
    }

    function initializeParticles() {
        if (
            !CONFIG.particlesEnabled
        ) {
            return;
        }

        const canvas =
            document.createElement(
                "canvas"
            );

        canvas.className =
            "portfolio-particles";

        Object.assign(
            canvas.style,
            {
                position: "fixed",
                inset: "0",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: "-1",
                opacity: "0.35"
            }
        );

        body.prepend(canvas);

        const context =
            canvas.getContext("2d");

        if (!context) {
            canvas.remove();
            return;
        }

        let width = 0;
        let height = 0;
        let particles = [];
        let animationFrame;

        const resize = () => {
            const ratio =
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                );

            width =
                window.innerWidth;

            height =
                window.innerHeight;

            canvas.width =
                width * ratio;

            canvas.height =
                height * ratio;

            canvas.style.width =
                `${width}px`;

            canvas.style.height =
                `${height}px`;

            context.setTransform(
                ratio,
                0,
                0,
                ratio,
                0,
                0
            );

            createParticles();
        };

        const createParticles = () => {
            const count =
                Math.min(
                    Math.floor(
                        (width * height) /
                        24000
                    ),
                    CONFIG.maxParticles
                );

            particles =
                Array.from(
                    {
                        length: count
                    },
                    () => ({
                        x:
                            Math.random() *
                            width,
                        y:
                            Math.random() *
                            height,
                        radius:
                            Math.random() *
                                1.5 +
                            0.4,
                        speedX:
                            (Math.random() -
                                0.5) *
                            0.18,
                        speedY:
                            (Math.random() -
                                0.5) *
                            0.18,
                        opacity:
                            Math.random() *
                                0.4 +
                            0.1
                    })
                );
        };

        const draw = () => {
            context.clearRect(
                0,
                0,
                width,
                height
            );

            particles.forEach(
                (particle) => {
                    particle.x +=
                        particle.speedX;

                    particle.y +=
                        particle.speedY;

                    if (
                        particle.x <
                        -10
                    ) {
                        particle.x =
                            width + 10;
                    }

                    if (
                        particle.x >
                        width + 10
                    ) {
                        particle.x = -10;
                    }

                    if (
                        particle.y <
                        -10
                    ) {
                        particle.y =
                            height + 10;
                    }

                    if (
                        particle.y >
                        height + 10
                    ) {
                        particle.y = -10;
                    }

                    context.beginPath();

                    context.arc(
                        particle.x,
                        particle.y,
                        particle.radius,
                        0,
                        Math.PI * 2
                    );

                    context.fillStyle =
                        `rgba(150,140,255,${particle.opacity})`;

                    context.fill();
                }
            );

            animationFrame =
                requestAnimationFrame(
                    draw
                );
        };

        window.addEventListener(
            "resize",
            utils.debounce(
                resize,
                150
            )
        );

        resize();
        draw();

        window.addEventListener(
            "beforeunload",
            () => {
                cancelAnimationFrame(
                    animationFrame
                );
            }
        );
    }

    function initializeSectionGlow() {
        const sections =
            document.querySelectorAll(
                ".section, .hero"
            );

        sections.forEach((section) => {
            section.addEventListener(
                "mousemove",
                (event) => {
                    if (
                        isTouchDevice
                    ) {
                        return;
                    }

                    const rect =
                        section.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    section.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );

                    section.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );
                }
            );
        });
    }

    function initializeTagInteractions() {
        const tags =
            document.querySelectorAll(
                ".tag"
            );

        tags.forEach((tag) => {
            tag.addEventListener(
                "mouseenter",
                () => {
                    tag.classList.add(
                        "tag-active"
                    );
                }
            );

            tag.addEventListener(
                "mouseleave",
                () => {
                    tag.classList.remove(
                        "tag-active"
                    );
                }
            );
        });
    }

    function initializeLogoInteraction() {
        const logo =
            document.querySelector(
                ".logo"
            );

        const logoMark =
            document.querySelector(
                ".logo-mark"
            );

        if (!logo || !logoMark) {
            return;
        }

        logo.addEventListener(
            "mouseenter",
            () => {
                logoMark.classList.add(
                    "logo-active"
                );
            }
        );

        logo.addEventListener(
            "mouseleave",
            () => {
                logoMark.classList.remove(
                    "logo-active"
                );
            }
        );

        logo.addEventListener(
            "click",
            () => {
                logoMark.animate(
                    [
                        {
                            transform:
                                "rotate(0deg) scale(1)"
                        },
                        {
                            transform:
                                "rotate(360deg) scale(1.12)"
                        },
                        {
                            transform:
                                "rotate(360deg) scale(1)"
                        }
                    ],
                    {
                        duration: 600,
                        easing:
                            "cubic-bezier(.2,.8,.2,1)"
                    }
                );
            }
        );
    }

    function initializeStatusPulse() {
        const status =
            document.querySelector(
                ".status"
            );

        const dot =
            document.querySelector(
                ".status-dot"
            );

        if (!status || !dot) {
            return;
        }

        if (
            prefersReducedMotion
        ) {
            return;
        }

        setInterval(() => {
            dot.animate(
                [
                    {
                        transform:
                            "scale(1)",
                        opacity: "1"
                    },
                    {
                        transform:
                            "scale(1.5)",
                        opacity: "0.45"
                    },
                    {
                        transform:
                            "scale(1)",
                        opacity: "1"
                    }
                ],
                {
                    duration: 1400,
                    easing: "ease-in-out"
                }
            );
        }, 2800);
    }

    function initializeHeroCodeInteraction() {
        const code =
            document.querySelector(
                ".hero-code"
            );

        if (!code) {
            return;
        }

        const codeBody =
            code.querySelector(
                ".code-body"
            );

        if (!codeBody) {
            return;
        }

        code.addEventListener(
            "click",
            () => {
                code.classList.toggle(
                    "code-focused"
                );

                showToast(
                    "Developer mode activated.",
                    "info"
                );
            }
        );
    }

    function initializeKeyboardShortcuts() {
        document.addEventListener(
            "keydown",
            (event) => {
                if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.altKey
                ) {
                    return;
                }

                if (
                    event.key.toLowerCase() ===
                    "h"
                ) {
                    const target =
                        document.getElementById(
                            "home"
                        );

                    if (target) {
                        target.scrollIntoView({
                            behavior:
                                prefersReducedMotion
                                    ? "auto"
                                    : "smooth"
                        });
                    }
                }

                if (
                    event.key.toLowerCase() ===
                    "s"
                ) {
                    const target =
                        document.getElementById(
                            "skills"
                        );

                    if (target) {
                        target.scrollIntoView({
                            behavior:
                                prefersReducedMotion
                                    ? "auto"
                                    : "smooth"
                        });
                    }
                }

                if (
                    event.key.toLowerCase() ===
                    "w"
                ) {
                    const target =
                        document.getElementById(
                            "work"
                        );

                    if (target) {
                        target.scrollIntoView({
                            behavior:
                                prefersReducedMotion
                                    ? "auto"
                                    : "smooth"
                        });
                    }
                }

                if (
                    event.key.toLowerCase() ===
                    "c"
                ) {
                    const target =
                        document.getElementById(
                            "contact"
                        );

                    if (target) {
                        target.scrollIntoView({
                            behavior:
                                prefersReducedMotion
                                    ? "auto"
                                    : "smooth"
                        });
                    }
                }
            }
        );
    }

    function initializeStorage() {
        const storageKey =
            "faizan-portfolio";

        const defaults = {
            lastSkill: "frontend",
            visits: 0
        };

        let settings = defaults;

        try {
            const stored =
                localStorage.getItem(
                    storageKey
                );

            if (stored) {
                settings =
                    Object.assign(
                        {},
                        defaults,
                        JSON.parse(stored)
                    );
            }

            settings.visits += 1;

            localStorage.setItem(
                storageKey,
                JSON.stringify(settings)
            );
        } catch {
            settings = defaults;
        }

        if (
            settings.lastSkill &&
            document.getElementById(
                settings.lastSkill
            )
        ) {
            const tab =
                document.querySelector(
                    `.skill-tab[data-target="${settings.lastSkill}"]`
                );

            if (tab) {
                activateSkill(
                    settings.lastSkill,
                    tab,
                    true
                );
            }
        }

        skillTabs.forEach((tab) => {
            tab.addEventListener(
                "click",
                () => {
                    try {
                        const stored =
                            localStorage.getItem(
                                storageKey
                            );

                        const current =
                            stored
                                ? JSON.parse(
                                      stored
                                  )
                                : defaults;

                        current.lastSkill =
                            tab.dataset.target;

                        localStorage.setItem(
                            storageKey,
                            JSON.stringify(
                                current
                            )
                        );
                    } catch {
                        return;
                    }
                }
            );
        });
    }

    function initializeExternalLinks() {
        const externalLinks =
            document.querySelectorAll(
                'a[target="_blank"]'
            );

        externalLinks.forEach((link) => {
            const rel =
                link.getAttribute("rel") ||
                "";

            if (!rel.includes("noopener")) {
                link.setAttribute(
                    "rel",
                    `${rel} noopener noreferrer`.trim()
                );
            }
        });
    }

    function initializeImageLazyLoading() {
        const images =
            document.querySelectorAll(
                "img"
            );

        images.forEach((image) => {
            if (
                !image.hasAttribute(
                    "loading"
                )
            ) {
                image.setAttribute(
                    "loading",
                    "lazy"
                );
            }

            if (
                !image.hasAttribute(
                    "decoding"
                )
            ) {
                image.setAttribute(
                    "decoding",
                    "async"
                );
            }
        });
    }

    function initializePageVisibility() {
        document.addEventListener(
            "visibilitychange",
            () => {
                if (
                    document.hidden
                ) {
                    body.classList.add(
                        "page-hidden"
                    );
                } else {
                    body.classList.remove(
                        "page-hidden"
                    );
                }
            }
        );
    }

    function initializeScrollState() {
        const update = () => {
            const current =
                window.scrollY;

            if (
                current > 10
            ) {
                body.classList.add(
                    "has-scrolled"
                );
            } else {
                body.classList.remove(
                    "has-scrolled"
                );
            }

            if (
                current > lastScrollY
            ) {
                body.classList.add(
                    "scrolling-down"
                );

                body.classList.remove(
                    "scrolling-up"
                );
            } else if (
                current < lastScrollY
            ) {
                body.classList.add(
                    "scrolling-up"
                );

                body.classList.remove(
                    "scrolling-down"
                );
            }

            lastScrollY = current;
        };

        window.addEventListener(
            "scroll",
            utils.throttle(
                update,
                40
            ),
            {
                passive: true
            }
        );
    }

    function initializeFocusManagement() {
        document.addEventListener(
            "focusin",
            (event) => {
                const target =
                    event.target;

                if (
                    target.matches(
                        "a, button, input, textarea, select"
                    )
                ) {
                    target.classList.add(
                        "keyboard-focus"
                    );
                }
            }
        );

        document.addEventListener(
            "focusout",
            (event) => {
                event.target.classList.remove(
                    "keyboard-focus"
                );
            }
        );
    }

    function initializeIntersectionCounters() {
        const counters =
            document.querySelectorAll(
                "[data-count]"
            );

        if (!counters.length) {
            return;
        }

        if (
            prefersReducedMotion
        ) {
            counters.forEach((counter) => {
                counter.textContent =
                    counter.dataset.count;
            });

            return;
        }

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {
                    entries.forEach((entry) => {
                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        animateCounter(
                            entry.target
                        );

                        observerInstance.unobserve(
                            entry.target
                        );
                    });
                },
                {
                    threshold: 0.5
                }
            );

        counters.forEach((counter) => {
            observer.observe(counter);
        });
    }

    function animateCounter(counter) {
        const target =
            Number(
                counter.dataset.count
            );

        if (
            Number.isNaN(target)
        ) {
            return;
        }

        const duration = 1200;
        const startTime =
            performance.now();

        const update = (time) => {
            const elapsed =
                time - startTime;

            const progress =
                utils.clamp(
                    elapsed /
                        duration,
                    0,
                    1
                );

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            counter.textContent =
                Math.floor(
                    target * eased
                );

            if (progress < 1) {
                requestAnimationFrame(
                    update
                );
            } else {
                counter.textContent =
                    target;
            }
        };

        requestAnimationFrame(
            update
        );
    }

    function initializeDynamicGreeting() {
        const status =
            document.querySelector(
                ".status"
            );

        if (!status) {
            return;
        }

        const hour =
            new Date().getHours();

        let greeting =
            "Building with code";

        if (
            hour >= 5 &&
            hour < 12
        ) {
            greeting =
                "Good morning · building with code";
        } else if (
            hour >= 12 &&
            hour < 18
        ) {
            greeting =
                "Good afternoon · building with code";
        } else if (
            hour >= 18 &&
            hour < 23
        ) {
            greeting =
                "Good evening · building with code";
        } else {
            greeting =
                "Late-night coding mode";
        }

        status.setAttribute(
            "data-greeting",
            greeting
        );
    }

    function initializeEasterEgg() {
        let sequence = "";
        const secret =
            "faizan";

        document.addEventListener(
            "keydown",
            (event) => {
                if (
                    event.key.length !== 1
                ) {
                    return;
                }

                sequence +=
                    event.key.toLowerCase();

                if (
                    sequence.length >
                    secret.length
                ) {
                    sequence =
                        sequence.slice(
                            -secret.length
                        );
                }

                if (
                    sequence ===
                    secret
                ) {
                    sequence = "";

                    showToast(
                        "Welcome to Faizan's developer portfolio.",
                        "success"
                    );

                    document.body.classList.add(
                        "developer-mode"
                    );

                    setTimeout(() => {
                        document.body.classList.remove(
                            "developer-mode"
                        );
                    }, 3000);
                }
            }
        );
    }

    function initializeResizeObserver() {
        if (
            !("ResizeObserver" in window)
        ) {
            return;
        }

        const hero =
            document.querySelector(
                ".hero"
            );

        if (!hero) {
            return;
        }

        const observer =
            new ResizeObserver(
                (entries) => {
                    entries.forEach(
                        (entry) => {
                            const width =
                                entry
                                    .contentRect
                                    .width;

                            hero.dataset.layout =
                                width < 700
                                    ? "mobile"
                                    : "desktop";
                        }
                    );
                }
            );

        observer.observe(hero);
    }

    function initializeOnlineStatus() {
        const update = () => {
            if (!navigator.onLine) {
                showToast(
                    "You are currently offline.",
                    "error"
                );
            }
        };

        window.addEventListener(
            "offline",
            update
        );

        window.addEventListener(
            "online",
            () => {
                showToast(
                    "Connection restored.",
                    "success"
                );
            }
        );
    }

    function initializePrintSupport() {
        window.addEventListener(
            "beforeprint",
            () => {
                body.classList.add(
                    "printing"
                );
            }
        );

        window.addEventListener(
            "afterprint",
            () => {
                body.classList.remove(
                    "printing"
                );
            }
        );
    }

    function initializeContextProtection() {
        document.addEventListener(
            "contextmenu",
            (event) => {
                const isFormField =
                    event.target.closest(
                        "input, textarea"
                    );

                if (!isFormField) {
                    return;
                }
            }
        );
    }

    function initializeLinkPrefetch() {
        if (
            isTouchDevice ||
            prefersReducedMotion
        ) {
            return;
        }

        const links =
            document.querySelectorAll(
                "a"
            );

        links.forEach((link) => {
            const href =
                link.getAttribute(
                    "href"
                );

            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("mailto:")
            ) {
                return;
            }

            link.addEventListener(
                "mouseenter",
                () => {
                    if (
                        document.querySelector(
                            `link[rel="prefetch"][href="${href}"]`
                        )
                    ) {
                        return;
                    }

                    const prefetch =
                        document.createElement(
                            "link"
                        );

                    prefetch.rel =
                        "prefetch";

                    prefetch.href =
                        href;

                    document.head.appendChild(
                        prefetch
                    );
                },
                {
                    once: true
                }
            );
        });
    }

    function initializePageLoadAnimation() {
        if (
            prefersReducedMotion
        ) {
            body.classList.add(
                "page-loaded"
            );

            return;
        }

        requestAnimationFrame(() => {
            body.classList.add(
                "page-loaded"
            );
        });
    }

    function initializeHeroMouseEffect() {
        if (
            !CONFIG.tiltEnabled
        ) {
            return;
        }

        const hero =
            document.querySelector(
                ".hero"
            );

        const content =
            document.querySelector(
                ".hero-grid"
            );

        if (!hero || !content) {
            return;
        }

        hero.addEventListener(
            "mousemove",
            (event) => {
                const rect =
                    hero.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const percentX =
                    x / rect.width -
                    0.5;

                const percentY =
                    y / rect.height -
                    0.5;

                content.style.transform =
                    `perspective(1200px) rotateY(${percentX * 1.5}deg) rotateX(${percentY * -1.5}deg)`;
            }
        );

        hero.addEventListener(
            "mouseleave",
            () => {
                content.style.transform =
                    "";
            }
        );
    }

    function initializeSectionEntrance() {
        const headings =
            document.querySelectorAll(
                ".section-heading"
            );

        headings.forEach((heading) => {
            heading.addEventListener(
                "mouseenter",
                () => {
                    heading.classList.add(
                        "heading-hover"
                    );
                }
            );

            heading.addEventListener(
                "mouseleave",
                () => {
                    heading.classList.remove(
                        "heading-hover"
                    );
                }
            );
        });
    }

    function initializeProjectNumbers() {
        projects.forEach(
            (project, index) => {
                const number =
                    project.querySelector(
                        ".project-number"
                    );

                if (!number) {
                    return;
                }

                const formatted =
                    String(index + 1)
                        .padStart(
                            2,
                            "0"
                        );

                number.textContent =
                    formatted;
            }
        );
    }

    function initializeRoadmapNumbers() {
        roadmapItems.forEach(
            (item, index) => {
                const number =
                    item.querySelector(
                        ".roadmap-number"
                    );

                if (!number) {
                    return;
                }

                number.textContent =
                    String(index + 1)
                        .padStart(
                            2,
                            "0"
                        );
            }
        );
    }

    function initializeSkillIcons() {
        const icons =
            document.querySelectorAll(
                ".skill-icon"
            );

        icons.forEach((icon) => {
            icon.addEventListener(
                "mouseenter",
                () => {
                    if (
                        prefersReducedMotion
                    ) {
                        return;
                    }

                    icon.animate(
                        [
                            {
                                transform:
                                    "translateY(0) rotate(0)"
                            },
                            {
                                transform:
                                    "translateY(-5px) rotate(3deg)"
                            },
                            {
                                transform:
                                    "translateY(0) rotate(0)"
                            }
                        ],
                        {
                            duration: 450,
                            easing:
                                "cubic-bezier(.2,.8,.2,1)"
                        }
                    );
                }
            );
        });
    }

    function initializeDocumentTitle() {
        const originalTitle =
            document.title;

        document.addEventListener(
            "visibilitychange",
            () => {
                if (
                    document.hidden
                ) {
                    document.title =
                        "Come back soon · Faizan";
                } else {
                    document.title =
                        originalTitle;
                }
            }
        );
    }

    function initializeScrollToSectionFromHash() {
        const hash =
            window.location.hash;

        if (!hash) {
            return;
        }

        const target =
            document.querySelector(
                hash
            );

        if (!target) {
            return;
        }

        setTimeout(() => {
            const position =
                target.getBoundingClientRect()
                    .top +
                window.scrollY -
                CONFIG.scrollOffset;

            window.scrollTo({
                top: position,
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"
            });
        }, 100);
    }

    function initializeHashTracking() {
        window.addEventListener(
            "hashchange",
            () => {
                const hash =
                    window.location.hash;

                if (!hash) {
                    return;
                }

                const target =
                    document.querySelector(
                        hash
                    );

                if (!target) {
                    return;
                }

                currentSection =
                    target.id;
            }
        );
    }

    function initializeFormDetection() {
        const forms =
            document.querySelectorAll(
                "form"
            );

        forms.forEach((form) => {
            form.addEventListener(
                "submit",
                () => {
                    form.classList.add(
                        "form-submitting"
                    );
                }
            );
        });
    }

    function initializeAccessibility() {
        const interactive =
            document.querySelectorAll(
                "button, a"
            );

        interactive.forEach((element) => {
            if (
                element.tagName ===
                    "BUTTON" &&
                !element.getAttribute(
                    "type"
                )
            ) {
                element.setAttribute(
                    "type",
                    "button"
                );
            }
        });

        skillContents.forEach(
            (content) => {
                content.setAttribute(
                    "role",
                    "tabpanel"
                );

                content.setAttribute(
                    "aria-live",
                    "polite"
                );
            }
        );
    }

    function initializePerformanceHints() {
        if (
            "requestIdleCallback" in
            window
        ) {
            window.requestIdleCallback(
                () => {
                    initializeLinkPrefetch();
                }
            );
        }
    }

    function initializeAll() {
        initializeNavigation();
        initializeSmoothScrolling();
        initializeSkillTabs();
        initializeRevealAnimations();
        initializeActiveNavigation();
        initializeNavbarScroll();
        initializeScrollProgress();
        initializeBackToTop();
        initializeHeroTyping();
        initializeCodeAnimation();
        initializeProjectInteractions();
        initializeProjectLinks();
        initializeRoadmap();
        initializeContactLinks();
        initializeEmailCopy();
        initializeCursorGlow();
        initializeTiltCards();
        initializeMagneticButtons();
        initializeParallax();
        initializeParticles();
        initializeSectionGlow();
        initializeTagInteractions();
        initializeLogoInteraction();
        initializeStatusPulse();
        initializeHeroCodeInteraction();
        initializeKeyboardShortcuts();
        initializeStorage();
        initializeExternalLinks();
        initializeImageLazyLoading();
        initializePageVisibility();
        initializeScrollState();
        initializeFocusManagement();
        initializeIntersectionCounters();
        initializeDynamicGreeting();
        initializeEasterEgg();
        initializeResizeObserver();
        initializeOnlineStatus();
        initializePrintSupport();
        initializeContextProtection();
        initializePageLoadAnimation();
        initializeHeroMouseEffect();
        initializeSectionEntrance();
        initializeProjectNumbers();
        initializeRoadmapNumbers();
        initializeSkillIcons();
        initializeDocumentTitle();
        initializeScrollToSectionFromHash();
        initializeHashTracking();
        initializeFormDetection();
        initializeAccessibility();
        initializePerformanceHints();
    }

    initializeAll();
});
