//ブレイクポイント
define( 'TC_BREAKPOINT', 600 );
define( 'PC_BREAKPOINT', 1020 );


//グリーバル定数を定義する関数
function define( name, value ) {
  Object.defineProperty( window, name, {
    value: value,
    writable: false
  } );
}