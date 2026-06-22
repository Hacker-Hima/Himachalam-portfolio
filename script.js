/* ================================================
   HIMACHALAM C — AOT PORTFOLIO SCRIPT
   Fixed: no lag, no disappearing headings, contact visible
   ================================================ */

/* ── CUSTOM CURSOR ── */
const cursorEl = document.getElementById('cursor');
const trailEl  = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursorEl) { cursorEl.style.left = mx+'px'; cursorEl.style.top = my+'px'; }
});
(function animTrail() {
  tx += (mx - tx) * 0.12; ty += (my - ty) * 0.12;
  if (trailEl) { trailEl.style.left = tx+'px'; trailEl.style.top = ty+'px'; }
  requestAnimationFrame(animTrail);
})();
document.querySelectorAll('a,button,.skill-card,.medal-card,.contact-card,.mission-card').forEach(el => {
  el.addEventListener('mouseenter', () => { if(cursorEl) cursorEl.style.transform='translate(-50%,-50%) scale(1.8)'; });
  el.addEventListener('mouseleave', () => { if(cursorEl) cursorEl.style.transform='translate(-50%,-50%) scale(1)'; });
});

/* ── HERO CANVAS: lightweight gold dust only ── */
(function heroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  let raf;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildParticles();
  }

  function buildParticles() {
    particles = [];
    // reduced count for performance
    const count = Math.min(40, Math.floor(W / 28));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.4,
        vy: -(Math.random() * 0.3 + 0.1),
        vx: (Math.random() - 0.5) * 0.2,
        op: Math.random() * 0.3 + 0.05
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,168,75,${p.op})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }

  // Only run when hero is visible
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { if (!raf) draw(); }
    else { cancelAnimationFrame(raf); raf = null; }
  });
  obs.observe(canvas.closest('section'));

  resize();
  window.addEventListener('resize', resize);
})();

/* ── SKILLS CANVAS: subtle grid only ── */
(function skillsCanvas() {
  const canvas = document.getElementById('skillsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, t = 0, raf;
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize(); window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.005;
    const offset = (t * 30) % 60;
    ctx.strokeStyle = 'rgba(200,168,75,0.035)';
    ctx.lineWidth = 1;
    for (let x = -60; x < W + 60; x += 60) {
      ctx.beginPath(); ctx.moveTo(x + offset, 0); ctx.lineTo(x + offset, H); ctx.stroke();
    }
    for (let y = -60; y < H + 60; y += 60) {
      ctx.beginPath(); ctx.moveTo(0, y + offset * 0.5); ctx.lineTo(W, y + offset * 0.5); ctx.stroke();
    }
    raf = requestAnimationFrame(draw);
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { if (!raf) draw(); }
    else { cancelAnimationFrame(raf); raf = null; }
  });
  obs.observe(canvas.closest('section'));
  draw();
})();

/* ── PROJECTS CANVAS: simple radial glow only ── */
(function projectsCanvas() {
  const canvas = document.getElementById('projectsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, t = 0, raf;
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize(); window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.008;
    const pulse = 0.5 + Math.sin(t) * 0.5;
    const grd = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H) * 0.6);
    grd.addColorStop(0, `rgba(139,26,26,${0.055 * pulse})`);
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
    raf = requestAnimationFrame(draw);
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { if (!raf) draw(); }
    else { cancelAnimationFrame(raf); raf = null; }
  });
  obs.observe(canvas.closest('section'));
  draw();
})();

/* ── CERTS CANVAS: slow rotating ring only ── */
(function certsCanvas() {
  const canvas = document.getElementById('certsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, t = 0, raf;
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize(); window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.006;
    const cx = W / 2, cy = H / 2;
    [180, 300, 420].forEach((r, i) => {
      const speed = i % 2 === 0 ? t : -t;
      for (let s = 0; s < 12; s++) {
        const a1 = (s / 12) * Math.PI * 2 + speed;
        const a2 = a1 + (Math.PI * 2 / 12) * 0.45;
        ctx.beginPath();
        ctx.arc(cx, cy, r, a1, a2);
        ctx.strokeStyle = `rgba(200,168,75,0.055)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    });
    raf = requestAnimationFrame(draw);
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { if (!raf) draw(); }
    else { cancelAnimationFrame(raf); raf = null; }
  });
  obs.observe(canvas.closest('section'));
  draw();
})();

/* ── CONTACT CANVAS: radar sweep ── */
(function contactCanvas() {
  const canvas = document.getElementById('contactCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, angle = 0, raf;
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize(); window.addEventListener('resize', resize);

  const blips = Array.from({length: 8}, () => ({
    r: Math.random() * 160 + 60,
    a: Math.random() * Math.PI * 2,
    life: 0, maxLife: 60
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    angle += 0.016;
    const cx = W / 2, cy = H / 2;

    // rings
    [70, 130, 200, 270].forEach(r => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,200,80,0.07)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // crosshairs
    ctx.strokeStyle = 'rgba(0,200,80,0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx-280,cy); ctx.lineTo(cx+280,cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx,cy-280); ctx.lineTo(cx,cy+280); ctx.stroke();

    // sweep wedge
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    const sw = ctx.createLinearGradient(0, 0, 280, 0);
    sw.addColorStop(0, 'rgba(200,168,75,0.15)');
    sw.addColorStop(0.6, 'rgba(200,168,75,0.04)');
    sw.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 280, -0.5, 0);
    ctx.fillStyle = sw;
    ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(285, 0);
    ctx.strokeStyle = 'rgba(200,168,75,0.35)'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();

    // blips
    blips.forEach(b => {
      const bx = cx + Math.cos(b.a) * b.r;
      const by = cy + Math.sin(b.a) * b.r;
      const diff = ((angle % (Math.PI*2)) - b.a + Math.PI*4) % (Math.PI*2);
      if (diff < 0.18) b.life = b.maxLife;
      if (b.life > 0) {
        const al = b.life / b.maxLife;
        ctx.beginPath(); ctx.arc(bx, by, 3, 0, Math.PI*2);
        ctx.fillStyle = `rgba(200,168,75,${al * 0.85})`; ctx.fill();
        b.life--;
      }
    });

    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(200,168,75,0.55)'; ctx.fill();

    raf = requestAnimationFrame(draw);
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { if (!raf) draw(); }
    else { cancelAnimationFrame(raf); raf = null; }
  });
  obs.observe(canvas.closest('section'));
  draw();
})();

/* ── CONTACT CARD MOUSE GLOW ── */
document.querySelectorAll('.contact-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
    const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
    const glow = card.querySelector('.cc-bg-anim');
    if (glow) { glow.style.setProperty('--mx', x+'%'); glow.style.setProperty('--my', y+'%'); }
  });
});

/* ═══════════════════════════════════════════════
   SAFETY FALLBACK — runs immediately
   If GSAP never loads, force-show everything
═══════════════════════════════════════════════ */
function forceShowAll() {
  const selectors = [
    '.contact-card', '.contact-section .sec-header', '.open-signal',
    '.mission-card', '.medal-card', '.skill-card', '.skill-block',
    '.skills-section .sec-header', '.projects-section .sec-header',
    '.certs-section .sec-header', '.about-section .sec-header',
    '.id-card', '.field-report', '.wall-timeline', '.wt-node',
    '.combat-attr', '.wall-divider', '.footer'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.visibility = 'visible';
    });
  });
}

// If GSAP fails to load (CDN blocked / no internet), show everything
if (typeof gsap === 'undefined') {
  document.addEventListener('DOMContentLoaded', forceShowAll);
  window.addEventListener('load', forceShowAll);
} else {
  // Extra safety: after 3s, force-show anything still invisible
  setTimeout(forceShowAll, 3000);
}

/* ═══════════════════════════════════════════════
   MAIN — GSAP (after load)
═══════════════════════════════════════════════ */
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') return; // CDN failed, skip GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Fix: refresh ScrollTrigger after fonts/images load
  ScrollTrigger.refresh();

  /* ── TYPING EFFECT ── */
  const phrases = [
    'COMPUTER SCIENCE ENGINEER',
    'WEB DEVELOPER',
    'SOFTWARE ENGINEER',
    'JAVA DEVELOPER',
    'SURVEY CORPS CODER',
    'OPEN TO OPPORTUNITIES'
  ];
  const typingEl = document.getElementById('typing-text');
  let pi = 0, ci = 0, del = false;
  function type() {
    if (!typingEl) return;
    const cur = phrases[pi], spd = del ? 42 : 82;
    if (!del) {
      typingEl.textContent = cur.slice(0, ci + 1); ci++;
      if (ci === cur.length) { setTimeout(() => { del = true; type(); }, 2400); return; }
    } else {
      typingEl.textContent = cur.slice(0, ci - 1); ci--;
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, spd);
  }
  setTimeout(type, 900);

  /* ── NAVBAR ── */
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');
  window.addEventListener('scroll', () => navbar && navbar.classList.toggle('scrolled', scrollY > 80));
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => navMenu.classList.toggle('open'));
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));
  }

  /* ── COUNTER ── */
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    let n = 0;
    const step = () => { n++; el.textContent = n + '+'; if (n < target) requestAnimationFrame(step); };
    setTimeout(step, 1200);
  });

  /* ── HERO ENTRANCE ── */
  const ht = gsap.timeline({ defaults: { ease: 'power3.out' } });
  ht.from('.regiment-badge',  { y: -50, opacity: 0, duration: 0.9 })
    .from('.rank-eyebrow',    { x: -60, opacity: 0, duration: 0.8 }, '-=0.4')
    .from('.name-l1',         { x: -120, opacity: 0, duration: 1.1, ease: 'expo.out' }, '-=0.5')
    .from('.name-l2',         { x: -120, opacity: 0, duration: 1.1, ease: 'expo.out' }, '-=0.85')
    .from('.hero-title-row',  { y: 25, opacity: 0, duration: 0.7 }, '-=0.4')
    .from('.hero-desc',       { y: 25, opacity: 0, duration: 0.7 }, '-=0.35')
    .from('.hero-stats',      { y: 18, opacity: 0, duration: 0.6 }, '-=0.25')
    .from('.hero-btns',       { y: 18, opacity: 0, duration: 0.6 }, '-=0.2')
    .from('.hero-socials',    { y: 18, opacity: 0, duration: 0.5 }, '-=0.2')
    .from('.profile-outer',   { scale: 0.7, opacity: 0, duration: 1.4, ease: 'back.out(1.1)' }, '-=1.2')
    .from('.titan-ring',      { scale: 0.4, opacity: 0, stagger: 0.15, duration: 1.1 }, '-=1.1')
    .from('.fbadge',          { y: 40, opacity: 0, stagger: 0.16, duration: 0.8 }, '-=0.8')
    .from('.corps-motto',     { y: 25, opacity: 0, duration: 0.8 }, '-=0.5');

  /* ── HERO MOUSE PARALLAX ── */
  const heroSec = document.querySelector('.hero');
  const profOut = document.getElementById('profileOuter');
  if (heroSec && profOut) {
    heroSec.addEventListener('mousemove', e => {
      const dx = (innerWidth/2  - e.clientX) / 55;
      const dy = (innerHeight/2 - e.clientY) / 55;
      gsap.to(profOut, { x: -dx, y: -dy, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
      document.querySelectorAll('.fbadge').forEach((b, i) => {
        gsap.to(b, { x: dx*(i+1)*0.6, y: dy*(i+1)*0.6, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
      });
    });
    heroSec.addEventListener('mouseleave', () => {
      gsap.to([profOut, '.fbadge'], { x: 0, y: 0, duration: 1, ease: 'power2.out' });
    });
  }

  /* ── HERO FADE ON SCROLL ── */
  gsap.to('.hero .hero-content', {
    opacity: 0.2, y: -40,
    scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'top 70%', scrub: true }
  });

  /* ── WALL DIVIDERS ── */
  document.querySelectorAll('.wall-divider').forEach(el => {
    gsap.from(el, {
      scaleX: 0, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 95%', toggleActions: 'play none none none' }
    });
  });

  /* ── ABOUT — fixed: once only, no reverse ── */
  gsap.from('.about-section .sec-header', {
    y: 50, opacity: 0, duration: 0.9,
    scrollTrigger: { trigger: '.about-section', start: 'top 78%', toggleActions: 'play none none none' }
  });
  gsap.from('.id-card', {
    x: -80, opacity: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.dossier-wrap', start: 'top 80%', toggleActions: 'play none none none' }
  });
  gsap.from('.field-report', {
    y: 40, opacity: 0, duration: 0.8,
    scrollTrigger: { trigger: '.field-report', start: 'top 85%', toggleActions: 'play none none none' }
  });
  gsap.from('.wall-timeline', {
    y: 35, opacity: 0, duration: 0.8,
    scrollTrigger: { trigger: '.wall-timeline', start: 'top 85%', toggleActions: 'play none none none' }
  });
  gsap.from('.wt-node', {
    x: -25, opacity: 0, stagger: 0.14, duration: 0.6,
    scrollTrigger: { trigger: '.wall-timeline', start: 'top 82%', toggleActions: 'play none none none' }
  });
  gsap.from('.combat-attr', {
    y: 25, opacity: 0, stagger: 0.1, duration: 0.6,
    scrollTrigger: { trigger: '.combat-grid', start: 'top 88%', toggleActions: 'play none none none' }
  });

  // Animate attr bars
  document.querySelectorAll('.combat-attr').forEach(el => {
    const pct  = el.dataset.pct;
    const fill = el.querySelector('.ca-fill');
    ScrollTrigger.create({
      trigger: el, start: 'top 90%',
      toggleActions: 'play none none none',
      onEnter: () => { if (fill) fill.style.width = pct + '%'; }
    });
  });

  /* ── SKILLS ── */
  gsap.from('.skills-section .sec-header', {
    y: 50, opacity: 0, duration: 0.9,
    scrollTrigger: { trigger: '.skills-section', start: 'top 80%', toggleActions: 'play none none none' }
  });
  gsap.from('.skill-block', {
    y: 50, opacity: 0, stagger: 0.12, duration: 0.8,
    scrollTrigger: { trigger: '.skills-section .sec-header', start: 'bottom 80%', toggleActions: 'play none none none' }
  });
  gsap.from('.skill-card', {
    y: 60, opacity: 0, stagger: { amount: 0.9, from: 'start' }, duration: 0.65, ease: 'back.out(1.3)',
    scrollTrigger: { trigger: '.skills-wrap', start: 'top 75%', toggleActions: 'play none none none' }
  });

  // 3D tilt on skill cards
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2)  / 9;
      const y = (e.clientY - r.top  - r.height/2) / 9;
      gsap.to(card, { rotateX: -y, rotateY: x, duration: 0.3, ease: 'power2.out', transformPerspective: 600, overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.45, ease: 'power2.out' });
    });
  });

  /* ── PROJECTS ── */
  gsap.from('.projects-section .sec-header', {
    y: 50, opacity: 0, duration: 0.9,
    scrollTrigger: { trigger: '.projects-section', start: 'top 80%', toggleActions: 'play none none none' }
  });
  gsap.from('.mission-card', {
    y: 80, opacity: 0, stagger: 0.18, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.missions-grid', start: 'top 82%', toggleActions: 'play none none none' }
  });

  // Project card tilt
  document.querySelectorAll('.mission-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2)  / 25;
      const y = (e.clientY - r.top  - r.height/2) / 25;
      gsap.to(card, { rotateX: -y, rotateY: x, duration: 0.35, ease: 'power2.out', transformPerspective: 900, overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
    });
  });

  /* ── CERTIFICATES ── */
  gsap.from('.certs-section .sec-header', {
    y: 50, opacity: 0, duration: 0.9,
    scrollTrigger: { trigger: '.certs-section', start: 'top 80%', toggleActions: 'play none none none' }
  });
  gsap.from('.medal-card', {
    y: 70, opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.8, ease: 'back.out(1.2)',
    scrollTrigger: { trigger: '.medals-grid', start: 'top 82%', toggleActions: 'play none none none' }
  });

  /* ── CONTACT ── fixed: z-index safe, no opacity hiding ── */
  gsap.from('.contact-section .sec-header', {
    y: 50, opacity: 0, duration: 0.9,
    scrollTrigger: { trigger: '.contact-section', start: 'top 80%', toggleActions: 'play none none none' }
  });
  gsap.from('.contact-card', {
    y: 55, opacity: 0, stagger: 0.09, duration: 0.75, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-grid', start: 'top 82%', toggleActions: 'play none none none' }
  });
  gsap.from('.open-signal', {
    scale: 0.85, opacity: 0, duration: 0.8,
    scrollTrigger: { trigger: '.open-signal', start: 'top 92%', toggleActions: 'play none none none' }
  });

  /* ── ACTIVE NAV LINK ── */
  document.querySelectorAll('section[id]').forEach(sec => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 55%', end: 'bottom 55%',
      onEnter:     () => setActive(sec.id),
      onEnterBack: () => setActive(sec.id)
    });
  });
  function setActive(id) {
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.style.color = a.getAttribute('href') === `#${id}` ? '#c8a84b' : '';
    });
  }

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ── FOOTER ── */
  gsap.from('.footer', {
    y: 25, opacity: 0, duration: 0.8,
    scrollTrigger: { trigger: '.footer', start: 'top 96%', toggleActions: 'play none none none' }
  });

  /* ── SUBTLE THUNDER FLASH (less frequent, won't cause lag) ── */
  function titanFlash() {
    const flash = document.createElement('div');
    flash.style.cssText = 'position:fixed;inset:0;background:rgba(200,168,75,0.025);pointer-events:none;z-index:9990;';
    document.body.appendChild(flash);
    gsap.to(flash, { opacity: 0, duration: 0.3, onComplete: () => flash.remove() });
    setTimeout(titanFlash, 10000 + Math.random() * 15000);
  }
  setTimeout(titanFlash, 6000);

  /* ── REFRESH on images load to fix position offsets ── */
  window.addEventListener('load', () => ScrollTrigger.refresh());
  setTimeout(() => ScrollTrigger.refresh(), 500);
  setTimeout(() => ScrollTrigger.refresh(), 1500);
});

/* ── CERTIFICATE LIGHTBOX ── */
(function certLightbox() {
  const lb       = document.getElementById('certLightbox');
  const panel    = document.getElementById('clbPanel');
  const img      = document.getElementById('clbImg');
  const titleEl  = document.getElementById('clbTitle');
  const orgEl    = document.getElementById('clbOrg');
  const scoreEl  = document.getElementById('clbScore');
  const closeBtn = document.getElementById('clbClose');
  if (!lb) return;

  function openLb(card) {
    img.src            = card.dataset.img   || '';
    img.alt            = card.dataset.title || 'Certificate';
    titleEl.textContent = card.dataset.title || '—';
    orgEl.textContent   = card.dataset.org   || '—';
    scoreEl.textContent = card.dataset.score || '—';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { img.src = ''; }, 400);
  }

  // Click on any medal card to open lightbox
  document.querySelectorAll('.medal-card').forEach(card => {
    card.addEventListener('click', () => openLb(card));
  });

  // Close on X button
  closeBtn.addEventListener('click', closeLb);

  // Close on backdrop click (outside panel)
  lb.addEventListener('click', e => {
    if (!panel.contains(e.target)) closeLb();
  });

  // Close on ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.classList.contains('open')) closeLb();
  });

  // Custom cursor inside lightbox
  lb.addEventListener('mousemove', e => {
    if (typeof cursorEl !== 'undefined' && cursorEl) {
      cursorEl.style.left = e.clientX + 'px';
      cursorEl.style.top  = e.clientY + 'px';
    }
  });
  closeBtn.addEventListener('mouseenter', () => {
    if (typeof cursorEl !== 'undefined' && cursorEl)
      cursorEl.style.transform = 'translate(-50%,-50%) scale(1.8)';
  });
  closeBtn.addEventListener('mouseleave', () => {
    if (typeof cursorEl !== 'undefined' && cursorEl)
      cursorEl.style.transform = 'translate(-50%,-50%) scale(1)';
  });
})();
