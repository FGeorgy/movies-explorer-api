const urlRegex = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/;

const allowedCors = [
  'https://diploma.fgeorg.nomoredomains.club',
  'http://diploma.fgeorg.nomoredomains.club',
  'https://api.diploma.fgeorg.nomoredomains.club',
  'http://api.diploma.fgeorg.nomoredomains.club',
  'http://localhost:3000',
  'http://localhost:3001',
];

module.exports = { urlRegex, allowedCors };
