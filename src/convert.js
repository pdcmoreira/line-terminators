const { characters, CRLF, LF, NONE } = require("./constants");
const identify = require("./identify.js");

module.exports = function convert(str, cr) {
  if (!cr || (cr !== CRLF && cr !== LF)) {
    cr = NONE;
  }

  const originalCr = identify(str);

  if (cr === originalCr) {
    return str;
  }

  return str.replace(new RegExp(characters[originalCr], "g"), characters[cr]);
};
