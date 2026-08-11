const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const backTop = document.querySelector(".back-top");
const cursorGlow = document.querySelector(".cursor-glow");
const form = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");
const year = document.querySelector("#year");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");
const editor = document.querySelector(".editor");

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
        backTop.classList.add("visible");
    } else {
        backTop.classList.remove("visible");
    }

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    menuButton.classList.toggle("open");
});

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuButton.classList.remove("open");
    });
});

backTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

document.addEventListener("mousemove", event => {
    if (!cursorGlow) return;

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
});

if (editor && window.matchMedia("(pointer:fine)").matches) {
    editor.addEventListener("mousemove", event => {
        const rect = editor.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 7;
        const rotateX = ((y / rect.height) - 0.5) * -7;

        editor.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-3px)
        `;
    });

    editor.addEventListener("mouseleave", () => {
        editor.style.transform = "";
    });
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const button = form.querySelector(".submit-button");

    button.innerHTML = "Message Sent ✓";
    button.style.background = "#69d89b";

    formMessage.textContent = "Thanks! Your message has been received.";

    form.reset();

    setTimeout(() => {
        button.innerHTML = `Send Message <span>↗</span>`;
        button.style.background = "";
        formMessage.textContent = "";
    }, 3500);
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const target = document.querySelector(link.getAttribute("href"));

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});
