// ── Custom Cursor ──────────────────────────────────────────
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 4 + 'px';
  cursor.style.top  = mouseY - 4 + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX - 16) * 0.12;
  followerY += (mouseY - followerY - 16) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .cert-card, .project-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    follower.style.transform = 'scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    follower.style.transform = 'scale(1)';
  });
});

// ── Navbar ──────────────────────────────────────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Smooth Scroll ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Active Nav ──────────────────────────────────────────────
const sections  = document.querySelectorAll('section');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) link.style.color = '#8b5cf6';
  });
});

// ── Scroll Animations ───────────────────────────────────────
const obs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
      obs.unobserve(el);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

const animEls = document.querySelectorAll('.skill-card, .project-item, .education-card, .cert-card, .contact-link');
animEls.forEach((el, i) => {
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  el.dataset.delay = (i % 3) * 100;
  obs.observe(el);
});

// ── Certificate Modal ───────────────────────────────────────
const certData = {
  cisco: {
    img: 'cyber_cisco.png',
    title: 'Introduction to Cybersecurity',
    info: 'Issued by Cisco Networking Academy via Skills Plus Egypt · Completed January 13, 2026'
  },
  basef: {
    img: 'BASEF.png',
    title: 'BASEF Participant — 2024',
    info: 'Bibliotheca Alexandrina Science and Engineering Fair · Alexandria · March 8–10, 2024'
  },
  iti: {
    img: 'screenshot.png',
    title: 'Python Programming Basics',
    info: 'ITI Mahara-Tech Platform · AI Academy · Duration: 1h 38min · Completed January 29, 2026'
  }
};

const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

window.openModal = function(key) {
  const d = certData[key];
  if (!d) return;

  let mediaHTML = '';
  if (d.img) {
    mediaHTML = `<img src="${d.img}" alt="${d.title}">`;
  } else if (d.pdf) {
    mediaHTML = `
      <div style="background:#1a1a2a;border-radius:16px 16px 0 0;padding:40px;text-align:center;color:#7a7a9a;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="1.5" style="margin-bottom:16px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>
        <p style="font-size:.9rem">Certificate PDF</p>
        <a href="${d.pdf}" target="_blank" style="display:inline-flex;align-items:center;gap:8px;margin-top:16px;padding:10px 20px;background:#8b5cf6;color:white;border-radius:8px;text-decoration:none;font-size:.85rem;font-weight:600;">
          Open PDF ↗
        </a>
      </div>`;
  }

  modalContent.innerHTML = `
    ${mediaHTML}
    <div class="modal-info">
      <h3>${d.title}</h3>
      <p>${d.info}</p>
    </div>`;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
