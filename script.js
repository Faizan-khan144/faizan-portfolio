const loader = document.getElementById("loader");
const header = document.querySelector(".header");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const backTop = document.getElementById("backTop");
const scene = document.getElementById("scene");
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hide");
    }, 1600);
});

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
    backTop.classList.toggle("show", window.scrollY > 500);

    updateActiveNav();
});

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
    });
});

backTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.12
    }
);

reveals.forEach(element => {
    revealObserver.observe(element);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 160;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.count);
            let current = 0;

            const duration = 1300;
            const start = performance.now();

            function animate(time) {
                const progress = Math.min((time - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);

                current = Math.floor(target * eased);
                counter.textContent = current + (target === 100 ? "%" : "+");

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }

            requestAnimationFrame(animate);
            counterObserver.unobserve(counter);
        });
    },
    {
        threshold: 0.7
    }
);

counters.forEach(counter => {
    counterObserver.observe(counter);
});

if (scene && window.matchMedia("(pointer: fine)").matches) {
    scene.parentElement.addEventListener("mousemove", event => {
        const rect = scene.parentElement.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 16;
        const rotateX = (0.5 - y) * 12;

        scene.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    scene.parentElement.addEventListener("mouseleave", () => {
        scene.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
}

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", event => {
    event.preventDefault();

    formMessage.textContent = "Message interface ready — connect your form backend.";

    setTimeout(() => {
        formMessage.textContent = "";
    }, 5000);
});

const particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );
}

function createParticles() {
    particles.length = 0;

    const amount = Math.min(
        Math.floor(window.innerWidth / 7),
        180
    );

    for (let i = 0; i < amount; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 1.6 + 0.3,
            speed: Math.random() * 0.25 + 0.05,
            opacity: Math.random() * 0.5 + 0.1,
            drift: Math.random() * 0.4 - 0.2
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach(particle => {
        particle.y -= particle.speed;
        particle.x += particle.drift;

        if (particle.y < -10) {
            particle.y = window.innerHeight + 10;
            particle.x = Math.random() * window.innerWidth;
        }

        if (particle.x < -10) {
            particle.x = window.innerWidth + 10;
        }

        if (particle.x > window.innerWidth + 10) {
            particle.x = -10;
        }

        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(117, 168, 255, ${particle.opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
});

document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", event => {
        const target = document.querySelector(
            anchor.getAttribute("href")
        );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });
    });
});
