export const DECK_JS = `var slideNames = ['Introduction', 'Use Cases', 'How It Works', 'Competitive Edge', 'Dashboard'];
var total = 5;
var current = 0;
var animating = false;

// Build dots
var dotsEl = document.getElementById('dots');
for (var i = 0; i < total; i++) {
  (function(idx) {
    var d = document.createElement('button');
    d.className = 'dot' + (idx === 0 ? ' active' : '');
    d.onclick = function() { go(idx); };
    dotsEl.appendChild(d);
  })(i);
}

function go(idx) {
  if (animating || idx === current || idx < 0 || idx >= total) return;
  animating = true;
  var prev = document.getElementById('s' + current);
  var next = document.getElementById('s' + idx);
  var dir = idx > current ? 1 : -1;

  // Exit current slide
  prev.classList.remove('active');
  prev.style.opacity = '0';
  prev.style.transform = dir > 0 ? 'translateY(-30px)' : 'translateY(30px)';

  // Prepare next slide at starting position (no transition yet)
  next.style.transition = 'none';
  next.style.opacity = '0';
  next.style.transform = dir > 0 ? 'translateY(30px)' : 'translateY(-30px)';

  // Force layout
  next.offsetHeight;

  // Now enable transition and animate in
  next.style.transition = '';
  next.classList.add('active');
  next.style.opacity = '1';
  next.style.transform = 'translateY(0)';

  setTimeout(function() {
    // Clean up prev
    prev.style.transform = '';
    prev.style.opacity = '';
    prev.style.transition = '';
    // Clean up next (leave active class, clear inline styles)
    next.style.transform = '';
    next.style.opacity = '';
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
  var allDots = dotsEl.querySelectorAll('.dot');
  for (var i = 0; i < allDots.length; i++) {
    allDots[i].className = 'dot' + (i === current ? ' active' : '');
  }
}

// Keyboard
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); go(current + 1); }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(current - 1); }
});

// Touch
var tx = 0, ty = 0;
document.addEventListener('touchstart', function(e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
document.addEventListener('touchend', function(e) {
  var dx = e.changedTouches[0].clientX - tx;
  var dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) { dx < 0 ? go(current + 1) : go(current - 1); }
  else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 50) { dy < 0 ? go(current + 1) : go(current - 1); }
}, { passive: true });

// Scroll/wheel
var wheelTimeout;
document.addEventListener('wheel', function(e) {
  e.preventDefault();
  if (wheelTimeout) return;
  wheelTimeout = setTimeout(function() { wheelTimeout = null; }, 600);
  e.deltaY > 0 ? go(current + 1) : go(current - 1);
}, { passive: false });`;
