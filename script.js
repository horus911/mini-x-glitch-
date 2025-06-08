// Gestion des gestes tactiles
let touchStartX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  if (touchEndX < touchStartX - 50) {
    nextPost(); // Swipe gauche
  } else if (touchEndX > touchStartX + 50) {
    prevPost(); // Swipe droit
  }
});

// Upload avec feedback tactile
document.getElementById('upload-btn').addEventListener('click', () => {
  navigator.vibrate(100); // Vibration
});

// Détection réseau
function checkNetwork() {
  const connection = navigator.connection || { effectiveType: '4g' };
  return connection.effectiveType.includes('2g') ? 'low' : 'high';
}

// Chargement adaptatif
function loadMedia() {
  const quality = checkNetwork();
  document.querySelectorAll('[data-src]').forEach(el => {
    el.src = quality === 'high' ? el.dataset.src : el.dataset.lowRes;
  });
}