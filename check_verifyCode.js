codeCheckInterval = null;
const GAS_URL_FOR_DATA_BASE_CODE = 'https://script.google.com/macros/s/AKfycbzW1JvaFUaH8ZwSaALUFGA6UfGQGGRKKoyl0-ohItgT3kQc6Jq4sx0rDkTlwikkt-Y4/exec';
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
        showErrorModal('Блокировка базы данных...');
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
                if (window.location.pathname.endsWith('createMYbase.html')) {
                    location.reload();
                }
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