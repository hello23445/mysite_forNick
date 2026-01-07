// script.js
if (localStorage.getItem('userToken') === 'GUo80GZ1KU7Jm9G4'){
    localStorageClearbtn.style.display = 'block'
}
const menu = document.getElementById('customMenu');
const copyBtn = document.getElementById('copyBtn');
const selectBtn = document.getElementById('selectBtn');

const isTouch = window.matchMedia('(pointer: coarse)').matches;

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
    const el = e.target;
    if (!el || !el.innerText.trim()) return;

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
    }, 500); // 500 мс удержания

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
  const range = document.createRange();
  if (!isTouch && targetElement) {
    range.selectNodeContents(targetElement);
  } else if (isTouch && currentRange) {
    range.selectNodeContents(currentRange.commonAncestorContainer);
  }

  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);

  menu.style.display = 'none';
  targetElement = null;
  currentRange = null;
});



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
    indexed_money: 'indexed_money.html',
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
    indexed_money: 'indexed_money_en.html',
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
        money: 'Играть и зарабатывать монеты',
        task: 'Задания и награды',
        shop: "Магазин",
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
        myshop: "Мой магазин",
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
        backgroundSubTitle: "Фон приложения",
        animationsSubTitle: "Анимации",
        database: 'Моя база данных'
    },
    en: {
        fixing: 'Error Detection and Correction Mode in this App',
        money: 'Play and earn coins',
        task: 'Tasks and Rewards',
        shop: "Shop",
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
        myshop: "My Shop",
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
                alert(lang === 'ru' ? 'Токен скопирован!' : 'Token copied!');
            } catch (err) {
                alert(lang === 'ru' ? 'Не удалось скопировать токен.' : 'Failed to copy token.');
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
    alert(lang === 'ru' ? 'Идет техническое обслуживание' : 'Maintenance in progress');
    document.getElementById('maintenance').style.display = 'block';
    document.getElementById('maintenanceM').textContent = translations[lang].maintenance;
}
if (!localStorage.getItem('first_use_date')) {
    localStorage.setItem('first_use_date', new Date().toISOString());
}
window.clearAllStatistic = function() {
    let confirmed;
    if (lang === 'ru') {
        confirmed = confirm(
            `Вы уверены, что хотите очистить всю свою статистику?\n` +
            `Это действие нельзя будет отменить!\n` +
            `Вся ваша статистика будет полностью обнулена, все значения станут равны нулю!\n` +
            `ОК - Подтвердить очистку\nОтмена - Отменить очистку.`
        );
    } else {
        confirmed = confirm(
            `Are you sure you want to clear all your statistics?\n` +
            `This action cannot be undone!\n` +
            `All your statistics will be completely reset; all values will be set to zero!\n` +
            `OK - Confirm reset\nCancel - Cancel reset`
        );
    }
    if (!confirmed) return;
    if (confirmed) {
        alert('DONE');
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
    const items = [
        { textKey: 'home', icon: 'fa-solid fa-house', onClick: hideSideMenu },
        { textKey: 'fixing', icon: 'fa-solid fa-hammer', onClick: fixingFunction },
        { textKey: 'stats', icon: 'fa-solid fa-chart-simple', href: 'statistics.html', disabled: isStatsDisabled },
        { textKey: 'profile', icon: 'fa-solid fa-user', href: 'user_profile.html' },
        { textKey: 'popular', icon: 'fa-solid fa-square-poll-vertical', href: files.popular },
        { textKey: 'wishlist', icon: 'fa-solid fa-clipboard-list', href: 'izbr.html' },
        { textKey: 'task', icon: 'fa-solid fa-list-check', href: files.tasks },
        { textKey: 'money', icon: 'fa-solid fa-coins', href: files.indexed_money },
        { textKey: 'myshop', icon: 'fa-solid fa-shop', href: files.myshop },
        { textKey: 'shop', icon: 'fa-solid fa-cart-shopping', href: files.shop },
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
            alert(lang === 'ru' ? 'Ошибка копирования' : 'Copy error');
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
            alert(lang === 'ru' ? 'Пожалуйста, выберите изображение' : 'Please select an image');
        }
    };
    input.click();
};
document.getElementById('blurToggle').onchange = function() {
    localStorage.setItem('blur', this.checked ? 'yes' : 'no');
    applyBlur();
};
document.getElementById('animationsToggle').onchange = function() {
    localStorage.setItem('animations', this.checked ? 'yes' : 'no');
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
document.getElementById('blurToggle').checked = localStorage.getItem('blur') === 'yes';
if (!localStorage.getItem('animations')) {
    localStorage.setItem('animations', 'yes');
}
document.getElementById('animationsToggle').checked = localStorage.getItem('animations') === 'yes';
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
                alert('Ошибка блокировки');
            }
        } catch (err) {
            alert('Ошибка связи с сервером');
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