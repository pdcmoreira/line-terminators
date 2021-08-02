const { characters, CRLF, LF, NONE } = require("./constants");
const identify = require("./identify.js");

module.exports = function convert(str, cr, deleteIfNone = false) {
  if (!cr || (cr !== CRLF && cr !== LF)) {
    cr = NONE;
  }

  if (cr === NONE && !deleteIfNone) {
    return str;
  }

  const originalCr = identify(str);

  // Skip if cr are already the same or if there is nothing to convert
  if (originalCr === NONE || cr === originalCr) {
    return str;
  }

  return str.replace(new RegExp(characters[originalCr], "g"), characters[cr]);
};
