const { NONE } = require("./constants.js");
const identify = require("./identify.js");
const convert = require("./convert.js");

module.exports = function copy(sourceStr, targetStr) {
  const sourceCr = identify(sourceStr);

  if (sourceCr === NONE) {
    return targetStr;
  }

  return convert(targetStr, sourceCr);
};
