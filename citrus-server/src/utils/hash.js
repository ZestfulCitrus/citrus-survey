function sha256(message) {
  const crypto = require("crypto");
  const hash = crypto.createHash("sha256");
  hash.update(message);
  return hash.digest();
}

module.exports={
    sha256
}