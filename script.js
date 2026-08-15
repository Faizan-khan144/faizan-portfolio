const loader = document.getElementById("loader");
const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const backTop = document.getElementById("backTop");

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const revealElements = document.querySelectorAll(".reveal");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

window.addEventListener("load", () => {
  setTimeout(() => {
    loader?.classList.add("hide");
  }, 500);
});

const updateHeader = () => {
  const scrolled = window.scrollY > 60;

  header?.classList.toggle("scrolled", scrolled);
  backTop?.classList.toggle("show", scrolled);
};

window.addEventListener("scroll", updateHeader, {
  passive: true
});

updateHeader();

menuBtn?.addEventListener("click", () => {
  const open = nav?.classList.toggle("open");

  menuBtn.setAttribute(
    "aria-expanded",
    String(open)
  );

  document.body.classList.toggle(
    "menu-open",
    open
  );
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");

    menuBtn?.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove("menu-open");
  });
});

backTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: reducedMotion ? "auto" : "smooth"
  });
});

if (reducedMotion) {
  revealElements.forEach(element => {
    element.classList.add("show");
  });
} else {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
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

  revealElements.forEach(element => {
    observer.observe(element);
  });
}

const updateActiveSection = () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 220;

    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
};

window.addEventListener("scroll", updateActiveSection, {
  passive: true
});

updateActiveSection();

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start"
    });
  });
});

if (!reducedMotion) {
  document.querySelectorAll(".service-card, .skill, .process-card, .developer-card, .featured-project").forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform .35s ease, box-shadow .35s ease";
    });
  });
}
