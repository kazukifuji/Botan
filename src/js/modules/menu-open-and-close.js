//メニューボタン
const menuButton = document.getElementById('menu-button');
//メニューボタンのg要素
const menuButtonG = menuButton.querySelector('svg > g');
//グローバルメニュー内の各アンカーリンク要素
const anchorLinks = [].slice.call( document.querySelectorAll('#global-menu a[href^="#"]') );
//ヘッダー要素
const header = document.getElementById('header');
//オーバーレイ要素
const overlay = document.getElementById('overlay');
//フラグ
let flag = false;


//メニューボタンのg要素にクリックイベントを追加
menuButtonG.addEventListener( 'click', () => {
  if ( flag ) passive();
  else active();
}, { passive: true } );


//各アンカーリンクにクリックイベントを追加
anchorLinks.forEach( link => {
  link.addEventListener( 'click', passive, { passive: true } );
} );


//アクティブ
function active() {
  menuButton.classList.add('-active');
  header.classList.add('-active');
  overlay.classList.add('-active');
  flag = true;

  //windowにリサイズイベントを追加
  window.addEventListener( 'resize', observe, { passive: true } );
}


//パッシブ
function passive() {
  menuButton.classList.remove('-active');
  header.classList.remove('-active');
  overlay.classList.remove('-active');
  flag = false;

  //windowのリサイズイベントを削除
  window.removeEventListener( 'resize', observe );
}


// 監視
function observe() {
  //画面の幅がTC幅を越えたらパッシブ状態にする
  if ( window.innerWidth >= PC_BREAKPOINT ) passive();
}