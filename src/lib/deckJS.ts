export const DECK_JS = `const slideNames = ['Introduction', 'Use Cases', 'How It Works', 'Competitive Edge', 'Dashboard'];
const total = 5;
let current = 0;
let animating = false;

// Build dots
const dotsEl = document.getElementById('dots');
for (let i = 0; i < total; i++) {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.onclick = () => go(i);
  dotsEl.appendChild(d);
}

function go(idx) {
  if (animating || idx === current || idx < 0 || idx >= total) return;
  animating = true;
  const prev = document.getElementById('s' + current);
  const next = document.getElementById('s' + idx);
  const dir = idx > current ? 1 : -1;

  prev.classList.remove('active');
  prev.classList.add(dir > 0 ? 'exit-up' : '');
  prev.style.transform = dir > 0 ? 'translateY(-30px)' : 'translateY(30px)';

  next.style.transform = dir > 0 ? 'translateY(30px)' : 'translateY(-30px)';
  next.style.opacity = '0';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      next.classList.add('active');
      next.style.transform = '';
      next.style.opacity = '';
    });
  });

  setTimeout(() => {
    prev.classList.remove('exit-up');
    prev.style.transform = '';
    prev.style.opacity = '';
    animating = false;
  }, 480);

  current = idx;
  updateUI();
}

function updateUI() {
  document.getElementById('slideCounter').textContent = (current + 1) + ' / ' + total;
  document.getElementById('slideName').textContent = slideNames[current];
  document.getElementById('prevBtn').disabled = current === 0;
  document.getElementById('nextBtn').disabled = current === total - 1;
  dotsEl.querySelectorAll('.dot').forEach((d, i) => {
    d.className = 'dot' + (i === current ? ' active' : '');
  });
}

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); go(current + 1); }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(current - 1); }
});

// Touch
let tx = 0, ty = 0;
document.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
document.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - tx;
  const dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) { dx < 0 ? go(current + 1) : go(current - 1); }
}, { passive: true });

// Scroll/wheel
let wheelTimeout;
document.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (wheelTimeout) return;
  wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 600);
  e.deltaY > 0 ? go(current + 1) : go(current - 1);
}, { passive: false });`;
