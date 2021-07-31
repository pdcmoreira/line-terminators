const { characters, CRLF, LF, NONE } = require("./constants");

module.exports = function identify(str) {
  if (!str) {
    return NONE;
  }

  if (str.match(new RegExp(characters.CRLF))) {
    return CRLF;
  }

  if (str.match(new RegExp(characters.LF))) {
    return LF;
  }

  return NONE;
};
