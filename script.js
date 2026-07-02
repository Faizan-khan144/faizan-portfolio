const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  burger.classList.toggle('active');
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

const codeLines = [
  { html: '<span class="key">const</span> <span class="punc">developer</span> <span class="punc">=</span> <span class="punc">{</span>' },
  { html: '&nbsp;&nbsp;name:&nbsp;<span class="str">"Muhammad Faizan Khan"</span><span class="punc">,</span>' },
  { html: '&nbsp;&nbsp;role:&nbsp;<span class="str">"Front-End Developer"</span><span class="punc">,</span>' },
  { html: '&nbsp;&nbsp;stack:&nbsp;<span class="punc">[</span><span class="str">"HTML"</span><span class="punc">,</span> <span class="str">"CSS"</span><span class="punc">,</span> <span class="str">"JS"</span><span class="punc">],</span>' },
  { html: '&nbsp;&nbsp;learning:&nbsp;<span class="str">"React.js"</span><span class="punc">,</span>' },
  { html: '&nbsp;&nbsp;location:&nbsp;<span class="str">"Pakistan"</span><span class="punc">,</span>' },
  { html: '&nbsp;&nbsp;available:&nbsp;<span class="key">true</span>' },
  { html: '<span class="punc">};</span>' },
  { html: '' },
  { html: '<span class="comment">// building something new, always.</span>' }
];

const out = document.getElementById('typed-out');
let lineIndex = 0;

function typeNextLine() {
  if (lineIndex >= codeLines.length) return;
  const lineEl = document.createElement('div');
  const lnNum = document.createElement('span');
  lnNum.className = 'ln';
  lnNum.textContent = (lineIndex + 1) + ' ';
  lineEl.appendChild(lnNum);
  const content = document.createElement('span');
  lineEl.appendChild(content);
  out.appendChild(lineEl);

  const raw = codeLines[lineIndex].html;
  const temp = document.createElement('div');
  temp.innerHTML = raw;
  const fullText = temp.textContent;
  let charIndex = 0;

  function typeChar() {
    if (charIndex <= fullText.length) {
      const partial = raw.length && charIndex === fullText.length ? raw : sliceHtml(raw, charIndex);
      content.innerHTML = partial;
      charIndex++;
      setTimeout(typeChar, fullText.length === 0 ? 0 : 14 + Math.random() * 18);
    } else {
      lineIndex++;
      setTimeout(typeNextLine, 90);
    }
  }
  typeChar();
}

function sliceHtml(html, count) {
  let result = '';
  let plainCount = 0;
  let i = 0;
  while (i < html.length && plainCount < count) {
    if (html[i] === '<') {
      const close = html.indexOf('>', i);
      result += html.slice(i, close + 1);
      i = close + 1;
    } else if (html[i] === '&') {
      const semi = html.indexOf(';', i);
      result += html.slice(i, semi + 1);
      i = semi + 1;
      plainCount++;
    } else {
      result += html[i];
      i++;
      plainCount++;
    }
  }
  return result;
}

setTimeout(typeNextLine, 600);

const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cName').value;
  const email = document.getElementById('cEmail').value;
  const message = document.getElementById('cMessage').value;
  const subject = encodeURIComponent('Portfolio inquiry from ' + name);
  const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
  window.location.href = 'mailto:muhammadfaizankhan525@example.com?subject=' + subject + '&body=' + body;
});
