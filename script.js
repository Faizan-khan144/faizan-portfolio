const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const codeLines = [
  { indent: 0, text: "const developer = {" },
  { indent: 1, key: "name", value: "Muhammad Faizan Khan" },
  { indent: 1, key: "role", value: "Front-End Developer" },
  { indent: 1, key: "based", value: "Pakistan" },
  { indent: 1, keyword: "stack", value: '["HTML5", "CSS3", "JavaScript"]' },
  { indent: 1, key: "learning", value: "React.js" },
  { indent: 1, key: "status", value: "open to work", last: true },
  { indent: 0, text: "};" }
];

function highlightLine(line) {
  if (line.text) {
    return `<span class="tok-punct">${line.text}</span>`;
  }
  const comma = line.last ? "" : ",";
  if (line.keyword) {
    return `<span class="tok-key">${line.keyword}</span><span class="tok-punct">: </span><span class="tok-punct">${line.value}${comma}</span>`;
  }
  return `<span class="tok-key">${line.key}</span><span class="tok-punct">: </span><span class="tok-string">"${line.value}"</span><span class="tok-punct">${comma}</span>`;
}

function plainLine(line) {
  const indent = "  ".repeat(line.indent);
  if (line.text) return indent + line.text;
  const comma = line.last ? "" : ",";
  if (line.keyword) return `${indent}${line.keyword}: ${line.value}${comma}`;
  return `${indent}${line.key}: "${line.value}"${comma}`;
}

function buildEditor() {
  const container = document.getElementById("editorLines");
  if (!container) return;

  if (prefersReducedMotion) {
    codeLines.forEach((line, i) => {
      const row = document.createElement("div");
      row.className = "editor-line";
      row.innerHTML = `<span class="editor-line-num">${i + 1}</span><span class="editor-line-code">${"  ".repeat(line.indent)}${highlightLine(line)}</span>`;
      container.appendChild(row);
    });
    return;
  }

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= codeLines.length) return;

    const line = codeLines[lineIndex];
    const row = document.createElement("div");
    row.className = "editor-line";
    const numSpan = document.createElement("span");
    numSpan.className = "editor-line-num";
    numSpan.textContent = lineIndex + 1;
    const codeSpan = document.createElement("span");
    codeSpan.className = "editor-line-code";
    row.appendChild(numSpan);
    row.appendChild(codeSpan);
    container.appendChild(row);

    const full = plainLine(line);
    let charIndex = 0;
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    codeSpan.appendChild(cursor);

    const typer = setInterval(() => {
      charIndex++;
      codeSpan.textContent = full.slice(0, charIndex);
      codeSpan.appendChild(cursor);
      if (charIndex >= full.length) {
        clearInterval(typer);
        codeSpan.innerHTML = "  ".repeat(line.indent) + highlightLine(line);
        lineIndex++;
        setTimeout(typeLine, 90);
      }
    }, 18);
  }

  typeLine();
}

function setupNav() {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.classList.toggle("open", isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

function setupReveals() {
  const items = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const message = document.getElementById("cMessage").value.trim();

    if (!name || !email || !message) {
      note.textContent = "Please fill in every field before sending.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:muhammadfaizankhan525@gmail.com?subject=${subject}&body=${body}`;

    note.textContent = "Your email client should now be open with the message ready to send.";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildEditor();
  setupNav();
  setupReveals();
  setupContactForm();
});
