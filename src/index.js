// const CRLF = "CRLF";
// const LF = "LF";
// const NONE = "NONE";

// const lineTerminatorCharacters = {
//   [CRLF]: "\r\n",
//   [LF]: "\n",
//   [NONE]: "",
// };

// function identify(str) {
//   if (str.match(new RegExp(lineTerminatorCharacters.CRLF))) {
//     return CRLF;
//   }

//   if (str.match(new RegExp(lineTerminatorCharacters.LF))) {
//     return LF;
//   }

//   return lineTerminatorCharacters[NONE];
// }

// function convert(str, cr) {
//   const originalCr = identify(str);

//   if (cr === originalCr) {
//     return str;
//   }

//   return str.replace(
//     new RegExp(lineTerminatorCharacters[originalCr], "g"),
//     lineTerminatorCharacters[cr]
//   );
// }

// function copy(sourceStr, targetStr) {
//   const sourceCr = identify(sourceStr);

//   return convert(targetStr, sourceCr);
// }

// const constants = require('./src/constants.js')

// exports.identify = require("./src/identify.js");
// exports.convert = require("./src/convert.js");
// exports.copy = require("./src/copy.js");

module.exports = {
  constants: require("./constants.js"),
  identify: require("./identify.js"),
  convert: require("./convert.js"),
  copy: require("./copy.js"),
};
