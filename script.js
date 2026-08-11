const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const backTop = document.getElementById("backTop");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
    backTop.classList.add("show");
  } else {
    header.classList.remove("scrolled");
    backTop.classList.remove("show");
  }
});

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-links a").forEach(item => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});

backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
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

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();

  formMessage.textContent = "Message form is ready to connect.";

  form.reset();

  setTimeout(() => {
    formMessage.textContent = "";
  }, 4000);
});

const scene = document.querySelector(".scene");

if (scene && window.matchMedia("(pointer:fine)").matches) {
  scene.addEventListener("mousemove", event => {
    const rect = scene.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    scene.style.transform =
      `rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
  });

  scene.addEventListener("mouseleave", () => {
    scene.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}
