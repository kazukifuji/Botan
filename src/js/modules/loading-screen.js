//ローディング画面
const loadingScreen = document.getElementById('loading-screen');

window.addEventListener( 'load', () => {
  loadingScreen.classList.add('-close');
}, { once: true, passive: true } );