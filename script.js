// script.js
const tg = window.Telegram?.WebApp || null;
if (localStorage.getItem('userToken') === 'GUo80GZ1KU7Jm9G4'){
    localStorageClearbtn.style.display = 'block'
}
const menu = document.getElementById('customMenu');
const copyBtn = document.getElementById('copyBtn');
const selectBtn = document.getElementById('selectBtn');

const isTouch = window.matchMedia('(pointer: coarse)').matches;

// Список запрещённых слов для проверки во всех инпутах
const globalBadWords = [
  'говно', 'хейт', 'порно', 'аноним', 'admin', 'админ', 'moder', 'модер', 'модератор',
  'продавец премиума', 'seller of premium', 'seller of premium account', 'премиум', 'премиум пользователь',
  'premium user', 'пользователь премиума', 'user of premium', 'user of premium account', '*', '"', "'",
  'сука', 'пидор', 'пидорас', 'мразь', 'ублюдок', 'тварь', 'хуй', 'хер', 'еблан', 'ебанат', 'даун',
  'дебил', 'идиот', 'чмо', 'гнида', 'тупой', 'блядь', 'бля', 'хуесос', 'нахуй', 'пошел нахуй',
  'иди нахуй', 'урод', 'скотина', 'сволочь', 'мудак', 'петух', 'шлюха', 'проститутка', 'сучка',
  'падла', 'долбоеб', 'долбаеб', 'ебаный', 'ебать', 'залупа', 'пизда', 'пиздец', 'fuck', 'fucking',
  'bitch', 'asshole', 'bastard', 'dick', 'cock', 'pussy', 'shit', 'slut', 'whore', 'cunt', 'motherfucker',
  'nigger', 'nigga', 'retard', 'stupid', 'idiot', 'dumbass', 'loser', 'jerk', 'gay', 'fag', 'faggot',
  'suck', 'sucker', 'kill yourself', 'kms', 'puta', 'gilipollas', 'mierda', 'pendejo', 'cabron', 'maricon',
  'coño', 'idiota', 'imbecil', 'tonto', 'perra', 'arschloch', 'scheisse', 'hurensohn', 'fotze', 'wichser',
  'dummkopf', 'connard', 'salope', 'pute', 'merde', 'enculé', 'con', 'stronzo', 'coglione', 'puttana',
  'troia', 'cretino', 'merda', 'caralho', 'filho da puta', 'otário', 'burro', 'sharmuta', 'ibn kalb',
  'ibn al sharmuta', 'kalb', 'khara', 'jahel', 'madarchod', 'behenchod', 'chutiya', 'bhosdike', 'lund',
  'randi', 'harami', 'orospu', 'siktir', 'amk', 'mal', 'aptal', 'gerizekali', 'kurwa', 'pierdol', 'chuj',
  'jebac', 'debil', 'anjing', 'bangsat', 'kontol', 'memek', 'tolol', 'bodoh', 'shabi', 'caonima', 'gou ri',
  'sb', 'ni ma', 'ssibal', 'gaesaekki', 'jot', 'meongcheong', 'baegopa', 'хентай', 'hentai', 'минет',
  'minet', 'эротика', 'erotica'
];

// Функция глобальной проверки на плохие слова
function containsBadWords(text) {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  return globalBadWords.some(word => lowerText.includes(word));
}

// Функция для показа алертов в виде модального окна
function showAlertModal(message) {
    let errorModal = document.getElementById('error-modal');
    let errorMessage = document.getElementById('error-message');
    let errorOkBtn = document.getElementById('error-ok-btn');
    
    // Если модального окна нет - создаем его
    if (!errorModal) {
        const style = document.createElement('style');
        style.textContent = `
            #error-modal {
                display: none;
                position: fixed;
                inset: 0;
                background: rgba(6,8,20,0.55);
                backdrop-filter: blur(6px) saturate(120%);
                justify-content: center;
                align-items: center;
                z-index: 10000;
                padding: 20px;
            }
            #error-modal.show { display: flex; }
            @keyframes modalIn { from { opacity: 0; transform: translateY(-8px) scale(.995); } to { opacity: 1; transform: translateY(0) scale(1); } }
            #error-modal-content {
                background: linear-gradient(180deg, rgba(15,16,40,0.98), rgba(11,12,26,0.98));
                padding: 18px 18px 14px 18px;
                border-radius: 14px;
                text-align: center;
                max-width: 420px;
                width: 100%;
                border: 1px solid rgba(95,87,255,0.16);
                box-shadow: 0 12px 40px rgba(3,6,20,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
                animation: modalIn .22s ease-out;
                color: #edf0ff;
                display: flex;
                gap: 12px;
                align-items: center;
            }
            #error-modal .modal-icon {
                flex: 0 0 44px;
                height: 44px;
                width: 44px;
                border-radius: 10px;
                background: linear-gradient(180deg,#ff6b6b,#ff4d4d);
                display: inline-flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 6px 18px rgba(255,77,77,0.18);
            }
            #error-modal .modal-icon svg { width:20px; height:20px; color: #fff; }
            #error-body { text-align:left; flex:1; }
            #error-title { font-weight:700; font-size:16px; margin:0 0 6px 0; color:#fff; }
            #error-message { margin:0; color: #dfe6ff; font-size:14px; line-height:1.3; word-wrap:break-word; }
            #error-ok-btn { margin-left:12px; flex: 0 0 auto; background: linear-gradient(180deg,#5f57ff,#3b2fd6); color:#fff; border:0; padding:10px 14px; border-radius:10px; cursor:pointer; font-weight:700; box-shadow: 0 8px 24px rgba(59,47,214,0.18); }
            #error-close { position:absolute; top:14px; right:16px; background:transparent; border:0; color:rgba(255,255,255,0.65); font-size:18px; cursor:pointer; }
        `;
        document.head.appendChild(style);

        const modalHtml = `
            <div id="error-modal" class="show">
                <div id="error-modal-content">
                    <div class="modal-icon" aria-hidden>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="rgba(0,0,0,0.08)"/><path d="M12 7v6" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 16h.01" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <div id="error-body">
                        <div id="error-title">Поле содержит недопустимые слова.</div>
                        <p id="error-message"></p>
                    </div>
                    <button id="error-ok-btn">Понятно</button>
                    <button id="error-close" aria-label="Закрыть">×</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        errorModal = document.getElementById('error-modal');
        errorMessage = document.getElementById('error-message');
        errorOkBtn = document.getElementById('error-ok-btn');
        const errorClose = document.getElementById('error-close');

        errorClose.onclick = () => { errorModal.classList.remove('show'); };
    }
    
    // Показываем модальное окно
    errorMessage.textContent = message;
    errorModal.classList.add('show');
    
    errorOkBtn.onclick = () => { errorModal.classList.remove('show'); };
}

// Функция для показа окна подтверждения (замена confirm)
function showConfirmModal(message) {
    return new Promise((resolve) => {
        let confirmModal = document.getElementById('confirm-modal');
        let confirmMessage = document.getElementById('confirm-message');
        let confirmYesBtn = document.getElementById('confirm-yes-btn');
        let confirmNoBtn = document.getElementById('confirm-no-btn');
        
        // Если модального окна нет - создаем его
        if (!confirmModal) {
            const style = document.createElement('style');
            style.textContent = `
                #confirm-modal { display:none; position:fixed; inset:0; background: rgba(6,8,20,0.55); backdrop-filter: blur(6px); z-index:10000; padding:16px; justify-content:center; align-items:center; }
                #confirm-modal.show{ display:flex; }
                #confirm-modal-content{ background: linear-gradient(180deg, rgba(12,12,34,0.98), rgba(10,9,28,0.98)); padding:16px; border-radius:12px; max-width:420px; width:100%; box-shadow:0 12px 40px rgba(2,4,18,0.6); border:1px solid rgba(95,87,255,0.12); color:#eaf0ff; animation: modalIn .22s ease-out; }
                #confirm-message{ font-weight:700; margin:0 0 12px 0; font-size:15px; color:#fff; }
                #confirm-sub{ margin:0; font-size:13px; color:#cdd7ff; opacity:0.9; }
                #confirm-buttons{ display:flex; gap:10px; margin-top:12px; }
                .btn-secondary{ flex:1; background:transparent; border:1px solid rgba(255,255,255,0.06); color:#d9deff; padding:10px 12px; border-radius:10px; cursor:pointer; }
                .btn-primary{ flex:1; background: linear-gradient(180deg,#5f57ff,#3b2fd6); color:#fff; border:0; padding:10px 12px; border-radius:10px; cursor:pointer; box-shadow:0 8px 20px rgba(59,47,214,0.16); font-weight:700; }
            `;
            document.head.appendChild(style);

            const modalHtml = `
                <div id="confirm-modal" class="show">
                    <div id="confirm-modal-content">
                        <p id="confirm-message"></p>
                        <p id="confirm-sub" style="display:none;"></p>
                        <div id="confirm-buttons">
                            <button id="confirm-no-btn" class="btn-secondary">Нет</button>
                            <button id="confirm-yes-btn" class="btn-primary">Да</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);

            confirmModal = document.getElementById('confirm-modal');
            confirmMessage = document.getElementById('confirm-message');
            confirmYesBtn = document.getElementById('confirm-yes-btn');
            confirmNoBtn = document.getElementById('confirm-no-btn');
        }
        
        // Показываем модальное окно
        confirmMessage.textContent = message;
        const confirmSub = document.getElementById('confirm-sub');
        if (confirmSub) confirmSub.style.display = 'none';
        confirmModal.classList.add('show');

        confirmYesBtn.onclick = () => { confirmModal.classList.remove('show'); resolve(true); };
        confirmNoBtn.onclick = () => { confirmModal.classList.remove('show'); resolve(false); };
    });
}

// Функция для очистки localStorage с подтверждением
async function clearLocalStorageWithConfirm() {
    const confirmed = await showConfirmModal('Очистить весь localStorage?');
    if (confirmed) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
}

let targetElement = null;   // для ПК — элемент под ПКМ
let currentRange = null;    // для мобилок — выделенный текст
document.addEventListener('click', () => {
    menu.style.display = 'none'
})
// ----------------- ПК -----------------
if (!isTouch) {
  document.addEventListener('contextmenu', e => {
    const el = e.target;
    if (!el || !el.innerText.trim()) return; // только текст

    e.preventDefault();

    targetElement = el;
    menu.style.display = 'block';
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
  });
}

// ----------------- Мобильные -----------------
if (isTouch) {
  document.addEventListener('touchstart', e => {
    const el = e.target.closest('.selectable-text');
    if (!el) return;

    let pressTimer = setTimeout(() => {
      const range = document.createRange();
      range.selectNodeContents(el);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      const rect = range.getBoundingClientRect();
      menu.style.left = rect.left + rect.width / 2 + 'px';
      menu.style.top = rect.bottom + 5 + 'px';
      menu.style.display = 'block';

      currentRange = range;
    }, 500); // удержание 0.5 сек

    e.target.addEventListener('touchend', () => clearTimeout(pressTimer), { once: true });
    e.target.addEventListener('touchmove', () => clearTimeout(pressTimer), { once: true });
  });
}



// ----------------- Кнопки -----------------
copyBtn.addEventListener('click', () => {
  if (!isTouch && targetElement) {
    navigator.clipboard.writeText(targetElement.innerText);
  } else if (isTouch && currentRange) {
    navigator.clipboard.writeText(currentRange.toString());
  }

  menu.style.display = 'none';
  targetElement = null;
  currentRange = null;
});

selectBtn.addEventListener('click', () => {
    if (!isTouch){
        document.body.style.userSelect = 'text'
    }
  const sel = window.getSelection();
  sel.removeAllRanges();

  if (currentRange) {
    // Мобильные: выделяем текст, на который навели кастомное меню
    sel.addRange(currentRange);
  } else if (targetElement) {
    // ПК: выделяем весь текст элемента
    const range = document.createRange();
    range.selectNodeContents(targetElement);
    sel.addRange(range);
  }
});


if (tg || tg !== null && window.Telegram?.WebApp){
    tg.ready(); // Сообщаем Telegram, что веб-приложение готово
    tg.enableClosingConfirmation(); // Включаем подтверждение при попытке закрыть веб-приложение
    // Настройка кнопки Settings
    tg.SettingsButton.show();
    tg.onEvent('settingsButtonClicked', () => {
        showSettings();
        tg.BackButton.show();
    });
    tg.onEvent('backButtonClicked', () => {
        const backTarget = localStorage.getItem('menuBackTo');
        if (backTarget) { localStorage.removeItem('menuBackTo'); window.location.href = backTarget; return; }
        hideSideMenu();
        const settingsMenu = document.getElementById('settingsMenu');
        const mainMenu = document.getElementById('mainMenu');
        const mainTopBar = document.getElementById('mainTopBar');
        if (settingsMenu) settingsMenu.style.display = 'none';
        if (mainMenu) mainMenu.style.display = 'block';
        if (mainTopBar) mainTopBar.style.display = 'flex';
        if (typeof saveUserDataToGoogleSheets === 'function') {
            saveUserDataToGoogleSheets();
        }
        tg.BackButton.hide();
        tg.SettingsButton.show();
    });
}


import { texpereriv } from './security.js';
if (texpereriv === 'Скоро'){
    document.getElementById('mainM').textContent = localStorage.getItem('lang') === 'en' ? 'Soon we will start a technical break!' : 'Скоро мы начнем технический перерыв.';
}
else if (texpereriv === 'Уже'){
    window.location.href = 'index.html';
}
document.addEventListener('keydown', function (event) {
    if (event.key === '1') {
        hideSideMenu();
        showSettings();
    }
    if (event.key === 'Escape') {
        hideSideMenu();
        const settingsMenu = document.getElementById('settingsMenu');
        const mainMenu = document.getElementById('mainMenu');
        const mainTopBar = document.getElementById('mainTopBar');
        if (settingsMenu) settingsMenu.style.display = 'none';
        if (mainMenu) mainMenu.style.display = 'block';
        if (mainTopBar) mainTopBar.style.display = 'flex';
        if (tg) tg.BackButton.hide();
        if (tg) tg.SettingsButton.show();
        if (typeof saveUserDataToGoogleSheets === 'function') {
            saveUserDataToGoogleSheets();
        }
    }
    else if (event.key === '2'){
        window.location.href = 'createMYbase.html';
    }
});
if (!localStorage.getItem('userName')) {
    localStorage.setItem('userName', 'User');
}
// === НАСТРОЙКИ ДЛЯ ПРОВЕРКИ КОДА В БАЗЕ ДАННЫХ ===
let codeCheckInterval = null;
const GAS_URL_FOR_DATA_BASE_CODE = 'https://script.google.com/macros/s/AKfycbzW1JvaFUaH8ZwSaALUFGA6UfGQGGRKKoyl0-ohItgT3kQc6Jq4sx0rDkTlwikkt-Y4/exec';
const gasUrl = 'https://script.google.com/macros/s/AKfycbxkvAXAMckjNcVYGh3BmSmMI608TbUAwrmohywdKoVCMbmCz69Y0dKb3r9OP89NlH8s/exec';
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxbr9H0F70BHo2js1tKD_P1MVChn-9NKr8av1p0ZtJj6h9845b3dB2xDarr_B1zpFwR/exec';
const LINKS = {
    complaintRU: "https://t.me/NickNaymesBot/submit_complaints",
    supportRU: "https://t.me/Clickerstart_bot",
    supportEN: "https://t.me/Clickerstart_bot"
};
const filesRu = {
    shop: 'shop_ru.html',
    nickname: 'nickname.html',
    description: 'description.html',
    profile: 'avatar.html',
    lego: 'lego.html',
    font: 'font.html',
    sites: 'https://sites.google.com/',
    ascii: 'ascii.html',
    qr: 'qr.html',
    music: 'music.html',
    colors: 'colors.html',
    ai: 'ai.html',
    support: 'support.html',
    connection: 'connection.html',
    popular: 'popular(ru).html',
    myshop: 'myshop_ru.html',
    tasks: 'tasks.html',
    ai_video: 'https://t.me/GeneratorVideos1Bot'
};
const filesEn = {
    tasks: 'tasks_en.html',
    shop: 'shop_en.html',
    nickname: 'nickname_en.html',
    description: 'description_en.html',
    profile: 'avatar_en.html',
    lego: 'lego_en.html',
    font: 'font_en.html',
    sites: 'https://sites.google.com/',
    ascii: 'ascii_en.html',
    qr: 'qr_en.html',
    music: 'music_en.html',
    colors: 'colors_en.html',
    ai: 'ai_en.html',
    support: 'support_en.html',
    connection: 'connection_en.html',
    popular: 'popular(en).html',
    myshop: 'myshop_ru.html',
    ai_video: 'https://t.me/GeneratorVideos1Bot'
};
let storedCoins = parseInt(localStorage.getItem('coins'));
if (!localStorage.getItem('coins') || storedCoins < 0) {
    localStorage.setItem('coins', '0');
} else {
    document.getElementById('coins').innerHTML = '<i style="user-select: none;">🪙</i>' + formatNumber(localStorage.getItem('coins'));
}
const tok = document.getElementById("tok");
tok.style.background = "linear-gradient(180deg, var(--btn), #1b1280)";
tok.style.color = "#fff";
tok.style.border = "none";
tok.style.borderRadius = "12px";
tok.style.padding = "10px 16px";
tok.style.fontWeight = "600";
tok.style.cursor = "pointer";
let lang = localStorage.getItem('lang') || 'ru';
if (!localStorage.getItem('statistic_turn')) {
    localStorage.setItem('statistic_turn', 'yes');
}
let customBackgrounds = JSON.parse(
    localStorage.getItem('customBackgrounds') || '[]'
);
let translations = {
    ru: {
        fixing: 'Режим поиска и устранения ошибок в этом приложении',
        premium: 'Премиум',
        main: "Что будем создавать?",
        maintenance: "Проводится техническое обслуживание.",
        settingsTitle: "Настройки",
        statsTitle: "Ваша статистика за все время",
        langSectionTitle: "Настройки языка и токена",
        supportSectionTitle: "Поддержка и связь",
        userDataSectionTitle: "Загрузка и сохранение данных",
        privacySectionTitle: "Конфиденциальность",
        privacyLabel: "Кто может видеть мою аватарку:",
        featureButtons: [
            "Никнейм","Описание","Аватарка","Лeгo","Шрифт","Сайт",
            "Символ-арт","QR-код","Музыка","Цвета","ИИ-Генератор фото", "ИИ-Генератор видео"
        ],
        settingsButtons: ["Поддержка","Проверка соединения"],
        langOptions: ["Русский","English"],
        writeComplaint: "Написать жалобу",
        writeSupport: "Написать в службу поддержки",
        historySectionTitle: "История",
        tokenSectionTitle: "Токен",
        usageTimeTitle: "Время использования",
        menuTitle: "Меню",
        home: "Вернуться в главное меню",
        stats: "Статистика",
        profile: "Мой профиль",
        popular: "Популярное",
        settings: "Настройки",
        wishlist: "Мой список избранного",
        task: "Задания и награды",
        myshop: "Мой магазин",
        shop: "Магазин",
        statSectionTitle: "Настройки статистики",
        statCollectYes: "Собирать данные для статистики",
        statCollectNo: "Не собирать данные для статистики",
        statClear: "Очистить все данные статистики",
        accountSectionTitle: "Аккаунт",
        userIDButton: "Привязать или изменить свой Telegram ID",
        backgroundSectionTitle: "Вид приложения",
        uploadCustomBg: "Выбрать фон для загрузки",
        blurBackground: "Размытие фона",
        animations: "Анимации",
        appView_normal: "Не полноэкранный(Рекомендуется)",
        appView_fullscreen: "Полноэкранный",
        appSizeFieldLabel: "Размер приложения:",
        backgroundSubTitle: "Фон приложения",
        animationsSubTitle: "Анимации",
        appSizeLabel: "Размер приложения",
        appSizeNotSupportedOnIphone: "Не поддерживается на iPhone, но скоро получит поддержку",
        database: 'Моя база данных'
    },
    en: {
        fixing: 'Error Detection and Correction Mode in this App',
        premium: 'Premium',
        main: "What do you want to create?",
        maintenance: "Maintenance in progress.",
        settingsTitle: "Settings",
        statsTitle: "Your all-time statistics",
        langSectionTitle: "Language & token",
        supportSectionTitle: "Support",
        userDataSectionTitle: "Save and load datas",
        privacySectionTitle: "Privacy",
        privacyLabel: "Who can see my avatar:",
        featureButtons: [
            "Nickname","Description","Profile","Lego","Font","Sites",
            "ASCII-art","QR-code","Music","Colors","AI-Photo Generator", "AI-Video Generator"
        ],
        settingsButtons: ["Support","Connection check"],
        langOptions: ["Русский","English"],
        writeComplaint: "",
        writeSupport: "Contact Support",
        historySectionTitle: "History",
        tokenSectionTitle: "Token",
        usageTimeTitle: "Usage Time",
        menuTitle: "Menu",
        home: "Return to main menu",
        stats: "Statistics",
        profile: "My profile",
        popular: "Popular",
        settings: "Settings",
        wishlist: "My wishlist",
        task: "Tasks and rewards",
        myshop: "My Shop",
        shop: "Shop",
        statSectionTitle: "Statistics settings",
        statCollectYes: "Collect data for statistics",
        statCollectNo: "Do not collect data for statistics",
        statClear: "Clear all statistics data",
        accountSectionTitle: "Account",
        userIDButton: "Link or change my Telegram ID",
        backgroundSectionTitle: "App appearance",
        uploadCustomBg: "Select background to upload",
        blurBackground: "Background blur",
        animations: "Animations",
        backgroundSubTitle: "App Background",
        animationsSubTitle: "Animations",
        appView_normal: "Non-fullscreen (Recommended)",
        appView_fullscreen: "Fullscreen",
        appSizeFieldLabel: "Application Size:",
        appSizeLabel: "Application Size",
        appSizeNotSupportedOnIphone: "Not supported on iPhone, but coming soon",
        database: 'My data base'
    }
};
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function createButton({ text, icon, onClick, href, newTab=false, disabled=false, id, duplicateIcon=false }) {
    const btn = document.createElement('button');
    btn.className = 'btn';
    if (id) btn.id = id;
    if (icon) {
        const i = document.createElement('i');
        i.className = icon;
        i.classList.add('left-icon');
        btn.appendChild(i);
    }
    const span = document.createElement('span');
    span.textContent = text;
    btn.appendChild(span);
    if (duplicateIcon && icon) {
        const i2 = document.createElement('i');
        i2.className = icon;
        i2.classList.add('right-icon');
        btn.appendChild(i2);
    }
    if (href) {
        btn.onclick = () => {
            incrementCoins();
            newTab ? window.open(href, '_blank') : window.location.href = href;
        };
    } else if (onClick) {
        btn.onclick = onClick;
    }
    if (disabled) {
        btn.disabled = true;
        btn.style.background = 'var(--disabled)';
        btn.title = lang === 'ru' ? 'Укажите ссылку в объекте LINKS' : 'Specify a link in the LINKS object';
    }
    return btn;
}

// Enable toggling when clicking label text for toggle-icon elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('label[for]').forEach(label => {
        const id = label.getAttribute('for');
        if (!id) return;
        const target = document.getElementById(id);
        if (target && target.classList.contains('toggle-icon')) {
            label.style.cursor = 'pointer';
            label.addEventListener('click', () => target.click());
        }
    });

    // App view mode select handling
    const appSelect = document.getElementById('appViewMode');
    function applyAppView(mode) {
        try{
            if (mode === 'fullscreen') {
                if (window.Telegram && window.Telegram.WebApp && typeof window.Telegram.WebApp.requestFullscreen === 'function') {
                    window.Telegram.WebApp.requestFullscreen();
                }
            } else {
                if (window.Telegram && window.Telegram.WebApp) {
                    if (typeof window.Telegram.WebApp.expand === 'function') window.Telegram.WebApp.expand();
                    if (typeof window.Telegram.WebApp.exitFullscreen === 'function') window.Telegram.WebApp.exitFullscreen();
                }
            }
        } catch(e){}
    }
    if (appSelect) {
        const saved = localStorage.getItem('appViewMode') || 'normal';
        appSelect.value = saved;
        applyAppView(saved);
        appSelect.addEventListener('change', (e) => {
            const v = e.target.value;
            localStorage.setItem('appViewMode', v);
            applyAppView(v);
        });
    } else {
        // If no select in DOM, still apply stored mode
        const saved = localStorage.getItem('appViewMode');
        if (saved) applyAppView(saved);
    }
    // Add bad-words validation to inputs and textareas (both on input and blur)
    document.querySelectorAll('input, textarea').forEach(el => {
        const handler = () => {
            try {
                const v = (el.value || '').toString();
                if (containsBadWords(v)) {
                    showAlertModal(lang === 'ru' ? 'Поле содержит недопустимые слова.' : 'Field contains inappropriate words.');
                    el.value = '';
                }
            } catch (e) {}
        };
        el.addEventListener('blur', handler);
        el.addEventListener('input', handler);
    });
        // If navigation came from side menu, show Telegram BackButton to return to main
        try {
            if (tg && localStorage.getItem('menuBackTo')) {
                try { if (tg.BackButton) tg.BackButton.show(); } catch(e){}
            }
        } catch(e){}
});
function applyTranslations() {
    checkUserID();
    document.getElementById('showmytokentext').style.color = 'white';
    if (lang === 'ru') {
        document.getElementById('userTokenWarning').textContent = 'Токен необходим для работы со службой поддержки и загрузки ваших данных в этом приложении. Будьте внимательны перед тем как показывать свой токен другим.';
        document.getElementById('showmytokentext').textContent = 'Показать мой токен пользователя';
    } else {
        document.getElementById('userTokenWarning').textContent = 'The token is required to work with the support service and to load your data in this application. Be careful before sharing your token with others.';
        document.getElementById('showmytokentext').textContent = 'Show my user token';
    }
    const files = lang === 'ru' ? filesRu : filesEn;
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang][key] !== undefined) {
            el.textContent = translations[lang][key];
        }
    });
    const featureContainer = document.getElementById('featureButtons');
    featureContainer.innerHTML = '';
    const featureKeys = ['nickname','description','profile','lego','font','sites','ascii','qr','music','colors','ai', 'ai_video'];
    translations[lang].featureButtons.forEach((text, i) => {
        const url = files[featureKeys[i]];
        const isExternal = /^https?:\/\//i.test(url);
        const btn = createButton({ text, icon: 'fa-solid fa-shapes', href: url, newTab: isExternal });
        featureContainer.appendChild(btn);
    });
    const settingsContainer = document.getElementById('settingsButtons');
    settingsContainer.innerHTML = '';
    const settingsKeys = ['support','connection'];
    const settingsIcons = ['fa-solid fa-circle-info','fa-solid fa-wifi'];
    translations[lang].settingsButtons.forEach((text, i) => {
        const url = files[settingsKeys[i]];
        const btn = createButton({ text, icon: settingsIcons[i], href: url });
        settingsContainer.appendChild(btn);
    });
    document.getElementById('account-settings').textContent = translations[lang].accountSectionTitle;
    document.getElementById('userID-confirming').textContent = translations[lang].userIDButton;
    document.getElementById('stat_setting_text').textContent = translations[lang].statSectionTitle;
    document.getElementById('stat_setting').innerHTML = `
        <select id="statSelect" onchange="localStorage.setItem('statistic_turn', this.value === 'yes' ? 'yes' : 'no')">
            <option value="yes">${translations[lang].statCollectYes}</option>
            <option value="no">${translations[lang].statCollectNo}</option>
        </select>
        <button class="btn" id="clear" onclick="clearAllStatistic()" style="margin-top: 2%;">${translations[lang].statClear}</button>
    `;
    const statSelect = document.getElementById('statSelect');
    statSelect.value = localStorage.getItem('statistic_turn') || 'yes';
    if (lang === 'ru') {
        const hasLink = !!LINKS.complaintRU && /^https?:\/\//i.test(LINKS.complaintRU);
        const complaintBtn = createButton({
            text: translations.ru.writeComplaint,
            icon: 'fa-solid fa-pen-to-square',
            href: hasLink ? LINKS.complaintRU : undefined,
            newTab: true,
            disabled: !hasLink
        });
        settingsContainer.appendChild(complaintBtn);
    }
    const supportLink = lang === 'ru' ? LINKS.supportRU : LINKS.supportEN;
    const supportOk = !!supportLink && /^https?:\/\//i.test(supportLink);
    const writeSupportBtn = createButton({
        text: translations[lang].writeSupport,
        icon: 'fa-solid fa-headset',
        href: supportOk ? supportLink : undefined,
        newTab: true,
        disabled: !supportOk
    });
    settingsContainer.appendChild(writeSupportBtn);
    const langSelect = document.getElementById('langSelect');
    langSelect.innerHTML = '';
    translations[lang].langOptions.forEach((text, i) => {
        const option = document.createElement('option');
        option.value = i === 0 ? 'ru' : 'en';
        option.textContent = text;
        option.selected = (option.value === lang);
        langSelect.appendChild(option);
    });

    // === ТЕМЫ — УДАЛЁН ФОН СОБЫТИЯ ===
    const themeSelect = document.getElementById('theme');
    themeSelect.innerHTML = '';
    const themeOptionsFixed = lang === 'ru'
        ? ["Стандартный фон", "Темный"]
        : ["Default background", "Dark"];

    // Только две фиксированные темы: theme1 и theme3
    const fixedThemes = ['theme1', 'theme3'];
    themeOptionsFixed.forEach((text, i) => {
        const option = document.createElement('option');
        option.value = fixedThemes[i];
        option.textContent = text;
        themeSelect.appendChild(option);
    });

    customBackgrounds.forEach((bg, i) => {
        const option = document.createElement('option');
        option.value = `custom_${i}`;
        option.textContent = bg.name;
        themeSelect.appendChild(option);
    });
    const uploadOption = document.createElement('option');
    uploadOption.value = 'upload';
    uploadOption.textContent = lang === 'ru' ? "Загрузить свой фон" : "Upload your own background";
    themeSelect.appendChild(uploadOption);

    let storedTheme = localStorage.getItem('theme') || 'theme1';
    // Если был theme2 или недопустимое значение — сбрасываем на theme1
    if (!['theme1', 'theme3'].includes(storedTheme) && !storedTheme.startsWith('custom_') && storedTheme !== 'upload') {
        storedTheme = 'theme1';
        localStorage.setItem('theme', 'theme1');
    }
    if (storedTheme === 'upload') {
        storedTheme = 'theme1';
        localStorage.setItem('theme', 'theme1');
    }
    if (Array.from(themeSelect.options).some(opt => opt.value === storedTheme)) {
        themeSelect.value = storedTheme;
    } else {
        themeSelect.value = 'theme1';
        localStorage.setItem('theme', 'theme1');
    }

    // Populate App appearance select if present
    const appSelectEl = document.getElementById('appViewMode');
    if (appSelectEl) {
        appSelectEl.innerHTML = '';
        const o1 = document.createElement('option');
        o1.value = 'normal';
        o1.textContent = translations[lang].appView_normal;
        const o2 = document.createElement('option');
        o2.value = 'fullscreen';
        o2.textContent = translations[lang].appView_fullscreen;
        appSelectEl.appendChild(o1);
        appSelectEl.appendChild(o2);
        const savedMode = localStorage.getItem('appViewMode') || 'normal';
        appSelectEl.value = savedMode;
        
        // Re-attach the change event listener after clearing innerHTML
        appSelectEl.onchange = null; // Clear any previous listeners
        appSelectEl.addEventListener('change', (e) => {
            const v = e.target.value;
            localStorage.setItem('appViewMode', v);
            try{
                if (v === 'fullscreen') {
                    if (window.Telegram && window.Telegram.WebApp && typeof window.Telegram.WebApp.requestFullscreen === 'function') {
                        window.Telegram.WebApp.requestFullscreen();
                    }
                } else {
                    if (window.Telegram && window.Telegram.WebApp) {
                        if (typeof window.Telegram.WebApp.expand === 'function') window.Telegram.WebApp.expand();
                        if (typeof window.Telegram.WebApp.exitFullscreen === 'function') window.Telegram.WebApp.exitFullscreen();
                    }
                }
            } catch(e){}
        });
    }
if (/iPhone/i.test(navigator.userAgent)) {
    document.getElementById('appViewMode').disabled = true;
    const headerElement = document.getElementById('appSizeTextViewer');
    const lang = localStorage.getItem('lang') || 'ru';
    const messages = {
        ru: 'Размер приложения: (Данная функция не поддерживается на iPhone, но скоро получит поддержку)',
        en: 'Application size:(This feature is not supported on iPhone, but coming soon)'
    };
    headerElement.textContent = messages[lang] || messages['ru'];
}
}
function initTokenButton(btnId) {
    let isVisible = false;
    const updateLabel = () => {
        const userToken = localStorage.getItem('userToken') || '';
        const maskedToken = userToken ? '*'.repeat(userToken.length) : '';
        const btn = document.getElementById(btnId);
        if (isVisible) {
            btn.innerHTML = '<i class="fa-solid fa-key left-icon"></i><span>' +
                (lang === 'ru' ? 'Ваш токен: ' + userToken + ' (Нажмите для копирования)' :
                'Your token: ' + userToken + ' (Click to copy)') + '</span>';
        } else {
            btn.innerHTML = '<i class="fa-solid fa-key left-icon"></i><span>' +
                (lang === 'ru' ? 'Ваш токен: ' + maskedToken + ' (Нажмите для показа)' :
                'Your token: ' + maskedToken + ' (Click to show)') + '</span>';
        }
    };
    updateLabel();
    document.getElementById(btnId).onclick = () => {
        const userToken = localStorage.getItem('userToken') || '';
        if (!isVisible) {
            isVisible = true;
            updateLabel();
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = userToken;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showAlertModal(lang === 'ru' ? 'Токен скопирован!' : 'Token copied!');
            } catch (err) {
                showAlertModal(lang === 'ru' ? 'Не удалось скопировать токен.' : 'Failed to copy token.');
            }
            document.body.removeChild(textArea);
            isVisible = false;
            updateLabel();
        }
    };
}
applyTranslations();
initTokenButton('tok');
document.getElementById('backBtn').onclick = () => {
    document.getElementById('settingsMenu').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'block';
    document.getElementById('mainTopBar').style.display = 'flex';
    saveUserDataToGoogleSheets();
};
document.getElementById('langSelect').onchange = function() {
    lang = this.value;
    localStorage.setItem('lang', lang);
    applyTranslations();
    initTokenButton('tok');
};
document.getElementById('statSelect').onchange = function() {
    const selectedOption = this.options[this.selectedIndex].text;
    const statTurn = selectedOption === translations[lang].statCollectYes ? 'yes' : 'no';
    localStorage.setItem('statistic_turn', statTurn);
    applySideButtons();
};
const m = localStorage.getItem('m');
if (m === 'Уже' || m === 'уже') {
    document.querySelectorAll('div').forEach(el => el.style.display = 'none');
    showAlertModal(lang === 'ru' ? 'Идет техническое обслуживание' : 'Maintenance in progress');
    document.getElementById('maintenance').style.display = 'block';
    document.getElementById('maintenanceM').textContent = translations[lang].maintenance;
}
if (!localStorage.getItem('first_use_date')) {
    localStorage.setItem('first_use_date', new Date().toISOString());
}
window.clearAllStatistic = async function() {
    let message;
    if (lang === 'ru') {
        message = `Вы уверены, что хотите очистить всю свою статистику?\n\nЭто действие нельзя будет отменить!\n\nВся ваша статистика будет полностью обнулена, все значения станут равны 0(нулю)!`;
    } else {
        message = `Are you sure you want to clear all your statistics?\n\nThis action cannot be undone!\n\nAll your statistics will be completely reset; all values will be set to 0(zero)!`;
    }
    const confirmed = await showConfirmModal(message);
    if (!confirmed) return;
    if (confirmed) {
        showAlertModal('DONE');
    }
    const keys = [
        'created_nicknames',
        'created_descriptions',
        'created_profiles',
        'created_lego',
        'created_fonts',
        'created_ascii_arts',
        'created_qr_codes',
        'created_musics',
        'copied_color_codes',
        'copied_nicknames',
        'copied_descriptions',
        'shared_nicknames',
        'shared_descriptions',
        'shared_qr_codes',
        'usage_day',
        'usage_week',
        'usage_month',
        'last_day',
        'last_week',
        'last_month',
        'copied_arts',
        'shared_avatars',
        'copied_fonts',
        'shared_music'
    ];
    keys.forEach(key => localStorage.removeItem(key));
    localStorage.setItem('statistic_turn', 'yes');
    applyTranslations();
}
const statKeys = [
    'copied_arts', 'shared_avatars', 'copied_fonts', 'shared_music',
    'created_nicknames', 'created_descriptions', 'created_profiles', 'created_lego',
    'created_fonts', 'created_ascii_arts', 'created_qr_codes', 'created_musics',
    'copied_color_codes', 'copied_nicknames', 'copied_descriptions',
    'shared_nicknames', 'shared_descriptions', 'nick_story', 'desc_story'
];
async function uploadAvatarToDrive(base64) {
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'upload_avatar',
                base64: base64,
                token: localStorage.getItem('userToken') || ''
            }),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            redirect: 'follow'
        });
        const result = await response.json();
        if (result.success && result.fileId) {
            return `https://drive.google.com/file/d/${result.fileId}/view`;
        } else {
            throw new Error(result.error || 'Upload failed');
        }
    } catch (err) {
        console.error('Upload avatar error:', err);
        throw err;
    }
}
async function saveUserDataToGoogleSheets() {
    const SPREADSHEET_ID = '145dg5-KwMTiz3dVWTjLzXtHOQ5z9Gufm47LgLKsXHWU';
    try {
        const now = new Date();
        const dateStr = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear().toString().slice(-2)} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        const userToken = localStorage.getItem('userToken') || '';
        const username = localStorage.getItem('userName') || '';
        let avatarFromStorage = localStorage.getItem('userAvatar');
        let avatar = 'user_profile_photo.png';
        if (avatarFromStorage && avatarFromStorage.trim() !== '') {
            if (avatarFromStorage.startsWith("http")) {
                avatar = avatarFromStorage;
            } else if (avatarFromStorage.startsWith("data:image")) {
                avatar = avatarFromStorage;
            } else {
                avatar = avatarFromStorage;
            }
        }
        const avatarVisibility = localStorage.getItem('avatar_visibility') || 'all';
        const firstUseDate = localStorage.getItem('first_use_date');
        let usageTime = '';
        if (firstUseDate) {
            const firstDate = new Date(firstUseDate);
            const diffMs = now - firstDate;
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            usageTime = `${diffDays}d ${diffHrs}h ${diffMins}m`;
        }
        const statTurn = localStorage.getItem('statistic_turn') || 'yes';
        const stats = {};
        statKeys.forEach(key => {
            const raw = localStorage.getItem(key);
            const n = parseInt(raw, 10);
            stats[key] = (raw === null || raw === undefined || isNaN(n)) ? '0' : String(n);
        });
        const statsStr = statTurn === 'yes' ? JSON.stringify(stats) : `(Отключено)${JSON.stringify(stats)}`;
        const likedUsers = localStorage.getItem('liked_users') || '';
        const data = {
            date: dateStr,
            token: userToken,
            username: username,
            avatar: avatar,
            avatarVisibility: avatarVisibility,
            usageTime: usageTime,
            statistics: statsStr,
            liked_users: likedUsers
        };
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            redirect: 'follow'
        });
        const responseText = await response.text();
        if (!response.ok) {
            console.error('Ошибка при сохранении:', response.status, responseText);
        }
    } catch (err) {
        console.error('Ошибка в saveUserDataToGoogleSheets:', err);
    }
}
function incrementCoins() {
    if (Math.random() < 0.07) {
        let amount = 1;
        if (Math.random() < 0.3) amount += 200;
        if (Math.random() < 0.05) amount += 100;
        let coins = parseInt(localStorage.getItem('coins') || '0');
        coins += amount;
        localStorage.setItem('coins', coins.toString());
        document.getElementById('coins').innerHTML = '<i style="user-select: none;">🪙</i>' + formatNumber(coins);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card-header, .toggle-btn').forEach(element => {
        element.addEventListener('click', (e) => {
            if (e.target.closest('.toggle-btn') && e.currentTarget.classList.contains('card-header')) {
                return;
            }
            const header = element.closest('.card-header');
            const content = header.nextElementSibling;
            const icon = header.querySelector('.toggle-btn i');
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                icon.classList.remove('fa-caret-down');
                icon.classList.add('fa-caret-up');
            } else {
                content.style.display = 'none';
                icon.classList.remove('fa-caret-up');
                icon.classList.add('fa-caret-down');
            }
        });
    });
    const statSelect = document.getElementById('statSelect');
    statSelect.value = localStorage.getItem('statistic_turn') || 'yes';
});
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');
const sideButtons = document.getElementById('sideButtons');
function showSideMenu() {
    applyTranslations();
    applySideButtons();
    sideMenu.style.display = 'block';
    overlay.style.display = 'block';
    setTimeout(() => {
        sideMenu.classList.add('open');
    }, 10);
}
function hideSideMenu() {
    if (tg) tg.BackButton.hide();
    sideMenu.classList.remove('open');
    setTimeout(() => {
        sideMenu.style.display = 'none';
        overlay.style.display = 'none';
    }, 500);
}
document.getElementById('sideMenuBtn').onclick = showSideMenu;
document.getElementById('sideCloseBtn').onclick = hideSideMenu;
overlay.onclick = hideSideMenu;
function showSettings() {
    if (tg) tg.SettingsButton.hide();
    if (tg) tg.BackButton.show();
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('mainTopBar').style.display = 'none';
    document.getElementById('settingsMenu').style.display = 'block';
    applyTranslations();
}
function fixingFunction() {
    window.location.href = 'errors.html';
}
function applySideButtons() {
    sideButtons.innerHTML = '';
    const files = lang === 'ru' ? filesRu : filesEn;
    const isStatsDisabled = localStorage.getItem('statistic_turn') === 'no';
    const isEn = lang === 'en';
    const items = [
        { textKey: 'home', icon: 'fa-solid fa-house', onClick: hideSideMenu },
        { textKey: 'fixing', icon: 'fa-solid fa-hammer', onClick: fixingFunction },
        { textKey: 'stats', icon: 'fa-solid fa-chart-simple', href: 'statistics.html', disabled: isStatsDisabled },
        { textKey: 'profile', icon: 'fa-solid fa-user', href: 'user_profile.html' },
        { textKey: 'popular', icon: 'fa-solid fa-square-poll-vertical', href: files.popular },
        { textKey: 'wishlist', icon: 'fa-solid fa-clipboard-list', href: 'izbr.html' },
        { textKey: 'task', icon: 'fa-solid fa-list-check', href: files.tasks, disabled: isEn },
        { textKey: 'myshop', icon: 'fa-solid fa-shop', href: files.myshop },
        { textKey: 'shop', icon: 'fa-solid fa-cart-shopping', href: files.shop, disabled: isEn },
        { textKey: 'database', icon:'fa-solid fa-database', href:'createMYbase.html'},
        { textKey: 'premium', icon: 'fa-solid fa-crown', href: 'premium.screen.html' },
        { textKey: 'settings', icon: 'fa-solid fa-gear', onClick: () => { hideSideMenu(); showSettings(); } }
    ];
    items.forEach(item => {
        const btn = createButton({
            text: translations[lang][item.textKey],
            icon: item.icon,
            onClick: item.onClick,
            href: item.href,
            duplicateIcon: true,
            disabled: item.disabled
        });
        sideButtons.appendChild(btn);
        // For side-menu links (except 'home'), remember to show Telegram BackButton on target page
        if (item.href && item.textKey !== 'home') {
            btn.addEventListener('pointerdown', () => {
                try { localStorage.setItem('menuBackTo', 'main.html'); } catch(e){}
            });
        }
    });
}
function checkUserID() {
    if (localStorage.getItem('userID')) {
        document.getElementById('my_idHeader').style.color = 'white';
        if (lang === 'ru') {
            document.getElementById('my_idHeader').textContent = 'Показать мой Telegram ID';
            document.getElementById('myID').textContent = localStorage.getItem('userID') + ' (Нажмите чтобы скопировать)';
        } else {
            document.getElementById('my_idHeader').textContent = 'Show my Telegram ID';
            document.getElementById('myID').textContent = localStorage.getItem('userID') + ' (Click to copy)';
        }
        document.getElementById('my_idBox').style.display = 'block';
    } else {
        document.getElementById('my_idBox').style.display = 'none';
    }
}
document.getElementById('myID').addEventListener('click', (e) => {
    const textToCopy = localStorage.getItem('userID');
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            const lang = localStorage.getItem('lang');
            const originalText = e.target.textContent;
            e.target.textContent = lang === 'ru' ? 'Скопировано!' : 'Copied!';
            setTimeout(() => {
                e.target.textContent = originalText;
            }, 2500);
        })
        .catch(() => {
            showAlertModal(lang === 'ru' ? 'Ошибка копирования' : 'Copy error');
        });
});
async function checkTokenAndRedirect() {
    try {
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
            console.error('Токен пользователя не найден в localStorage');
            return;
        }
        const response = await fetch(gasUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `userToken=${encodeURIComponent(userToken)}`
        });
        const result = await response.json();
        if (result.success) {
            window.location.href = result.redirectUrl;
        } else {
            console.error('Ошибка:', result.error);
        }
    } catch (error) {
        console.error('Ошибка при проверке токена:', error);
    }
}
document.addEventListener("click", function (event) {
    const t = event.target;
    if (
        t.tagName !== "INPUT" &&
        t.tagName !== "TEXTAREA" &&
        t.tagName !== "SELECT" &&
        !t.isContentEditable
    ) {
        if (document.activeElement && document.activeElement.blur) {
            document.activeElement.blur();
        }
    }
});
async function securityChecker() {
    const { blockedTokens } = await import('./security.js');
    if (blockedTokens.includes(localStorage.getItem('userToken'))) {
        window.location.href = 'blocked.html';
    }
}
setInterval(() => {
    securityChecker();
}, 1000);
securityChecker();
saveUserDataToGoogleSheets();
setInterval(() => {
    checkTokenAndRedirect();
}, 6500);

// Theme handling — УДАЛЕНА theme2
function setTheme(value) {
    const bgDiv = document.getElementById('bg');
    bgDiv.style.backgroundRepeat = 'no-repeat';
    bgDiv.style.backgroundSize = 'cover';
    bgDiv.style.backgroundPosition = 'center center';
    bgDiv.style.backgroundAttachment = 'fixed';
    if (value === 'theme1') {
        bgDiv.style.backgroundImage = 'none';
        bgDiv.style.backgroundColor = 'rgb(0, 0, 79)';
    } else if (value === 'theme3') {
        bgDiv.style.backgroundImage = 'none';
        bgDiv.style.backgroundColor = 'black';
    } else if (value.startsWith('custom_')) {
        const index = parseInt(value.split('_')[1]);
        const bg = customBackgrounds[index];
        if (bg) {
            bgDiv.style.backgroundImage = `url(${bg.data})`;
            bgDiv.style.backgroundColor = '';
        }
    }
    updateBlurDisabled();
    applyBlur();
}
function updateBlurDisabled() {
    const themeValue = document.getElementById('theme').value;
    const blurToggle = document.getElementById('blurToggle');
    if (themeValue === 'theme1' || themeValue === 'theme3') {
        blurToggle.disabled = true;
        document.getElementById('blurBackground_settingShow').style.display = 'none';
        blurToggle.checked = false;
        localStorage.setItem('blur', 'no');
    } else {
        blurToggle.disabled = false;
        document.getElementById('blurBackground_settingShow').style.display = 'block';
    }
}
function applyBlur() {
    const bgDiv = document.getElementById('bg');
    if (localStorage.getItem('blur') === 'yes') {
        bgDiv.style.filter = 'blur(5px)';
    } else {
        bgDiv.style.filter = 'none';
    }
}
document.getElementById('theme').onchange = function() {
    const value = this.value;
    const customUpload = document.getElementById('customUpload');
    if (value === 'upload') {
        customUpload.style.display = 'block';
    } else {
        customUpload.style.display = 'none';
        localStorage.setItem('theme', value);
        setTheme(value);
    }
};
document.getElementById('uploadCustom').onclick = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = ev => {
                const dataURL = ev.target.result;
                const newBg = { name: file.name, data: dataURL };
                customBackgrounds.push(newBg);
                localStorage.setItem('customBackgrounds', JSON.stringify(customBackgrounds));
                applyTranslations();
                const newValue = `custom_${customBackgrounds.length - 1}`;
                document.getElementById('theme').value = newValue;
                localStorage.setItem('theme', newValue);
                setTheme(newValue);
                document.getElementById('customUpload').style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            showAlertModal(lang === 'ru' ? 'Пожалуйста, выберите изображение' : 'Please select an image');
        }
    };
    input.click();
};
document.getElementById('blurToggle').onclick = function() {
    const isChecked = this.getAttribute('data-checked') === 'true';
    const newState = !isChecked;
    this.setAttribute('data-checked', newState ? 'true' : 'false');
    const icon = this.querySelector('i');
    icon.className = newState ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off';
    localStorage.setItem('blur', newState ? 'yes' : 'no');
    applyBlur();
};
document.getElementById('animationsToggle').onclick = function() {
    const isChecked = this.getAttribute('data-checked') === 'yes';
    const newState = !isChecked;
    this.setAttribute('data-checked', newState ? 'yes' : 'no');
    const icon = this.querySelector('i');
    icon.className = newState ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off';
    localStorage.setItem('animations', newState ? 'yes' : 'no');
    applyAnimations();
};
function applyAnimations() {
    if (localStorage.getItem('animations') === 'no') {
        document.body.classList.add('no-animations');
    } else {
        document.body.classList.remove('no-animations');
    }
}
// Init theme and blur
if (!localStorage.getItem('blur')) {
    localStorage.setItem('blur', 'no');
}
const blurToggleEl = document.getElementById('blurToggle');
const blurState = localStorage.getItem('blur') === 'yes';
blurToggleEl.setAttribute('data-checked', blurState ? 'true' : 'false');
blurToggleEl.querySelector('i').className = blurState ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off';

if (!localStorage.getItem('animations')) {
    localStorage.setItem('animations', 'yes');
}
const animToggleEl = document.getElementById('animationsToggle');
const animState = localStorage.getItem('animations') === 'yes';
animToggleEl.setAttribute('data-checked', animState ? 'yes' : 'no');
animToggleEl.querySelector('i').className = animState ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off';
applyAnimations();
let storedTheme = localStorage.getItem('theme') || 'theme1';
if (!['theme1', 'theme3'].includes(storedTheme) && !storedTheme.startsWith('custom_')) {
    storedTheme = 'theme1';
    localStorage.setItem('theme', 'theme1');
}
setTheme(storedTheme);

// Запуск проверки появления кода в Z1
window.handleCodeCheckCallback = function(data) {
    if (data && data.code && data.code.trim() !== '') {
        showVerificationModal(data.code.trim());
        if (codeCheckInterval) {
            clearInterval(codeCheckInterval);
            codeCheckInterval = null;
        }
    }
}
function startDatabaseCodeCheck() {
    if (codeCheckInterval) clearInterval(codeCheckInterval);
    codeCheckInterval = setInterval(() => {
        const userToken = localStorage.getItem('userToken');
        if (!userToken) return;
        const script = document.createElement('script');
        script.src = `${GAS_URL_FOR_DATA_BASE_CODE}?endpoint=check_code&userToken=${encodeURIComponent(userToken)}&callback=handleCodeCheckCallback`;
        script.onerror = () => console.error('Ошибка загрузки скрипта проверки кода');
        document.body.appendChild(script);
        document.body.removeChild(script);
    }, 1000);
}
function showVerificationModal(code) {
    const modal = document.getElementById('verificationModal');
    const codeDisplay = document.getElementById('verificationCodeDisplay');
    const blockBtn = document.getElementById('blockFromVerificationBtn');
    const closeBtn = document.getElementById('closeVerificationBtn');
    codeDisplay.textContent = code;
    blockBtn.style.display = 'block';
    closeBtn.style.display = 'none';
    blockBtn.onclick = async () => {
        modal.style.display = 'none';
        const userToken = localStorage.getItem('userToken');
        if (!userToken) return;
        try {
            const response = await fetch(GAS_URL_FOR_DATA_BASE_CODE, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify({
                    endpoint: 'set_blocked',
                    userToken: userToken,
                    blocked: true
                })
            });
            const result = await response.json();
            if (result.success) {
                blockBtn.style.display = 'none';
                closeBtn.style.display = 'block';
            } else {
                showAlertModal('Ошибка блокировки');
            }
        } catch (err) {
            showAlertModal('Ошибка связи с сервером');
        }
    };
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
    modal.style.display = 'flex';
}
const lang2 = localStorage.getItem('lang') || 'en';
const modalRu = `
<div id="verificationModal" class="modal-overlay" style="display: none;">
  <div class="modal-content">
    <div class="modal-title">Код верификации</div>
    <p>Введите этот код на другом устройстве, чтобы загрузить ваши данные.</p>
    <div id="verificationCodeDisplay" class="verification-code">------</div>
    <p>Если это вы, введите указанный выше код и перезапустите приложение.</p>
    <p>Если <strong>не вы</strong> запрашивали этот код — немедленно заблокируйте доступ:</p>
    <button class="btn" id="blockFromVerificationBtn">Заблокировать мою базу данных и закрыть это окно</button>
    <button class="btn" id="closeVerificationBtn" style="margin-top: 12px;">
      Закрыть это окно
    </button>
  </div>
</div>
`;
const modalEn = `
<div id="verificationModal" class="modal-overlay" style="display: none;">
  <div class="modal-content">
    <div class="modal-title">Verification Code</div>
    <p>Enter this code on another device to load your data.</p>
    <div id="verificationCodeDisplay" class="verification-code">------</div>
    <p>If this was you, enter the code above and restart the application.</p>
    <p>If <strong>you did not</strong> request this code, block access immediately:</p>
    <button class="btn" id="blockFromVerificationBtn">Block my database and close this window</button>
    <button class="btn" id="closeVerificationBtn" style="margin-top: 12px;">
      Close this window
    </button>
  </div>
</div>
`;
document.getElementById('verificationModalContainer').innerHTML =
  lang2 === 'ru' ? modalRu : modalEn;
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('userToken')) {
        startDatabaseCodeCheck();
    }
});
setInterval(() => {
    if (window.Telegram?.WebApp) {
        const settingsMenu = document.getElementById('settingsMenu');
        if (!settingsMenu || settingsMenu.style.display === 'none') {
            Telegram.WebApp.BackButton.hide();
        }
    }
}, 1000);