const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 65);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(r => observer.observe(r));

  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show', window.scrollY > 400);
  });

  document.getElementById('hamburger').onclick = () =>
    document.getElementById('mobileNav').classList.add('open');
  document.getElementById('mobileClose').onclick = () =>
    document.getElementById('mobileNav').classList.remove('open');
  document.querySelectorAll('.mobile-link').forEach(l =>
    l.addEventListener('click', () =>
      document.getElementById('mobileNav').classList.remove('open')));

  function handleSubmit() {
    const n = document.getElementById('fname').value.trim();
    const e = document.getElementById('femail').value.trim();
    const m = document.getElementById('fmsg').value.trim();
    if (!n || !e || !m) { alert('Please fill in all fields.'); return; }
    alert(`Thanks ${n}! Your message has been noted. I'll reach out soon.`);
    document.getElementById('fname').value = '';
    document.getElementById('femail').value = '';
    document.getElementById('fmsg').value = '';
  }