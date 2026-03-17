document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. 全てのセクションとメニューの取得
    // ----------------------------------------------------
    const homeMenu = document.getElementById('home-menu');
    const sections = document.querySelectorAll('.content-section');
    const headerBackBtn = document.getElementById('header-back-btn');

    // 画面切り替え機能（グローバルにアクセスできるようにwindowオブジェクトに紐付け）
    window.showSection = function(sectionId) {
        homeMenu.style.display = 'none';
        sections.forEach(sec => {
            sec.style.display = 'none';
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            headerBackBtn.style.display = 'block'; // ヘッダーの戻るボタンを表示
            window.scrollTo(0, 0);
        }
    };

    // ホームに戻る関数
    window.showHome = function() {
        sections.forEach(sec => sec.style.display = 'none');
        homeMenu.style.display = 'block';
        headerBackBtn.style.display = 'none'; // ヘッダーの戻るボタンを非表示
        window.scrollTo(0, 0);
    };

    // ----------------------------------------------------
    // 2. 💡 タブ切り替え機能（チャネル説明用）
    // ----------------------------------------------------
    window.openTab = function(evt, tabId) {
        // すべてのタブの中身を隠す
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        // すべてのタブボタンの選択状態（色）を解除する
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // クリックされたタブの中身を表示し、ボタンを選択状態にする
        const targetTab = document.getElementById(tabId);
        if(targetTab) {
            targetTab.classList.add('active');
        }
        evt.currentTarget.classList.add('active');
    };

    // ----------------------------------------------------
    // 3. 📋 コピー機能（🍞 トースト通知版）
    // ----------------------------------------------------
    let toastTimeout;
    window.copyFormat = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            
            // 既存のタイマーがあればリセット（連続タップ対策）
            clearTimeout(toastTimeout);
            
            // 2.5秒後にスッと消す
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);
        }).catch(err => {
            alert('コピーに失敗しました。手動でコピーしてください。');
        });
    };

    // ----------------------------------------------------
    // 4. 🌙 ダークモード機能（完全バグ修正版）
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        // 保存された設定を読み込む
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleBtn.textContent = '☀️';
        }

        // ボタンクリックで切り替え
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggleBtn.textContent = '🌙';
            }
        });
    }
});