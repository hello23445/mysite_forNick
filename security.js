export const blockedTokens = ['awsuoDiAt6U4LR8j', 'lgtrdfhreedghtesghtss', ''];
export const texpereriv = 'Уже' //Уже, Скоро, ...
localStorage.setItem('m', texpereriv);

// список запрещённых слов (только уникальные формы, без дублей)
export const badWords = [
  // русские
  'говно', 'хейт', 'порно', 'аноним', 'секс',
  'admin', 'админ', 'moder', 'модер', 'модератор',
  'продавец премиума', 'seller of premium', 'seller of premium account',
  'премиум', 'премиум пользователь', 'premium user',
  'пользователь премиума', 'user of premium', 'user of premium account',
  '*', '"', "'",

  // новые русские
  'сука', 'пидор', 'пидорас', 'мразь', 'ублюдок', 'тварь', 'хуй', 'хер', 
  'еблан', 'ебанат', 'даун', 'дебил', 'идиот', 'чмо', 'гнида', 'тупой', 'блядь', 
  'бля', 'хуесос', 'нахуй', 'пошел нахуй', 'иди нахуй', 'урод', 'скотина', 
  'сволочь', 'мудак', 'петух', 'шлюха', 'проститутка', 'сучка', 'падла', 
  'долбоеб', 'долбаеб', 'ебаный', 'ебать', 'залупа', 'пизда', 'пиздец',

  // английские
  'sex',
  'fuck', 'fucking', 'bitch', 'asshole', 'bastard', 'dick', 'cock', 'pussy', 
  'shit', 'slut', 'whore', 'cunt', 'motherfucker', 'nigger', 'nigga', 
  'retard', 'stupid', 'idiot', 'dumbass', 'loser', 'jerk', 'gay', 'fag', 
  'faggot', 'suck', 'sucker', 'kill yourself', 'kms',

  // испанские
  'puta', 'gilipollas', 'mierda', 'pendejo', 'cabron', 'maricon', 'coño', 
  'idiota', 'imbecil', 'tonto', 'perra',

  // немецкие
  'arschloch', 'scheisse', 'hurensohn', 'fotze', 'wichser', 'idiot', 'dummkopf', 

  // французские
  'connard', 'salope', 'pute', 'merde', 'enculé', 'con', 'idiot',

  // итальянские
  'stronzo', 'coglione', 'merda', 'puttana', 'troia', 'cretino', 'idiota',

  // португальские
  'merda', 'puta', 'caralho', 'filho da puta', 'otário', 'burro', 'idiota',

  // арабские (транслитерация)
  'sharmuta', 'ibn kalb', 'ibn al sharmuta', 'kalb', 'khara', 'jahel',

  // хинди/урду (транслитерация)
  'madarchod', 'behenchod', 'chutiya', 'bhosdike', 'lund', 'randi', 'harami',

  // турецкие
  'orospu', 'siktir', 'amk', 'mal', 'aptal', 'gerizekali',

  // польские
  'kurwa', 'pierdol', 'chuj', 'jebac', 'idiota', 'debil',

  // индонезийские
  'anjing', 'bangsat', 'kontol', 'memek', 'tolol', 'bodoh',

  // китайские (транслитерация)
  'shabi', 'caonima', 'gou ri', 'sb', 'ni ma',

  // корейские (транслитерация)
  'ssibal', 'gaesaekki', 'jot', 'meongcheong', 'baegopa',

  'хентай', 'hentai', 'минет', 'minet', 'эротика', 'erotica'
];
localStorage.setItem('badWords', JSON.stringify(badWords));
// берём имя пользователя
const userName = localStorage.getItem('userName')?.toLowerCase() || 'User';

// проверяем, содержит ли имя запрещённое слово
if (badWords.some(word => userName.includes(word.toLowerCase()))) {
  const msg = localStorage.getItem('lang') === 'ru'
    ? 'Заданное имя нарушает наши правила.\nПожалуйста задайте другое имя.'
    : 'The name you entered violates our rules.\nPlease enter a different name.';
  
  function showAlertModal(message) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center; z-index: 10000;`;
    const modalBox = document.createElement('div');
    modalBox.style.cssText = `background: #251897; color: #d9d9d9; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); max-width: 300px; text-align: center; font-family: Arial, sans-serif; white-space: pre-line;`;
    const messageText = document.createElement('p');
    messageText.textContent = message;
    messageText.style.cssText = `margin: 0 0 15px 0; font-size: 16px;`;
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'OK';
    closeBtn.style.cssText = `background: #3a28c0; color: #d9d9d9; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 16px;`;
    closeBtn.addEventListener('click', () => { overlay.remove(); });
    modalBox.appendChild(messageText);
    modalBox.appendChild(closeBtn);
    overlay.appendChild(modalBox);
    document.body.appendChild(overlay);
  }
  
  if (window.showModal) {
    try { window.showModal(msg); } catch(e) { showAlertModal(msg); }
    setTimeout(() => { window.location.href = 'user_profile.html'; }, 700);
  } else {
    showAlertModal(msg);
    window.location.href = 'user_profile.html';
  }

}
