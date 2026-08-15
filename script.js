const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const backTop = document.getElementById("backTop");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const scene = document.querySelector(".scene");
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");
const projectCards = document.querySelectorAll(".project-card");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer:fine)").matches;

const updateHeader = () => {
  const scrolled = window.scrollY > 80;

  header?.classList.toggle("scrolled", scrolled);
  backTop?.classList.toggle("show", scrolled);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuBtn?.addEventListener("click", () => {
  const isOpen = mobileMenu?.classList.toggle("open");

  menuBtn.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu?.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

navItems.forEach(link => {
  link.addEventListener("click", () => {
    navItems.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});

backTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: reducedMotion ? "auto" : "smooth"
  });
});

if (!reducedMotion) {
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

  document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach(element => {
    element.classList.add("show");
  });
}

const updateActiveSection = () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 160;

    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navItems.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
};

window.addEventListener("scroll", updateActiveSection, { passive: true });
updateActiveSection();

form?.addEventListener("submit", event => {
  event.preventDefault();

  const submitButton = form.querySelector(".submit");

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerHTML = 'Message Ready <span>✓</span>';
  }

  if (formMessage) {
    formMessage.textContent =
      "Thanks. The form is ready to be connected to a backend service.";
  }

  form.reset();

  setTimeout(() => {
    if (formMessage) {
      formMessage.textContent = "";
    }

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Send Message <span>↗</span>';
    }
  }, 4000);
});

if (scene && finePointer && !reducedMotion) {
  scene.addEventListener("mousemove", event => {
    const rect = scene.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    scene.style.transform = `
      rotateX(${-y * 10}deg)
      rotateY(${x * 10}deg)
      translateZ(10px)
    `;
  });

  scene.addEventListener("mouseleave", () => {
    scene.style.transform =
      "rotateX(0deg) rotateY(0deg) translateZ(0)";
  });
}

if (finePointer && !reducedMotion) {
  projectCards.forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      card.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        translateZ(12px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0)";
    });
  });
}

if (finePointer && !reducedMotion) {
  document.addEventListener("mousemove", event => {
    document.documentElement.style.setProperty(
      "--cursor-x",
      `${event.clientX}px`
    );

    document.documentElement.style.setProperty(
      "--cursor-y",
      `${event.clientY}px`
    );
  });
}

document.querySelectorAll(".project-link, .project-title-link").forEach(link => {
  link.addEventListener("click", event => {
    event.stopPropagation();
  });
});
