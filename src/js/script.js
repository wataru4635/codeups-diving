jQuery(function ($) {


  // ==========================================================================
  // ローディングアニメーション
  // ==========================================================================
function disableVerticalScrollForSeconds(seconds) {
  disableVerticalScroll();
  setTimeout(enableVerticalScroll, seconds * 1000);
}

function hideAnimation() {
  loadingAnimation.style.display = "block";
}

function disableVerticalScroll() {
  document.body.style.overflowY = "hidden";
}

function enableVerticalScroll() {
  document.body.style.overflowY = "auto";
}

let loadingAnimation = document.querySelector(".js-mv-swiper");
let leftImage = document.querySelector(".loading-mv__img-left img");
let rightImage = document.querySelector(".loading-mv__img-right img");
let loadingHeader = document.querySelector(".loading-mv__header");
let mainHeader = document.querySelector(".mv__header");
let header = document.querySelector(".js-header");
let gsapAnimationDuration = 1000; // GSAPアニメーションの時間（ミリ秒単位）
let swiperDelay = 3000; // Swiperの初回発火までの時間（ミリ秒単位）
let sessionKey = "animationSession";

// 初回アクセス時にフラグをセッションストレージに設定
if (!sessionStorage.getItem("animationPlayed")) {
  disableVerticalScrollForSeconds(7);

  gsap.fromTo(
    rightImage,
    { opacity: 0, y: "100%" },
    {
      opacity: 1,
      y: "0%",
      duration: 3,
      delay: 3.2,
      ease: "power2.out"
    }
  );

  gsap.fromTo(
    leftImage,
    { opacity: 0, y: "100%" },
    {
      opacity: 1,
      y: "0%",
      duration: 3,
      delay: 3,
      ease: "power2.out"
    }
  );

  gsap.fromTo(
    loadingAnimation,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 2,
      delay: 6,
      ease: "none",
      onComplete: hideAnimation,
    }
  );

  gsap.fromTo(
    mainHeader,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 2,
      ease: "power1.out",
      delay: 6,
    }
  );

  gsap.fromTo(
    header,
    { opacity: 0, y: -50 },
    {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power1.out",
      delay: 5,
    }
  );

  gsap.fromTo(
    loadingHeader,
    { opacity: 1 },
    {
      opacity: 0,
      duration: 2,
      ease: "power1.out",
      delay: 1,
    }
  );

  if (!sessionStorage.getItem(sessionKey)) {
    loadingHeader.style.display = "block";
    sessionStorage.setItem(sessionKey, true);
  } else {
    loadingHeader.style.display = "none";
  }

  sessionStorage.setItem("animationPlayed", true);
} else {
  let loadingHeaders = document.querySelectorAll(".loading-mv__header");
  loadingHeaders.forEach((loadingHeader) => {
    loadingHeader.style.display = "none";
  });
}

setTimeout(function () {
  let swiper = new Swiper(".js-mv-swiper", {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 3000,
    },
    speed: 2000,
  });
}, gsapAnimationDuration + swiperDelay);

  // ==========================================================================
  //  ハンバーガメニュー
  // ==========================================================================

  $(".js-hamburger").click(function () {
    if ($(".js-hamburger").hasClass("is-show")) {
      // ハンバーガーメニューがアクティブ状態の場合、非アクティブにする
      $(".js-hamburger").removeClass("is-show");
      $("body").removeClass("menu-open"); // スクロールを有効にするためにクラスを削除
      $(".js-sp-nav").fadeOut(300); // .js-sp-nav要素をフェードアウトさせる
      // headerのbackground-colorを元の値に戻す（ここでは初期のbackground-colorを"rgba(13, 41, 54, 0.68)"と仮定しています）
      $(".header").css("background-color", "rgba(13, 41, 54, 0.68)");
    } else {
      // ハンバーガーメニューが非アクティブ状態の場合、アクティブにする
      $(".js-hamburger").addClass("is-show");
      $("body").addClass("menu-open"); // スクロールを無効にするためにクラスを追加
      $(".js-sp-nav").fadeIn(300); // .js-sp-nav要素をフェードインさせる
      // headerのbackground-colorを$accent-colorに変更する
      $(".header").css("background-color", "#408F95");
    }
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
  $(document).on("click", ".js-hamburger.is-show", function () {
    disableScroll();
  });

  // ハンバーガーメニューが閉じられた時にスクロールを有効化
  $(document).on("click", ".js-hamburger:not(.is-show)", function () {
    enableScroll();
  });

  // ==========================================================================
  // campaign-swiper
  // ==========================================================================

  let swiper = new Swiper(".js-campaign-swiper", {
    slidesPerView: "auto",
    spaceBetween: 24, // スライド間の余白
    speed: 2000, //
    loop: true,
    breakpoints: {
      // 768px以上の場合
      768: {
        spaceBetween: 40,
      },
    },
    autoplay: {
      delay: 2000, //単位 : ms 1000ms = 1s
      disableOnInteraction: false, //ドラッグしても自動再生が止まらない
    },
    pagination: {
      el: ".js-campaign-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".campaign .swiper-button-next",
      prevEl: ".campaign .swiper-button-prev",
    },
  });


  // ==========================================================================
  // トップへ戻るボタン
  // ==========================================================================

  $(function () {
    let pageTop = $(".js-to-top");
    let footer = $(".footer");
    let footerHeight = footer.innerHeight();
    let distanceFromFooter;

    pageTop.hide();
    $(window).resize(function () {
      // ウィンドウの幅に応じて余白を設定
      let windowWidth = $(window).width();
      distanceFromFooter = windowWidth < 768 ? 16 : 20; // SP（幅が768px未満）なら16、それ以外（PC）なら20の余白を設定
    });

    $(window)
      .scroll(function () {
        if ($(this).scrollTop() > 100) {
          pageTop.fadeIn();
        } else {
          pageTop.fadeOut();
        }

        let windowHeight = $(window).height();
        let documentHeight = $(document).height();
        let scrollPosition = $(this).scrollTop() + windowHeight;
        let stopPosition = documentHeight - footerHeight - distanceFromFooter;

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
      })
      .trigger("resize"); // 初回読み込み時にもウィンドウ幅を判別して余白を設定するようにします

    pageTop.click(function () {
      $("body,html").animate({
          scrollTop: 0,
        },
        500
      );
      return false;
    });
  });


  // ==========================================================================
  // 画像のスライドアニメーション
  // ==========================================================================

  //要素の取得とスピードの設定
  let box = $(".js-slide-animation"),
    speed = 700;

  //.slide-animationの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="js-slide-animation__color"></div>');
    let color = $(this).find(".js-slide-animation__color"),
      image = $(this).find("img");
    let counter = 0;

    image.css("opacity", "0");
    color.css("width", "0%");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this)
          .delay(200)
          .animate({
            width: "100%"
          }, speed, function () {
            image.css("opacity", "1");
            $(this).css({
              left: "0",
              right: "auto"
            });
            $(this).animate({
              width: "0%"
            }, speed);
          });
        counter = 1;
      }
    });
  });

  // ==========================================================================
  // ギャラリー覧の拡大画像モーダル処理
  // ==========================================================================

  // ギャラリー画像モーダル表示イベント
  $(".js-modal img").click(function () {
    // まず、クリックした画像の HTML(<img>タグ全体)を#frayDisplay内にコピー
    $(".js-modal-event").html($(this).prop("outerHTML"));
    //そして、fadeInで表示する。
    $(".js-modal-event").fadeIn(200);
    // モーダル表示時に背景スクロール禁止
    $("body").css("overflow", "hidden");

    return false;
  });

  // ギャラリー画像モーダル非表示イベント
  // モーダル画像背景 または 拡大画像そのものをクリックで発火
  $(".js-modal-event").click(function () {
    // 非表示にする
    $(".js-modal-event").fadeOut(200);
    // モーダル非表示時に背景スクロール許可
    $("body").css("overflow", "auto");

    return false;
  });

});

// ==========================================================================
// インフォメーションのタブの切り替え
// ==========================================================================

window.addEventListener('DOMContentLoaded', function () {
  const tabList = document.querySelectorAll('.information-tab__list');
  const tabContents = document.querySelectorAll('.js-tabContent');

  // タブがクリックされた際の処理
  tabList.forEach((element, i) => {
    element.addEventListener('click', function () {
      // タブのクリック状態を切り替える
      if (!element.classList.contains('is-active')) {
        toggleClass(element, 'is-active');
      }

      // クリックされたタブに対応するコンテンツを表示する
      toggleClass(tabContents[i], 'is-active');

      // 他のタブとコンテンツを非表示にする（必要であれば）
      for (let j = 0; j < tabContents.length; j++) {
        if (j !== i) {
          tabList[j].classList.remove('is-active');
          tabContents[j].classList.remove('is-active');
        }
      }
    });
  });

  function toggleClass(target, c) {
    var targetSiblings = getSiblings(target);
    targetSiblings.forEach(el => {
      el.classList.remove(c)
    });
    target.classList.add(c);
  }

  // 同じ階層の要素を全て取得する関数
  function getSiblings(e) {
    let siblings = [];
    if (!e.parentNode) {
      return siblings;
    }
    let sibling = e.parentNode.firstChild;
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== e) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
    return siblings;
  };

  const footerTabList = document.querySelectorAll('.js-tab-list');

  footerTabList.forEach((element, i) => {
    element.addEventListener('click', function () {
      // フッタータブのクリック状態を切り替える
      if (!element.classList.contains('is-active')) {
        toggleClass(element, 'is-active');
      }

      let footerTab = document.querySelector(`[data-tab="${element.dataset.tab}"]`);
      if (footerTab) {
        toggleClass(footerTab, 'is-active');
      }

      // フッタータブがクリックされた際に、ページタブとページコンテンツを連動させる処理を追加
      const targetTab = element.dataset.tab;
      const matchingPageTab = document.querySelector(`.information-tab__list[data-tab="${targetTab}"]`);

      if (matchingPageTab) {
        toggleClass(matchingPageTab, 'is-active');

        // 対応するコンテンツも表示する
        const matchingPageContent = document.querySelector(`.js-tabContent[data-tab="${targetTab}"]`);
        if (matchingPageContent) {
          toggleClass(matchingPageContent, 'is-active');
        }
      }

    })
  })

  // URLからクエリパラメータを取得
  const params = new URLSearchParams(window.location.search);
  const targetTab = params.get('tab');

  // クエリパラメータが存在する場合は、該当のタブを表示する
  if (targetTab) {
    // クリックイベントを作成して実行
    const event = new Event('click', {
      bubbles: true
    });
    const targetElement = document.querySelector(`[data-tab="${targetTab}"]`);
    if (targetElement) {
      targetElement.dispatchEvent(event);
    }
  }

});



//アコーディオンをクリックした時の動作
$('.js-faq-question').on('click', function () { //タイトル要素をクリックしたら
  let findElm = $(this).next(".js-faq-answer"); //直後のアコーディオンを行うエリアを取得し
  $(findElm).slideToggle(); //アコーディオンの上下動作

  if ($(this).hasClass('js-faq-open')) { //タイトル要素にクラス名closeがあれば
    $(this).removeClass('js-faq-open'); //クラス名を除去し
  } else { //それ以外は
    $(this).addClass('js-faq-open'); //クラス名closeを付与
  }
});


// ==========================================================================
// アーカイブのアコーディオン
// ==========================================================================

jQuery('.sidebar-accordion__year').click(function () {
  jQuery(this).next().slideToggle();
  jQuery(this).toggleClass('is-open');
});

// ==========================================================================
// お問い合わせフォームエラーメッセージ
// ==========================================================================
$(document).ready(function () {
  // ページ読み込み時に実行される関数
  $('.contact-form_error').hide(); // 最初はエラーメッセージを非表示に

  $('form').validate({
    // フォームのバリデーションを設定

    rules: {
      // 各フォームのルールを定義
      text_name: {
        required: true, // 名前が必須
      },
      mail_address: {
        required: true, // メールアドレスが必須
        email: true, // メールアドレスの形式チェック
      },
      tel: {
        required: true, // 電話番号が必須
      },
      contents: {
        required: true, // お問い合わせ内容が必須
      }
    },
    messages: {
      // 各ルールに対するエラーメッセージを定義
      text_name: {
        required: '※必須項目が入力されていません。<span class="u-mobile"><br>&emsp;</span>入力してください.',
      },
      mail_address: {
        required: '※必須項目が入力されていません。<span class="u-mobile"><br>&emsp;</span>入力してください.',
        email: '', // メールアドレスの形式エラー
      },
      tel: {
        required: '※必須項目が入力されていません。<span class="u-mobile"><br>&emsp;</span>入力してください.',
      },
      contents: {
        required: '※必須項目が入力されていません。<span class="u-mobile"><br>&emsp;</span>入力してください.',
      },
    },
    errorPlacement: function (err, elem) {
      // エラーメッセージの表示場所とスタイリングをカスタマイズ
      $('.js-error').html(err);
      elem.addClass('js-invalid');
      $('.contact-form_error').show(); // エラーメッセージを表示
    }
  });

  $('form').submit(function () {
    // フォームが送信されたときの処理
    if (!$('form').valid()) {
      // フォームがバリデーションを通過しない場合
      $('.js-error').show(); // エラーメッセージを表示
      return false; // フォーム送信を阻止
    }
  });
  $('form').submit(function () {
    if (!$('form').valid()) {
      return false;
    } else {
      window.location.href = "page-contact-Thanks.html"; // 送信成功時にリダイレクト
      return false; // フォームの送信を阻止
    }
  });
});
