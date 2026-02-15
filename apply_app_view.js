/* Small helper to apply persisted App Appearance (appViewMode) on all pages */
(function(){
  try {
    var mode = localStorage.getItem('appViewMode');
    function applyMode(){
      if (mode === 'fullscreen'){
        try{ 
          if (window.Telegram && window.Telegram.WebApp && typeof window.Telegram.WebApp.expand === 'function') {
            window.Telegram.WebApp.expand();
          }
        }catch(e){}
      }
    }

    // Bad-words enforcement (both RU and EN) for pages that load this helper
    const BAD_WORDS = JSON.parse(localStorage.getItem('badWords') || '[]');

    function containsBadWords(text){
      if (!text) return false;
      const s = text.toString().toLowerCase();
      return BAD_WORDS.some(w => s.includes(w));
    }

    function showAlert(message){
      try{
        // prefer site modal if exists (from script.js: showAlertModal)
        if (typeof window.showAlertModal === 'function' && window.showAlertModal !== showAlert) { window.showAlertModal(message); return; }
        if (typeof showModal === 'function') { showModal(message); return; }

        // fallback: styled modal matching site's look
        let modal = document.getElementById('__bw_alert_modal');
        if (!modal){
          const style = document.createElement('style');
          style.textContent = `#__bw_alert_modal{position:fixed;left:0;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(6,8,20,0.55);backdrop-filter:blur(6px) saturate(120%);z-index:100000;padding:20px}#__bw_alert_modal.show{display:flex}@keyframes modalIn{from{opacity:0;transform:translateY(-8px) scale(.995)}to{opacity:1;transform:translateY(0) scale(1)}}#__bw_alert_modal .c{background:linear-gradient(180deg, rgba(15,16,40,0.98), rgba(11,12,26,0.98));padding:18px;border-radius:14px;max-width:420px;width:100%;text-align:center;border:1px solid rgba(95,87,255,0.16);box-shadow:0 12px 40px rgba(3,6,20,0.6);color:#edf0ff;display:flex;gap:12px;align-items:center;animation:modalIn .22s ease-out}#__bw_alert_modal .modal-icon{flex:0 0 44px;height:44px;width:44px;border-radius:10px;background:linear-gradient(180deg,#ff6b6b,#ff4d4d);display:inline-flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(255,77,77,0.18)}#__bw_alert_modal .modal-icon svg{width:20px;height:20px;color:#fff}#__bw_alert_modal #__bw_alert_msg{margin:0;color:#dfe6ff;font-size:14px;line-height:1.3;text-align:left;flex:1}#__bw_alert_modal #__bw_alert_ok{margin-left:12px;flex:0 0 auto;background:linear-gradient(180deg,#5f57ff,#3b2fd6);color:#fff;border:0;padding:10px 14px;border-radius:10px;cursor:pointer;font-weight:700;box-shadow:0 8px 24px rgba(59,47,214,0.18)}#__bw_alert_modal #__bw_alert_close{position:absolute;top:14px;right:16px;background:transparent;border:0;color:rgba(255,255,255,0.65);font-size:18px;cursor:pointer}`;
          document.head.appendChild(style);

          modal = document.createElement('div'); modal.id='__bw_alert_modal'; modal.className='show';
          modal.innerHTML = '<div class="c"><div class="modal-icon" aria-hidden><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="rgba(0,0,0,0.08)"/><path d="M12 7v6" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 16h.01" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div id="__bw_alert_msg"></div><button id="__bw_alert_ok">Понятно</button><button id="__bw_alert_close" aria-label="Закрыть">×</button></div>';
          document.body.appendChild(modal);
          document.getElementById('__bw_alert_ok').addEventListener('click', ()=>{ modal.classList.remove('show'); modal.style.display='none'; });
          document.getElementById('__bw_alert_close').addEventListener('click', ()=>{ modal.classList.remove('show'); modal.style.display='none'; });
        }
        document.getElementById('__bw_alert_msg').textContent = message;
        modal.classList.add('show');
        modal.style.display = 'flex';
      }catch(e){ try{ alert(message); }catch(_){} }
    }

    // expose to global as a fallback for pages using alert()
    try{ window.showAlert = showAlert; window.alert = showAlert; }catch(e){}

    // simple confirm modal that returns a Promise<boolean>
    function showConfirmModal(message){
      return new Promise((resolve) => {
        try{
          // prefer global async confirm if exists
          if (typeof window.showConfirmModal === 'function' && window.showConfirmModal !== showConfirmModal) {
            try { window.showConfirmModal(message).then(resolve); return; } catch(e){}
          }
          let modal = document.getElementById('__bw_confirm_modal');
          if (!modal){
            const style = document.createElement('style');
            style.textContent = `#__bw_confirm_modal{position:fixed;left:0;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);z-index:100001}#__bw_confirm_modal .c{background:#fff;color:#000;padding:18px;border-radius:8px;max-width:90%;text-align:center}#__bw_confirm_modal .buttons{display:flex;gap:8px;justify-content:center;margin-top:12px}`;
            document.head.appendChild(style);
            modal = document.createElement('div'); modal.id='__bw_confirm_modal'; modal.innerHTML = '<div class="c"><div id="__bw_confirm_msg"></div><div class="buttons"><button id="__bw_confirm_ok">OK</button><button id="__bw_confirm_cancel">Cancel</button></div></div>';
            document.body.appendChild(modal);
            document.getElementById('__bw_confirm_ok').addEventListener('click', ()=>{ modal.style.display='none'; resolve(true); });
            document.getElementById('__bw_confirm_cancel').addEventListener('click', ()=>{ modal.style.display='none'; resolve(false); });
          }
          document.getElementById('__bw_confirm_msg').textContent = message;
          modal.style.display = 'flex';
        }catch(e){ try{ resolve(confirm(message)); }catch(_) { resolve(false); } }
      });
    }

    function attachBadWordHandlers(){
      document.querySelectorAll('input, textarea').forEach(el => {
        const handler = () => {
          try{
            if (containsBadWords(el.value || '')){
              const lang = document.documentElement && document.documentElement.lang ? document.documentElement.lang : (localStorage.getItem('lang') || 'ru');
              showAlert(lang === 'en' ? 'Field contains inappropriate words.' : 'Поле содержит недопустимые слова.');
              el.value = '';
              try{ if (typeof drawAvatar === 'function') drawAvatar(); } catch(e){}
            }
          }catch(e){}
        };
        el.addEventListener('input', handler);
        el.addEventListener('blur', handler);
      });
    }

    if (document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', function(){ applyMode(); attachBadWordHandlers(); });
    } else { applyMode(); attachBadWordHandlers(); }
  } catch(e) {}
})();
