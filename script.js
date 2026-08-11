```javascript
const loader = document.getElementById("loader");
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursorRing");
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");
const topButton = document.getElementById("top");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hide");
    }, 900);
});

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll("a, button, .skill-box, .project-card").forEach((element) => {
    element.addEventListener("mouseenter", () => {
        cursorRing.style.width = "48px";
        cursorRing.style.height = "48px";
    });

    element.addEventListener("mouseleave", () => {
        cursorRing.style.width = "32px";
        cursorRing.style.height = "32px";
    });
});

menu.addEventListener("click", () => {
    nav.classList.toggle("open");
    menu.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menu.classList.remove("open");
    });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

function updateActiveLink() {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", () => {
    updateActiveLink();

    if (window.scrollY > 600) {
        topButton.classList.add("show");
    } else {
        topButton.classList.remove("show");
    }
});

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
});

const platform = document.querySelector(".platform");
const heroVisual = document.querySelector(".hero-visual");

if (platform && heroVisual && window.matchMedia("(pointer:fine)").matches) {
    heroVisual.addEventListener("mousemove", (event) => {
        const rect = heroVisual.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        platform.style.transform = `
            rotateX(${62 - y * 8}deg)
            rotateZ(${-28 + x * 8}deg)
        `;
    });

    heroVisual.addEventListener("mouseleave", () => {
        platform.style.transform = "rotateX(62deg) rotateZ(-28deg)";
    });
}

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = "Please complete all fields.";
        formMessage.style.color = "#ff756d";
        return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href =
        `mailto:muhammadfaizankhan525@gmail.com?subject=${subject}&body=${body}`;

    formMessage.textContent = "Opening your email client...";
    formMessage.style.color = "#78d59b";
});

document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        if (window.innerWidth < 820) return;

        const rect = card.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        card.style.transform = `
            perspective(900px)
            rotateX(${y * -3}deg)
            rotateY(${x * 3}deg)
            translateY(-8px)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        nav.classList.remove("open");
        menu.classList.remove("open");
    }
});

updateActiveLink();
```
