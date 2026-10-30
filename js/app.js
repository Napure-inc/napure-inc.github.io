//ローディング画面の処理
window.addEventListener("DOMContentLoaded", function () {
    const loadingElement = document.getElementById("loader");

    function hideLoading() {
        loadingElement.style.transition = "opacity .6s ease, visibility .6s ease";
        loadingElement.style.opacity = 0;
        loadingElement.style.visibility = "hidden";

        setTimeout(() => {
            loadingElement.style.display = "none";
        }, 600);
    }

    console.log("sessionStorage firstVisit:", sessionStorage.getItem("firstVisit"));

    if (!sessionStorage.getItem("firstVisit")) {
        sessionStorage.setItem("firstVisit", "true");

        loadingElement.style.display = "flex"; // 初回のみ表示
        setTimeout(() => {
            hideLoading();
        }, 5500);
    } else {
        hideLoading(); // 2回目以降は最初から非表示
    }
});

// ヘッダーのスクロール影
window.addEventListener("scroll", function () {
    // ヘッダーを変数の中に格納する
    const header = document.querySelector("header");
    // 20px以上スクロールしたらヘッダーに「scroll-nav」クラスをつける
    header.classList.toggle("scroll-nav", window.scrollY > 20);
});

// ハンバーガーメニュー
function navFunc() {
    document.querySelector("html").classList.toggle("open");
}

window.addEventListener("load", function () {
    const logo = document.querySelector(".hamburger_logo");

    // 最初に遅延して表示
    setTimeout(function () {
        logo.classList.add("visible"); // 初回の表示
    }, 2000); // 初回表示を遅延 (500ms)

    // 2秒ごとに繰り返し表示
    setInterval(function () {
        logo.classList.remove("visible"); // アニメーションをリセット
        setTimeout(function () {
            logo.classList.add("visible"); // アニメーションを再適用
        }, 50); // 少し遅延を加えてから再適用
    }, 2000); // 2秒ごとに繰り返し表示
});

// ナピュアスクロール表示
document.addEventListener("DOMContentLoaded", () => {
    const titles = document.querySelectorAll(".president_logo");

    const handleScroll = () => {
        titles.forEach((title) => {
            const rect = title.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // 要素が画面に入ったらアニメーションを開始
            if (rect.top < windowHeight && rect.bottom > 0.2) {
                title.classList.add("animate");
            }
        });
    };

    // ページ読み込み時にもアニメーションを適用
    handleScroll();

    // スクロールイベントを監視
    window.addEventListener("scroll", handleScroll);
});

// スクロールでアニメーションを発動させる
document.addEventListener("DOMContentLoaded", () => {
    const blockTitleElements = document.querySelectorAll(".block-title-main");

    if (blockTitleElements.length === 0) {
        console.error("要素が見つかりません");
        return;
    }

    const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const blockTitleElement = entry.target;
                const imgWrap = blockTitleElement.querySelector(".img-wrap");
                const titleText = blockTitleElement.querySelector("h2");

                if (imgWrap) {
                    imgWrap.classList.add("animate");

                    // `.img-wrap` のアニメーションが終わったら `h2` を表示
                    setTimeout(() => {
                        if (titleText) titleText.classList.add("animate-h2");
                    }, 0); //
                }

                observer.unobserve(entry.target); // 一度だけ発動
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.8 // 80% 以上見えたら発動
    });

    blockTitleElements.forEach((element) => observer.observe(element));
});

// 左右スライド
document.addEventListener("DOMContentLoaded", function () {
    const leftBoxes = document.querySelectorAll(".anim-box.slidein-left");
    const rightBoxes = document.querySelectorAll(".anim-box.slidein-right");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.8 //
    };

    const leftObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains("is-animated-slide")) {
                entry.target.classList.add("is-animated-slide");
            }
        });
    }, observerOptions);

    const rightObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains("is-animated-slide")) {
                setTimeout(() => {
                    entry.target.classList.add("is-animated-slide");
                }, 300); // 0.8秒遅らせる
            }
        });
    }, observerOptions);

    leftBoxes.forEach((box) => leftObserver.observe(box));
    rightBoxes.forEach((box) => rightObserver.observe(box));
});

// 上下スライド（左側）
document.addEventListener("DOMContentLoaded", function () {
    const animBoxes = document.querySelectorAll(".anim-box.slidein-left");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !entry.target.classList.contains("is-animated-fade")) {
                    entry.target.classList.add("is-animated-fade");

                    // 画像のアニメーションを開始（順番を逆にする）
                    const images = entry.target.querySelectorAll(".listing_box-left_imgbox img");
                    const reversedImages = Array.from(images).reverse(); // 配列を逆順にする

                    reversedImages.forEach((img, index) => {
                        setTimeout(() => {
                            img.classList.add("show");
                        }, index * 800); // 1秒ずつ遅延
                    });
                }
            });
        },
        {
            root: null,
            rootMargin: "5px",
            threshold: 0.8
        }
    );

    animBoxes.forEach((box) => {
        observer.observe(box);
    });
});

// 上下スライド（右側）
document.addEventListener("DOMContentLoaded", function () {
    const animBoxes = document.querySelectorAll(".anim-box.slidein-right");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !entry.target.classList.contains("is-animated-fade")) {
                    entry.target.classList.add("is-animated-fade");

                    // 画像のアニメーションを開始（順番を逆にする）
                    const images = entry.target.querySelectorAll(".listing_box-right_imgbox img");
                    const reversedImages = Array.from(images).reverse(); // 配列を逆順にする

                    reversedImages.forEach((img, index) => {
                        setTimeout(() => {
                            img.classList.add("show");
                        }, index * 800); // 1秒ずつ遅延
                    });
                }
            });
        },
        {
            root: null,
            rootMargin: "5px",
            threshold: 0.8
        }
    );

    animBoxes.forEach((box) => {
        observer.observe(box);
    });
});

// TOPボタン
$(document).ready(function () {
    // スクロールイベントを監視
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $("#page_top").fadeIn();
        } else {
            $("#page_top").fadeOut();
        }
    });

    // ボタンをクリックしてページトップに戻る処理
    $("#page_top").click(function (e) {
        e.preventDefault(); // デフォルト動作を無効化
        $("html, body").animate({ scrollTop: 0 }, 500); // スムーズスクロール
    });
});

// サークル回転
document.addEventListener("DOMContentLoaded", function () {
    const circles = [
        document.querySelector(".support_box-leftcircle1"),
        document.querySelector(".support_box-leftcircle2"),
        document.querySelector(".support_box-leftcircle3")
    ];

    const centerBox = document.querySelector(".support_box-left-center-circlebox");

    const centerX = centerBox.offsetLeft + centerBox.offsetWidth / 2 + 370;
    const centerY = centerBox.offsetTop + centerBox.offsetHeight / 2 + 90;
    const radius = 130; // 軌道の半径
    let lastTime = performance.now(); // 最後に更新した時間
    let angle = 0; // 初期角度
    const speed = 0.005; // 速度調整

    function rotateCircles(timestamp) {
        let deltaTime = (timestamp - lastTime) / 1000; // 前回からの経過時間(秒)
        lastTime = timestamp; // 更新

        angle += speed * deltaTime * 60; // フレームレートを考慮して更新

        for (let i = 0; i < circles.length; i++) {
            let theta = angle + i * ((Math.PI * 2) / circles.length); // 3等分の角度
            let x = centerX + radius * Math.cos(theta) - circles[i].offsetWidth / 2;
            let y = centerY + radius * Math.sin(theta) - circles[i].offsetHeight / 2;

            circles[i].style.position = "absolute";
            circles[i].style.left = `${x}px`;
            circles[i].style.top = `${y}px`;
        }
        requestAnimationFrame(rotateCircles);
    }

    requestAnimationFrame(rotateCircles);
});

// 選択アイテム

let order = ["opt1", "opt2", "opt3"];
let descriptions = {
    opt1: "不動産に関する法律についてのお悩みを専門家が丁寧にサポートします。\nわかりやすく適切な解決策をご提案いたします。",
    opt2: "私たちはお客様のニーズに応じた不動産ソリューションを\n法律・流通に精通する宅建士が最適なメリットをご提供します。",
    opt3: "様々な相続・遺産問題を過去の事例を用いながら、解決へ向けて考え、\n円満かつ最適な解決策をご提案しサポートしてまいります。"
};
let links = {
    opt1: "./renovation/index.html",
    opt2: "./renovation/index.html",
    opt3: "./renovation/index.html"
};

function rotate(direction) {
    if (direction === 1) {
        order.unshift(order.pop());
    } else {
        order.push(order.shift());
    }
    updateView();
}

function updateView() {
    document.getElementById(order[0]).className = "option small left";
    document.getElementById(order[1]).className = "option big";
    document.getElementById(order[2]).className = "option small right";
    document.getElementById("description").textContent = descriptions[order[1]];
    document.getElementById("description-link").setAttribute("href", links[order[1]]);

    // クリック可能な要素の更新
    document.getElementById(order[0]).setAttribute("href", "#");
    document.getElementById(order[0]).style.pointerEvents = "none";
    document.getElementById(order[1]).setAttribute("href", links[order[1]]);
    document.getElementById(order[1]).style.pointerEvents = "auto";
    document.getElementById(order[2]).setAttribute("href", "#");
    document.getElementById(order[2]).style.pointerEvents = "none";
}

// ページ読み込み時に初期設定を適用
document.addEventListener("DOMContentLoaded", updateView);

// タッチイベント
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;
const slider = document.querySelector(".service_door_box");

// タッチ開始時
function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchEndX = touchStartX; // 初期値をセット
    isSwiping = false; // スワイプしていない状態
}

// タッチ移動中（スワイプ検知）
function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
    if (Math.abs(touchEndX - touchStartX) > 10) {
        isSwiping = true; // 一定距離動いたらスワイプ開始
    }
}

// タッチ終了時（タップ or スワイプ判定）
function handleTouchEnd(event) {
    let moveDistance = touchEndX - touchStartX;

    if (!isSwiping) {
        // スワイプしていない（= タップの場合）
        let targetLink = document.getElementById(order[1]).getAttribute("href");
        if (targetLink !== "#") {
            window.location.href = targetLink;
        }
        return;
    }

    // スワイプ処理（50px以上移動でスライド）
    if (moveDistance < -50) {
        rotate(1); // 左スワイプ
    } else if (moveDistance > 50) {
        rotate(-1); // 右スワイプ
    }
}

// タッチイベントを `service_door_box` に設定
slider.addEventListener("touchstart", handleTouchStart, false);
slider.addEventListener("touchmove", handleTouchMove, false);
slider.addEventListener("touchend", handleTouchEnd, false);

// `chrome.runtime.onMessage.addListener` は1回だけ定義
if (typeof chrome !== "undefined" && chrome.runtime) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "doSomething") {
            fetch("https://example.com/data")
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    sendResponse({ success: true, data });
                })
                .catch((error) => {
                    console.error(error);
                    sendResponse({ success: false, error: error.message });
                });

            return true; // 非同期処理の完了を待つ
        }
    });
} else {
    console.error("chrome API が利用できません。拡張機能の環境で実行してください。");
}
// フォームのバリデーション
window.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contact-form");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        let isValid = true;

        // 必須項目のバリデーション
        form.querySelectorAll("[required]").forEach((field) => {
            let errorSpan = field.parentElement.querySelector(".error-message");

            // checkboxはcheckedで判定
            const isEmpty = field.type === "checkbox" ? !field.checked : !field.value.trim();

            if (isEmpty) {
                if (!errorSpan) {
                    errorSpan = document.createElement("span");
                    errorSpan.classList.add("error-message");
                    errorSpan.setAttribute("aria-live", "polite");
                    field.parentElement.appendChild(errorSpan);
                }

                if (field.type === "checkbox") {
                    errorSpan.textContent = "※プライバシーポリシーに同意してください。";
                } else {
                    errorSpan.textContent = "※こちらの項目は必須です。";
                }

                errorSpan.style.display = "block";
                isValid = false;
            } else if (errorSpan) {
                errorSpan.style.display = "none";
            }
        });

        // メールアドレスの形式チェック
        const emailField = form.querySelector("#email");
        if (emailField) {
            let emailError = emailField.parentElement.querySelector(".error-message");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailField.value.trim() && !emailRegex.test(emailField.value)) {
                if (!emailError) {
                    emailError = document.createElement("span");
                    emailError.classList.add("error-message");
                    emailField.parentElement.appendChild(emailError);
                }
                emailError.textContent = "※有効なメールアドレスを入力してください。";
                emailError.style.display = "block";
                isValid = false;
            } else if (emailError) {
                emailError.style.display = "none";
            }
        }

        // 電話番号の形式チェック
        const telField = form.querySelector("#tel");
        if (telField) {
            let telError = telField.parentElement.querySelector(".error-message");
            const telRegex = /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/;

            if (telField.value.trim() && !telRegex.test(telField.value)) {
                if (!telError) {
                    telError = document.createElement("span");
                    telError.classList.add("error-message");
                    telField.parentElement.appendChild(telError);
                }
                telError.textContent = "※有効な電話番号を入力してください。";
                telError.style.display = "block";
                isValid = false;
            } else if (telError) {
                telError.style.display = "none";
            }
        }

        // 全体エラーメッセージ
        let globalError = form.querySelector("#global-error");
        if (!isValid) {
            if (!globalError) {
                globalError = document.createElement("div");
                globalError.id = "global-error";
                globalError.style.color = "red";
                globalError.style.marginBottom = "20px";
                globalError.textContent = "入力に誤りがあります。確認してください。";
                form.prepend(globalError);
            }
            event.preventDefault();
        } else if (globalError) {
            globalError.remove();
        }
    });
});

// アコーディオンメニュー
