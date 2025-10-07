export const blockedTokens = ['awsuoDiAt6U4LR8j', 'lgtrdfhreedghtesghtss', ''];
export const texpereriv = '' //Уже, Скоро, ...
localStorage.setItem('m', texpereriv);

// список запрещённых слов (только уникальные формы, без дублей)
const badWords = [
  'говно', 'хейт', 'порно', 'аноним',
  'admin', 'админ', 'moder', 'модер', 'модератор',
  'продавец премиума', 'seller of premium', 'seller of premium account',
  'премиум', 'премиум пользователь', 'premium user',
  'пользователь премиума', 'user of premium', 'user of premium account',
  '*', '"', "'"
];

// берём имя пользователя
const userName = localStorage.getItem('userName')?.toLowerCase() || 'User';

// проверяем, содержит ли имя запрещённое слово
if (badWords.some(word => userName.includes(word.toLowerCase()))) {
  alert(
    localStorage.getItem('lang') === 'ru'
      ? 'Заданное имя нарушает наши правила.\nПожалуйста задайте другое имя.'
      : 'The name you entered violates our rules.\nPlease enter a different name.'
  );
  window.location.href = 'user_profile.html';
}