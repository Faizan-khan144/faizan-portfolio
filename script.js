const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const backTop = document.getElementById("backTop");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const scene = document.getElementById("scene");

const navItems = document.querySelectorAll(".nav-links a");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const sections = document.querySelectorAll("section[id]");
const revealElements = document.querySelectorAll(".reveal");
const magneticElements = document.querySelectorAll(".magnetic");
const projectCards = document.querySelectorAll(".project-card");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const finePointer = window.matchMedia(
  "(pointer: fine)"
).matches;

const updateHeader = () => {
  const scrolled = window.scrollY > 60;

  header.classList.toggle("scrolled", scrolled);
  backTop.classList.toggle("show", scrolled);
};

window.addEventListener("scroll", updateHeader, {
  passive: true
});

updateHeader();

const closeMobileMenu = () => {
  mobileMenu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

menuBtn.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");

  menuBtn.setAttribute(
    "aria-expanded",
    String(open)
  );

  document.body.classList.toggle(
    "menu-open",
    open
  );
});

mobileLinks.forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

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

if (reducedMotion) {
  revealElements.forEach(element => {
    element.classList.add("show");
  });
} else {
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

const updateActiveSection = () => {
  let current = "home";

  sections.forEach(section => {
    const sectionTop =
      section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navItems.forEach(link => {
    const target =
      link.getAttribute("href");

    link.classList.toggle(
      "active",
      target === `#${current}`
    );
  });
};

window.addEventListener(
  "scroll",
  updateActiveSection,
  {
    passive: true
  }
);

updateActiveSection();

backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: reducedMotion
      ? "auto"
      : "smooth"
  });
});

if (scene && finePointer && !reducedMotion) {
  scene.addEventListener("mousemove", event => {
    const rect =
      scene.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    const rotateY = x * 14;
    const rotateX = -y * 14;

    scene.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  scene.addEventListener("mouseleave", () => {
    scene.style.transform =
      "rotateX(0deg) rotateY(0deg)";
  });
}

if (finePointer && !reducedMotion) {
  projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

      const rect =
        card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width;

      const y =
        (event.clientY - rect.top) /
        rect.height;

      const rotateX =
        (0.5 - y) * 6;

      const rotateY =
        (x - 0.5) * 7;

      card.style.transform = `
        perspective(1100px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

if (finePointer && !reducedMotion) {

  const cursorDot =
    document.querySelector(".cursor-dot");

  const cursorRing =
    document.querySelector(".cursor-ring");

  document.addEventListener(
    "mousemove",
    event => {

      cursorDot.style.left =
        `${event.clientX}px`;

      cursorDot.style.top =
        `${event.clientY}px`;

      cursorRing.style.left =
        `${event.clientX}px`;

      cursorRing.style.top =
        `${event.clientY}px`;
    }
  );

  const interactiveElements =
    document.querySelectorAll(
      "a, button, input, textarea"
    );

  interactiveElements.forEach(element => {

    element.addEventListener("mouseenter", () => {
      cursorRing.style.width = "52px";
      cursorRing.style.height = "52px";
      cursorRing.style.background =
        "rgba(37, 99, 235, 0.08)";
    });

    element.addEventListener("mouseleave", () => {
      cursorRing.style.width = "34px";
      cursorRing.style.height = "34px";
      cursorRing.style.background =
        "transparent";
    });
  });
}

if (finePointer && !reducedMotion) {

  magneticElements.forEach(element => {

    element.addEventListener(
      "mousemove",
      event => {

        const rect =
          element.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        element.style.transform =
          `translate(${x * 0.16}px, ${y * 0.16}px)`;
      }
    );

    element.addEventListener(
      "mouseleave",
      () => {
        element.style.transform =
          "translate(0, 0)";
      }
    );
  });
}

form.addEventListener("submit", event => {

  event.preventDefault();

  const name =
    document.getElementById("name").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const message =
    document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMessage.textContent =
      "Please complete all fields.";

    return;
  }

  const subject =
    encodeURIComponent(
      `Portfolio Contact — ${name}`
    );

  const body =
    encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

  formMessage.textContent =
    "Opening your email application...";

  window.location.href =
    `mailto:muhammadfaizankhan525@gmail.com?subject=${subject}&body=${body}`;

  setTimeout(() => {
    formMessage.textContent = "";
  }, 5000);
});

document
  .querySelectorAll(".project-title-link, .project-arrow")
  .forEach(link => {

    link.addEventListener("click", event => {
      event.stopPropagation();
    });

  });

window.addEventListener("resize", () => {

  if (window.innerWidth > 1050) {
    closeMobileMenu();
  }

});
