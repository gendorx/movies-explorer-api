const { isUrl } = require("validator");

function validationUrl(value) {
  const isUrl = validateUrl(value);

  if (!isUrl) throw new Error("it's not url");

  return value;
}

module.exports = {
  validationUrl,
}