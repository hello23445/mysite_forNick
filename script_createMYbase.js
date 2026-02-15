// script.js
const GAS_URL = 'https://script.google.com/macros/s/AKfycbz3pIkQGKR1QCs_cP7ZODqlHt_p80NtUIT7_AjTKRUfP1M06Jxfh0Rj34P7zjeeUCVW/exec';

const lang = (localStorage.getItem('lang') || 'en') === 'ru' ? 'ru' : 'en';

const texts = {
    ru: {
        mainTitle: 'Управление моей базой данных',
        createBtn: 'Создать свою базу данных',
        importBtn: 'У меня уже есть своя база данных',
        updateBtn: 'Обновить данные в моей базе данных',
        deleteBtn: 'Удалить мою базу данных',
        blockBtnBlocked: 'Разблокировать мою базу данных',
        blockBtnUnblocked: 'Заблокировать мою базу данных',
        blockInfo: 'Заблокировав свою базу данных никто не сможет загружать ваши данные.',
        importTitle: 'Импорт данных',
        enterTokenText: 'Введите токен пользователя.',
        tokenPlaceholder: 'Введите сюда.',
        forgotTokenLink: 'Забыли токен? Обратитесь в поддержку: @Clickerstart_bot',
        enterCodeText: 'Введите 6-значный код отправленный в приложение другого устройства:',
        noAccessLink: 'Нету доступа к устройству? Обратитесь в поддержку @Clickerstart_bot',
        errorEnterToken: 'Введите токен пользователя',
        errorSheetNotFound: 'База данных не найдена',
        errorBlocked: 'Вход запрещен!',
        errorWrongCode: 'Неверный код!',
        successImported: 'Данные импортированы!',
        successUpdated: 'База обновлена!',
        successCreated: 'База данных успешно создана! Страница обновится...',
        okBtn: 'OK',
        backBtn: 'Вернуться назад',
        confirmUpdate: 'Вы уверены, что хотите обновить базу данных?',
        confirmDelete: 'Вы уверены, что хотите УДАЛИТЬ свою базу данных? Это действие нельзя отменить!',
        confirmBlock: 'Вы уверены, что хотите заблокировать базу данных?',
        confirmUnblock: 'Вы уверены, что хотите разблокировать базу данных?',
        yesBtn: 'Да',
        noBtn: 'Нет',
        dbName: 'Название базы: Ваш токен из настроек',
        dbCount: 'Данных в базе: ',
        dbStatus: 'Статус: ',
        dbLastUpdate: 'Последнее обновление: ',
        dbOpen: 'Открыт',
        dbBlocked: 'Заблокирован',
        banWait: 'Подождите {minutes} минут перед следующей попыткой.',
        permanentBan: 'Вам запрещено импортировать чужие данные. Чтобы снять блокировку, обратитесь в поддержку <a href="https://t.me/Clickerstart_bot">@Clickerstart_bot</a>'
    },
    en: {
        mainTitle: 'Database Management',
        createBtn: 'Create my database',
        importBtn: 'I already have a database',
        updateBtn: 'Update database',
        deleteBtn: 'Delete database',
        blockBtnBlocked: 'Unblock my database',
        blockBtnUnblocked: 'Block my database',
        blockInfo: 'By blocking your database, no one will be able to download your data.',
        importTitle: 'Data Import',
        enterTokenText: 'Enter user token.',
        tokenPlaceholder: 'Enter here.',
        forgotTokenLink: 'Forgot your token? Contact support: @Clickerstart_bot',
        enterCodeText: 'Enter the 6-digit code sent to the other device\'s app:',
        noAccessLink: 'No access to the device? Contact support @Clickerstart_bot',
        errorEnterToken: 'Enter user token',
        errorSheetNotFound: 'Table not found',
        errorBlocked: 'Access denied!',
        errorWrongCode: 'Wrong code',
        successImported: 'Data imported',
        successUpdated: 'Database updated',
        successCreated: 'Database successfully created! Page will reload...',
        okBtn: 'OK',
        backBtn: 'Go back',
        confirmUpdate: 'Are you sure you want to update the database?',
        confirmDelete: 'Are you sure you want to DELETE your database? This action cannot be undone!',
        confirmBlock: 'Are you sure you want to block the database?',
        confirmUnblock: 'Are you sure you want to unblock the database?',
        yesBtn: 'Yes',
        noBtn: 'No',
        dbName: 'Database name: Your token from settings',
        dbCount: 'Data in database: ',
        dbStatus: 'Status: ',
        dbLastUpdate: 'Last update: ',
        dbOpen: 'Open',
        dbBlocked: 'Blocked',
        banWait: 'Wait {minutes} minutes before next attempt.',
        permanentBan: 'You are prohibited from importing other people\'s data. To remove the block, contact support <a href="https://t.me/Clickerstart_bot">@Clickerstart_bot</a>'
    }
};

const t = texts[lang];

function getOrCreateUserToken() {
    let token = localStorage.getItem('userToken');
    if (!token) {
        token = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
        localStorage.setItem('userToken', token);
    }
    return token;
}

let userToken = getOrCreateUserToken();
const statusEl = document.getElementById('status');
const buttonsEl = document.getElementById('buttons');
const dbInfoEl = document.getElementById('dbInfo');
const modalEl = document.getElementById('modal');
const confirmModalEl = document.getElementById('confirm-modal');
const confirmMessageEl = document.getElementById('confirm-message');
const sheetNameStep = document.getElementById('sheetNameStep');
const codeStep = document.getElementById('codeStep');
const sheetNameInput = document.getElementById('sheetNameInput');
const codeInput = document.getElementById('codeInput');
const banMessageEl = document.getElementById('banMessage');
// const errorModalEl = document.getElementById('error-modal');
// const errorMessageEl = document.getElementById('error-message');
const preloaderEl = document.getElementById('preloader');
let generatedCode = null;
let isBlocked = false;
let blockCheckInterval = null;

function showPreloader() {
    preloaderEl.style.display = 'flex';
    document.body.style.pointerEvents = 'none';
}

function hidePreloader() {
    preloaderEl.style.display = 'none';
    document.body.style.pointerEvents = 'auto';
}

function showErrorModal(message) {
    errorMessageEl.textContent = message;
    document.getElementById('error-ok-btn').textContent = t.okBtn;
    errorModalEl.style.display = 'flex';
    document.getElementById('error-ok-btn').onclick = () => errorModalEl.style.display = 'none';
}

function showConfirmModal(message, onConfirm) {
    confirmMessageEl.textContent = message;
    document.getElementById('confirm-yes').textContent = t.yesBtn;
    document.getElementById('confirm-no').textContent = t.noBtn;
    confirmModalEl.style.display = 'flex';
    document.getElementById('confirm-yes').onclick = () => {
        confirmModalEl.style.display = 'none';
        onConfirm();
    };
    document.getElementById('confirm-no').onclick = () => {
        confirmModalEl.style.display = 'none';
    };
}

async function callGAS(endpoint, method = 'GET', body = null, sheetNameParam = null, silent = false) {
    if (!silent) showPreloader();
    try {
        let url = `${GAS_URL}?endpoint=${endpoint}&userToken=${userToken}`;
        if (sheetNameParam) url += `&sheetName=${encodeURIComponent(sheetNameParam)}`;

        const options = { method };
        if (method === 'POST') {
            options.headers = { 'Content-Type': 'text/plain' };
            options.body = body ? JSON.stringify(body) : '';
        }
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);

        if (data.message) statusEl.textContent = data.message;
        return data;
    } catch (error) {
        return { error: error.message };
    } finally {
        if (!silent) hidePreloader();
    }
}

function updateUI() {
    document.getElementById('mainTitle').textContent = t.mainTitle;
    document.getElementById('importTitle').textContent = t.importTitle;
    document.getElementById('enterTokenText').textContent = t.enterTokenText;
    document.getElementById('sheetNameInput').placeholder = t.tokenPlaceholder;
    document.getElementById('forgotTokenLink').textContent = t.forgotTokenLink;
    document.getElementById('enterCodeText').textContent = t.enterCodeText;
    document.getElementById('noAccessLink').textContent = t.noAccessLink;
    document.getElementById('backBtn').textContent = t.backBtn;
}

async function checkSheet() {
    const result = await callGAS('check');
    if (result.error) {
        statusEl.textContent = `Error: ${result.error}`;
        return;
    }
    if (result.exists) {
        isBlocked = result.blocked || false;
        const statusText = isBlocked ? t.dbBlocked : t.dbOpen;
        document.getElementById('dbName').textContent = t.dbName;
        document.getElementById('dbCount').textContent = t.dbCount + result.num_keys;
        document.getElementById('dbStatus').textContent = t.dbStatus + statusText;
        const date = new Date(result.last_update);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        document.getElementById('dbLastUpdate').textContent = t.dbLastUpdate + (formattedDate || 'N/A');
        if (document.getElementById('dbLastUpdate').textContent.includes('NaN')){
            document.getElementById('dbLastUpdate').textContent = localStorage.getItem('lang') === 'ru' ? t.dbLastUpdate +'Не известно.' : t.dbLastUpdate +'Unknown.';
        }
        dbInfoEl.style.display = 'block';

        // Добавляем обработчик для кнопки копирования токена
        const copyTokenBtn = document.getElementById('copyTokenBtn');
        if (copyTokenBtn) {
            copyTokenBtn.onclick = () => {
                navigator.clipboard.writeText(userToken);
                const originalText = copyTokenBtn.innerHTML;
                copyTokenBtn.innerHTML = lang === 'ru' ? '✓ Скопировано' : '✓ Copied';
                setTimeout(() => {
                    copyTokenBtn.innerHTML = originalText;
                }, 2000);
            };
        }

        buttonsEl.innerHTML = `
            <button id="updateBtn">${t.updateBtn}</button>
            <button id="deleteBtn">${t.deleteBtn}</button>
            <button id="blockBtn">${isBlocked ? t.blockBtnBlocked : t.blockBtnUnblocked}</button>
            <p>${t.blockInfo}</p>
        `;
        document.getElementById('updateBtn').onclick = () => showConfirmModal(t.confirmUpdate, updateSheetConfirmed);
        document.getElementById('deleteBtn').onclick = () => showConfirmModal(t.confirmDelete, deleteSheetConfirmed);
        document.getElementById('blockBtn').onclick = () => {
            const msg = isBlocked ? t.confirmUnblock : t.confirmBlock;
            showConfirmModal(msg, toggleBlockConfirmed);
        };
    } else {
        dbInfoEl.style.display = 'none';
        buttonsEl.innerHTML = `
            <button id="createBtn">${t.createBtn}</button>
            <button id="importBtn">${t.importBtn}</button>
        `;
        document.getElementById('createBtn').onclick = createSheet;
        document.getElementById('importBtn').onclick = openImportModal;
    }
}

async function createSheet() {
    const lsData = { ...localStorage };
    const result = await callGAS('create', 'POST', { data: lsData });
    if (result.error) {
        showErrorModal(result.error || (lang === 'ru' ? 'Ошибка при создании базы' : 'Error creating database'));
        return;
    }
    if (result.success) {
        statusEl.textContent = t.successCreated;
        statusEl.style.color = '#00ff00';
        setTimeout(() => {
            window.location.href = window.location.pathname + '?t=' + Date.now();
        }, 1500);
    }
    await checkSheet();
}

async function updateSheetConfirmed() {
    const lsData = { ...localStorage };
    const result = await callGAS('update', 'POST', { data: lsData });
    if (!result.error && result.success) {
        statusEl.textContent = t.successUpdated;
        statusEl.style.color = '#00ff00';
        checkSheet();
    }
}

async function deleteSheetConfirmed() {
    const result = await callGAS('delete', 'POST');
    if (!result.error && result.success) {
        checkSheet();
        statusEl.textContent = '';
    }
}

async function toggleBlockConfirmed() {
    const result = await callGAS('set_blocked', 'POST', { blocked: !isBlocked });
    if (!result.error && result.success) {
        checkSheet();
    }
}

function openImportModal() {
    modalEl.style.display = 'flex';
    sheetNameStep.style.display = 'block';
    codeStep.style.display = 'none';
    sheetNameInput.value = '';
    codeInput.value = '';
    banMessageEl.style.display = 'none';
    codeInput.disabled = false;
    document.getElementById('submitCode').disabled = false;
    generatedCode = null;

    document.getElementById('submitSheetName').onclick = handleSheetNameSubmit;
    document.getElementById('submitCode').onclick = handleCodeSubmit;
    document.getElementById('cancelBtn').onclick = () => modalEl.style.display = 'none';
    document.getElementById('cancelCodeBtn').onclick = handleCancelCode;
}

async function handleSheetNameSubmit() {
    const sheetName = sheetNameInput.value.trim();
    if (!sheetName) {
        showErrorModal(t.errorEnterToken);
        return;
    }
    generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    const result = await callGAS('set_code', 'POST', { code: generatedCode }, sheetName);
    if (result.error) {
        let message = result.error;
        if (result.error.includes('not found')) message = t.errorSheetNotFound;
        else if (result.error.includes('blocked')) message = t.errorBlocked;
        showErrorModal(message);
    } else if (result.success) {
        localStorage.setItem('pending_import_token', sheetName);
        sheetNameStep.style.display = 'none';
        codeStep.style.display = 'block';
        checkImportBan();
        startBlockCheck(sheetName);
    }
}

async function handleCodeSubmit() {
    if (checkImportBan()) return;

    const enteredCode = codeInput.value.trim();
    const importedToken = sheetNameInput.value.trim() || localStorage.getItem('pending_import_token');

    if (enteredCode !== generatedCode) {
        handleWrongCode();
        return;
    }

    const loadResult = await callGAS('load', 'GET', null, importedToken);
    if (loadResult.error) {
        let message = loadResult.error;
        if (loadResult.error.includes('not found')) message = t.errorSheetNotFound;
        else if (loadResult.error.includes('blocked')) message = t.errorBlocked;
        showErrorModal(message);
        return;
    }
    if (loadResult.data) {
        Object.entries(loadResult.data).forEach(([key, value]) => {
            if (key !== 'userToken' && key !== 'userCode') {
                localStorage.setItem(key, value);
            }
        });
        await callGAS('clear_cell', 'POST', null, importedToken);
        localStorage.removeItem('pending_import_token');
        clearInterval(blockCheckInterval);
        modalEl.style.display = 'none';
        checkSheet();
        statusEl.textContent = t.successImported;
        statusEl.style.color = '#00ff00';
    }
}

async function handleCancelCode() {
    const importedToken = localStorage.getItem('pending_import_token');
    if (importedToken) {
        await callGAS('clear_cell', 'POST', null, importedToken, true);
        localStorage.removeItem('pending_import_token');
    }
    clearInterval(blockCheckInterval);
    modalEl.style.display = 'none';
}

function startBlockCheck(sheetName) {
    clearInterval(blockCheckInterval);
    blockCheckInterval = setInterval(async () => {
        const result = await callGAS('check', 'GET', null, sheetName, true);
        if (result.blocked) {
            handleCancelCode();
            showErrorModal(t.errorBlocked);
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }, 1000);
}

function getImportAttempts() {
    const attemptsStr = localStorage.getItem('importAttempts');
    return attemptsStr ? JSON.parse(attemptsStr) : {
        count: 0,
        stage: 0,
        lastAttemptTime: 0,
        banUntil: 0,
        permanentBan: false
    };
}

function setImportAttempts(attempts) {
    localStorage.setItem('importAttempts', JSON.stringify(attempts));
}

function checkImportBan() {
    const attempts = getImportAttempts();
    const now = Date.now() / 1000;
    if (attempts.permanentBan) {
        banMessageEl.innerHTML = t.permanentBan;
        banMessageEl.style.display = 'block';
        codeInput.disabled = true;
        document.getElementById('submitCode').disabled = true;
        return true;
    }
    if (now < attempts.banUntil) {
        const remainingMin = Math.ceil((attempts.banUntil - now) / 60);
        banMessageEl.textContent = t.banWait.replace('{minutes}', remainingMin);
        banMessageEl.style.display = 'block';
        codeInput.disabled = true;
        document.getElementById('submitCode').disabled = true;
        return true;
    }
    banMessageEl.style.display = 'none';
    codeInput.disabled = false;
    document.getElementById('submitCode').disabled = false;
    return false;
}

function handleWrongCode() {
    const attempts = getImportAttempts();
    const now = Date.now() / 1000;
    if (checkImportBan()) return;

    attempts.count += 1;
    attempts.lastAttemptTime = now;

    const stages_limits = [3, 2, 2, 2, 2, 2];
    const timeouts = [600, 1200, 2400, 3600, 86400];

    if (attempts.count >= stages_limits[attempts.stage]) {
        attempts.stage += 1;
        attempts.count = 0;
        if (attempts.stage >= timeouts.length) {
            attempts.permanentBan = true;
        } else {
            attempts.banUntil = now + timeouts[attempts.stage - 1];
        }
    }

    setImportAttempts(attempts);
    showErrorModal(t.errorWrongCode);
    checkImportBan();
}

[modalEl, confirmModalEl, errorModalEl].forEach(el => {
    el.onclick = (e) => {
        if (e.target === el) el.style.display = 'none';
    };
});

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    const pendingToken = localStorage.getItem('pending_import_token');
    if (pendingToken) {
        modalEl.style.display = 'flex';
        sheetNameStep.style.display = 'none';
        codeStep.style.display = 'block';
        sheetNameInput.value = pendingToken;
        checkImportBan();
        startBlockCheck(pendingToken);
    }
    checkSheet();
});