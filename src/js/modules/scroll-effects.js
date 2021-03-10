import ScrollMagic from 'scrollmagic'

//コントローラーオブジェクト
const controller = new ScrollMagic.Controller();
//シーンオブジェクトの配列
const scenes = [];


window.addEventListener( 'load', () => {
  //ヒーローヘッダーの背景画像にパララックスを実装
  heroHeaderBgImgParallax();
  
  //ウィンドウのリサイズで各シーンを再調整
  window.addEventListener( 'resize', () => {
    scenes.forEach( scene => {
      if ( typeof scene.adjust === 'function' ) scene.adjust();
      scene.refresh();
    } );
  }, { passive: true } );
}, { once: true, passive: true } );


//ヒーローヘッダーの背景画像にパララックスを実装
function heroHeaderBgImgParallax() {
  const heroHeader = document.getElementById('hero-header');
  if ( !heroHeader ) return;

  const heroHeaderBgImg = heroHeader.querySelector('.hero-header__background-img');
  const ratio = 0.2;

  const scene = new ScrollMagic.Scene({
    duration: getDuration(),
    triggerHook: 0
  })
  .setPin( heroHeaderBgImg, { pushFolowers : false } )
  .on( 'progress', function(e) {
    heroHeaderBgImg.style.transform = `translateY(-${ this.duration() * e.progress * ratio }px)`;
  } )
  .addTo( controller );

  scene.adjust = function() { this.duration( getDuration() ) };

  scenes.push( scene );

  function getDuration() {
    return heroHeader.getBoundingClientRect().height;
  }
}