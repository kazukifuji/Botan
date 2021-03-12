import ScrollMagic from 'scrollmagic';

//コントローラーオブジェクト
const controller = new ScrollMagic.Controller();
//シーンオブジェクトの配列
const scenes = [];

//スクロールによるクラス切り替えを行うIntersectionObserverを作成
const observer = new IntersectionObserver( entries => {
  //監視要素に付属させるクラス名
  const observeTargetClassName = 'observe-target';

  entries.forEach( entry => {
    if ( entry.isIntersecting ) {
      if ( entry.target.classList.contains( observeTargetClassName ) ) {
        entry.target.classList.add('-trigger');
      }
      observer.unobserve( entry.target );

    } else {
      //すでにターゲット要素が画面を通過済みの場合も監視対象から除外
      if ( entry.boundingClientRect.top < entry.rootBounds.height ) {
        observer.unobserver( entry.target );
      } else {
        entry.target.classList.add( observeTargetClassName );
      }
    }
  } );
}, { root: null, rootMargin: '0px 0px -25% 0px', threshold: 0 } );


window.addEventListener( 'load', () => {
  //ヒーローヘッダーの背景画像にパララックスを実装
  heroHeaderBgImgParallax();

  //ヒーローヘッダーの見出しにスクロールエフェクト（透過効果）を実装
  heroHeaderHeadingScrollEffect();

  //各要素を監視
  observer.observe( document.querySelector('#feature-1 .feature__heading') );
  observer.observe( document.querySelector('#feature-2 .feature__heading') );
  
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


//ヒーローヘッダーの見出しにスクロールエフェクト（透過効果）を実装
function heroHeaderHeadingScrollEffect() {
  const heroHeader = document.getElementById('hero-header');
  if ( !heroHeader ) return;

  const heroHeaderHeading = heroHeader.querySelector('.hero-header__heading');

  const scene = new ScrollMagic.Scene({
    duration: getDuration(),
    triggerHook: 0
  })
  .on( 'progress', function(e) {
    heroHeaderHeading.style.opacity = 1 - e.progress;
  } )
  .addTo( controller );

  scene.adjust = function() { this.duration( getDuration() ) };

  scenes.push( scene );

  function getDuration() {
    return heroHeader.getBoundingClientRect().height * 0.8;
  }
}