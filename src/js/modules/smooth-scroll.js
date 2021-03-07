smoothScroll( 'hero-header', 0 );
smoothScroll( 'feature-1', -100 );
smoothScroll( 'menu', 0 );
smoothScroll( 'access', -100 );
smoothScroll( 'about', -100 );


//ページ内リンクにスムーズスクロールを実装
function smoothScroll( anchorLink, offsetY ) {
  const anchor = document.querySelector(`a[href="#${anchorLink}"]`);
  const targetElem = document.querySelector( anchor.hash );

  anchor.addEventListener( 'click', e => {
    e.preventDefault();
    window.scrollTo({
      top: window.pageYOffset + targetElem.getBoundingClientRect().top + offsetY,
      behavior: 'smooth'
    });
  } );
}