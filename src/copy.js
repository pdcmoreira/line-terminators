const identify = require("./identify.js");
const convert = require("./convert.js");

module.exports = function copy(sourceStr, targetStr, deleteIfNone = false) {
  const sourceCr = identify(sourceStr);

  return convert(targetStr, sourceCr, deleteIfNone);
};
