// メインビジュアル
const slides = document.querySelectorAll(".main_visual-item");
let currentSlide = 0;

function showSlide() {
    // 現在のスライドを非表示にする
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    // 次のスライドを表示する
    slides[currentSlide].classList.add("active");

    // 次のスライドに進む
    currentSlide = (currentSlide + 1) % slides.length;
}

// 初期スライドの表示
showSlide();

// 6秒ごとにスライドを切り替え
setInterval(showSlide, 6000);

//--- メインビジュアル---ここまで

// 四角が左下へ
document.addEventListener("DOMContentLoaded", function () {
    const aboutusBoxLeft = document.querySelector(".aboutus_box-left");

    function handleScroll() {
        const rect = aboutusBoxLeft.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // 画面の下から70%の位置に来たらアニメーション開始
        if (rect.top < windowHeight * 0.5) {
            aboutusBoxLeft.classList.add("active");
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初回チェック（リロード時に適用するため）
});

// 四角が左下へ
document.addEventListener("DOMContentLoaded", function () {
    const languageBoxes = document.querySelectorAll(".language_box-left");

    function handleScroll() {
        languageBoxes.forEach((languageBox) => {
            const rect = languageBox.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.5) {
                languageBox.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初回チェック
});

// 下からスライドイン
document.addEventListener("scroll", function () {
    const items = document.querySelectorAll(".service_bottombox-item");

    items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // ボックスが画面の50%位置に来たら
        if (rect.top <= windowHeight * 0.8) {
            item.classList.add("visible");
            // 遅延を設定
            item.style.animationDelay = `${index * 0.3}s`; // 左から1秒ずつ遅れて表示
        }
    });
});
