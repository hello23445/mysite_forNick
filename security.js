export const blockedTokens = ['awsuoDiAt6U4LR8j', 'lgtrdfhreedghtesghtss', ''];
export const texpereriv = '' //Уже, Скоро, ...
localStorage.setItem('m', texpereriv);

// список запрещённых слов (только уникальные формы, без дублей)
const badWords = [
  // русские
  'говно', 'хейт', 'порно', 'аноним',
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