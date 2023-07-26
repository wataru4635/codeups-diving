
jQuery(function ($) {
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


// mv-swiper //

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
      slidesPerView: 3.5,
      spaceBetween: "3.5%", // PCの場合のスライド間の余白を3%に設定
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
