/* ============================================================
   AMAL JOSEPH — PORTFOLIO SCRIPTS
   Matrix Rain, Typed Text, Scroll Animations, Contact Form
   ============================================================ */

// ── MATRIX RAIN ──────────────────────────────────────────────
(function () {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  let drops = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / 18);
    drops = Array.from({ length: cols }, () => Math.random() * -canvas.height);
  }

  const chars = 'アカサタナハマヤラワ0123456789ABCDEF<>/{}[]()!@#$%^&*;:';

  function draw() {
    ctx.fillStyle = 'rgba(5,10,14,0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00d4ff';
    ctx.font = '14px Share Tech Mono, monospace';

    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 18;
      ctx.fillStyle = Math.random() > 0.95 ? '#00ff88' : '#00d4ff';
      ctx.fillText(char, x, y);
      drops[i] = y > canvas.height + Math.random() * 1000 ? 0 : y + 18;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 55);
})();

// ── TYPED TEXT ───────────────────────────────────────────────
(function () {
  const el = document.getElementById('typed-text');
  const phrases = [
    'Cybersecurity Student',
    'Ethical Hacker',
    'CTF Competitor',
    'Full-Stack Developer',
    'Security Researcher',
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  type();
})();

// ── SCROLL ANIMATIONS ────────────────────────────────────────
(function () {
  const items = document.querySelectorAll(
    '.skill-card, .project-card, .wf-step, .about-grid, .section-header'
  );
  items.forEach(el => el.classList.add('fade-in-up'));

  const io = new IntersectionObserver(
    entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach(el => io.observe(el));
})();

// ── SKILL BAR ANIMATIONS ─────────────────────────────────────
(function () {
  const fills = document.querySelectorAll('.bar-fill');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  fills.forEach(f => io.observe(f));
})();

// ── NAVBAR SCROLL EFFECT ─────────────────────────────────────
(function () {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 60
      ? 'rgba(0,212,255,0.3)'
      : 'var(--border)';
  });
})();

// ── FOOTER HASH ──────────────────────────────────────────────
(function () {
  const el = document.getElementById('footer-hash');
  const hash = Math.random().toString(16).slice(2, 10).toUpperCase();
  el.textContent = `// SHA: ${hash}`;
})();

// ── CONTACT FORM ─────────────────────────────────────────────
(function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const btnText = document.getElementById('btn-text');

  // !! IMPORTANT: Replace this URL with your Render.com backend URL after deployment
  // Example: 'https://your-backend.onrender.com/api/contact'
  const BACKEND_URL = 'https://YOUR-BACKEND.onrender.com/api/contact';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      showStatus('// ERROR: All fields are required.', 'error');
      return;
    }

    btnText.textContent = 'TRANSMITTING...';
    showStatus('// Establishing secure connection...', 'loading');

    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (res.ok) {
        showStatus('// MESSAGE SENT SUCCESSFULLY — I will respond within 24h.', 'success');
        form.reset();
      } else {
        showStatus(`// ERROR: ${data.error || 'Transmission failed.'}`, 'error');
      }
    } catch (err) {
      // If backend is not yet deployed, show a friendly message
      showStatus('// Backend not connected yet. Set up your server first!', 'error');
      console.error(err);
    } finally {
      btnText.textContent = 'SEND MESSAGE ↗';
    }
  });

  function showStatus(msg, type) {
    status.textContent = msg;
    status.className = `form-status ${type}`;
  }
})();

// ── SMOOTH SCROLL FOR NAV ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
