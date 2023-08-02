
jQuery(function ($) {

///// ハンバーガーメニュー /////

  $(".js-hamburger").click(function () {
    if ($(".js-hamburger").hasClass("is-active")) {
      // ハンバーガーメニューがアクティブ状態の場合、非アクティブにする
      $(".js-hamburger").removeClass("is-active");
      $("body").removeClass("menu-open"); // スクロールを有効にするためにクラスを削除
      $(".js-sp-nav").fadeOut(300); // .js-sp-nav要素をフェードアウトさせる
    } else {
      // ハンバーガーメニューが非アクティブ状態の場合、アクティブにする
      $(".js-hamburger").addClass("is-active");
      $("body").addClass("menu-open"); // スクロールを無効にするためにクラスを追加
      $(".js-sp-nav").fadeIn(300); // .js-sp-nav要素をフェードインさせる
    }
  });
});

// スクロール禁止のための関数を定義
function disableScroll() {
  $("html, body").css("overflow", "hidden");
}

// スクロール有効化のための関数を定義
function enableScroll() {
  $("html, body").css("overflow", "auto");
}

// ハンバーガーメニューが開かれた時にスクロールを禁止
$(document).on("click", ".js-hamburger.is-active", function () {
  disableScroll();
});

// ハンバーガーメニューが閉じられた時にスクロールを有効化
$(document).on("click", ".js-hamburger:not(.is-active)", function () {
  enableScroll();
});


///// MV-swiper /////

var swiper = new Swiper(".js-mv-swiper", {
  loop: true,
  effect: "fade", // 画像をフェードで切り替える
  autoplay: {
    delay: 5000, // 単位 : ms 1000ms = 1s
  },
  speed: 2000, // 2秒かけてフェード
});

// campaign-swiper //

var swiper = new Swiper(".js-campaign-swiper", {

    slidesPerView: 1.26,
  breakpoints: {
    // 768px以上の場合
    768: {
      slidesPerView: 2,
    },
    // 980px以上の場合
    980: {
      slidesPerView: 2.7,
    },
    // 1281px以上の場合
    1281: {
      slidesPerView: 3.48,
      spaceBetween: "3%", // PCの場合のスライド間の余白を3%に設定
    }},
  spaceBetween: "6.4%", // スライド間の余白
  speed: 3000, // 2秒かけてフェード
  loop:true,
  autoplay:{
    delay:3000,//単位 : ms 1000ms = 1s
    disableOnInteraction:false,//ドラッグしても自動再生が止まらない
  },
  pagination: {
    el: ".js-campaign-pagination",
    clickable: true,
  },
  navigation:{
    nextEl:'.campaign .swiper-button-next',
    prevEl:'.campaign .swiper-button-prev',
  }
});

///// トップへ戻るボタン/////

$(function () {
  const pageTop = $(".to-top");
  const footer = $(".footer");
  const footerHeight = footer.innerHeight();
  let distanceFromFooter;

  pageTop.hide();
  $(window).resize(function () {
    // ウィンドウの幅に応じて余白を設定
    const windowWidth = $(window).width();
    distanceFromFooter = windowWidth < 768 ? 16 : 20; // SP（幅が768px未満）なら16、それ以外（PC）なら20の余白を設定
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }

    const windowHeight = $(window).height();
    const documentHeight = $(document).height();
    const scrollPosition = $(this).scrollTop() + windowHeight;
    const stopPosition = documentHeight - footerHeight - distanceFromFooter;

    if (scrollPosition >= stopPosition) {
      pageTop.css({
        position: "absolute",
        bottom: footerHeight + distanceFromFooter,
      });
    } else {
      pageTop.css({
        position: "fixed",
        bottom: distanceFromFooter,
      });
    }
  }).trigger('resize'); // 初回読み込み時にもウィンドウ幅を判別して余白を設定するようにします

  pageTop.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });
});

///// 画像のスライドアニメーション /////

//要素の取得とスピードの設定
var box = $('.slide-animation'),
    speed = 700;

//.slide-animationの付いた全ての要素に対して下記の処理を行う
box.each(function () {
    $(this).append('<div class="color"></div>')
    var color = $(this).find('.color'),
        image = $(this).find('img');
    var counter = 0;

    image.css('opacity', '0');
    color.css('width', '0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function () {
        if (counter == 0) {
            $(this).delay(200).animate({ 'width': '100%' }, speed, function () {
                image.css('opacity', '1');
                $(this).css({ 'left': '0', 'right': 'auto' });
                $(this).animate({ 'width': '0%' }, speed);
            })
            counter = 1;
        }
    });
});


