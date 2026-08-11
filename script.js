const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    burger.classList.toggle('open', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.classList.remove('open');
    });
  });
}

const skillsTabs = document.querySelectorAll('.skills-tab');
const skillsGrids = document.querySelectorAll('.skills-grid');

skillsTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-tab');

    skillsTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    skillsGrids.forEach(grid => {
      if (grid.getAttribute('data-panel') === target) {
        grid.hidden = false;
      } else {
        grid.hidden = true;
      }
    });
  });
});

const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

const editorLinesEl = document.getElementById('editorLines');

const editorCode = [
  { key: 'const', punct: ' developer = {' },
  { indent: 1, key: 'name', punct: ': ', string: "'Muhammad Faizan Khan'", punct2: ',' },
  { indent: 1, key: 'role', punct: ': ', string: "'Full Stack Developer'", punct2: ',' },
  { indent: 1, key: 'stack', punct: ': ', string: "['MERN', 'Python', 'AI']", punct2: ',' },
  { indent: 1, key: 'location', punct: ': ', string: "'Pakistan'", punct2: ',' },
  { indent: 1, key: 'status', punct: ': ', string: "'available for work'" },
  { punct: '};' },
  { punct: '' },
  { keyword: 'export default', punct: ' developer;' }
];

function buildLine(lineNumber) {
  const line = document.createElement('div');
  line.className = 'editor-line';

  const num = document.createElement('span');
  num.className = 'editor-line-num';
  num.textContent = String(lineNumber);

  const code = document.createElement('span');
  code.className = 'editor-line-code';

  line.appendChild(num);
  line.appendChild(code);
  return { line, code };
}

function renderTokens(codeEl, tokenSpec) {
  codeEl.innerHTML = '';

  if (tokenSpec.indent) {
    codeEl.appendChild(document.createTextNode('  '.repeat(tokenSpec.indent)));
  }

  if (tokenSpec.keyword) {
    const span = document.createElement('span');
    span.className = 'tok-keyword';
    span.textContent = tokenSpec.keyword;
    codeEl.appendChild(span);
  }

  if (tokenSpec.key) {
    const span = document.createElement('span');
    span.className = 'tok-key';
    span.textContent = tokenSpec.key;
    codeEl.appendChild(span);
  }

  if (tokenSpec.punct) {
    const span = document.createElement('span');
    span.className = 'tok-punct';
    span.textContent = tokenSpec.punct;
    codeEl.appendChild(span);
  }

  if (tokenSpec.string) {
    const span = document.createElement('span');
    span.className = 'tok-string';
    span.textContent = tokenSpec.string;
    codeEl.appendChild(span);
  }

  if (tokenSpec.punct2) {
    const span = document.createElement('span');
    span.className = 'tok-punct';
    span.textContent = tokenSpec.punct2;
    codeEl.appendChild(span);
  }
}

function typeEditor() {
  if (!editorLinesEl) return;

  editorLinesEl.innerHTML = '';
  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= editorCode.length) {
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      const lastLine = editorLinesEl.lastElementChild;
      if (lastLine) {
        lastLine.querySelector('.editor-line-code').appendChild(cursor);
      }
      return;
    }

    const spec = editorCode[lineIndex];
    const { line, code } = buildLine(lineIndex + 1);
    editorLinesEl.appendChild(line);
    renderTokens(code, spec);

    lineIndex += 1;
    setTimeout(typeLine, 140);
  }

  typeLine();
}

typeEditor();

const parallaxEls = document.querySelectorAll('.parallax');
const editorEl = document.getElementById('editor');
const heroSection = document.querySelector('.hero');

if (heroSection) {
  heroSection.addEventListener('mousemove', e => {
    const rect = heroSection.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    parallaxEls.forEach(el => {
      const depth = 24;
      el.style.transform = `translate(${relX * depth}px, ${relY * depth}px)`;
    });

    if (editorEl) {
      const rotateY = relX * 10;
      const rotateX = relY * -10;
      editorEl.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    }
  });

  heroSection.addEventListener('mouseleave', () => {
    parallaxEls.forEach(el => {
      el.style.transform = 'translate(0px, 0px)';
    });
    if (editorEl) {
      editorEl.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
  });
}

const heroCanvas = document.getElementById('heroCanvas');

function initHeroCanvas() {
  if (!heroCanvas || typeof THREE === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, heroCanvas.clientWidth / heroCanvas.clientHeight, 0.1, 1000);
  camera.position.z = 60;

  const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight, false);

  const particleCount = 260;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 160;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xf4f5f6,
    size: 0.7,
    transparent: true,
    opacity: 0.5
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let frameId;

  function resize() {
    const width = heroCanvas.clientWidth;
    const height = heroCanvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  window.addEventListener('resize', resize);

  function animate() {
    points.rotation.y += 0.0006;
    points.rotation.x += 0.0002;
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(frameId);
    } else {
      animate();
    }
  });
}

initHeroCanvas();

const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const message = document.getElementById('cMessage').value.trim();

    if (!name || !email || !message) {
      if (formNote) {
        formNote.textContent = 'Please fill in all fields before sending.';
      }
      return;
    }

    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:muhammadfaizankhan525@gmail.com?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent = 'Opening your email client...';
    }
  });
}

const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
