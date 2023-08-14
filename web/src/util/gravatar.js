/* Take in an email and generate a Gravatar url */
/* https://gravatar.com/site/implement/ */
const md5 = require('md5');

const gravatar = email => {
  const hash = md5(email);
  return `https://gravatar.loli.net/avatar/${hash}.jpg?d=identicon`;
};

module.exports = gravatar;
