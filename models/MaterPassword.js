const mongoose = require("mongoose");
const crypto = require("crypto");

const MasterPasswordSchema = mongoose.Schema({
  masterPassword: {
    type: String,
    required: [true, "Master Password is required"],
    minLength: [6, "Master Password must be atleast 6 characters"],
  },
  key: {
    type: Buffer,
  },
  iv: {
    type: String,
  },
});

MasterPasswordSchema.pre("save", function (next) {
  const iv = crypto.randomBytes(16);
  const key = crypto.randomBytes(32);
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(this.masterPassword);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  this.key = key;
  this.masterPassword = encrypted.toString("hex");
  this.iv = iv.toString("hex");
  next();
});

MasterPasswordSchema.methods.decryptMasterPassword = function () {
  let iv = Buffer.from(this.iv, "hex");
  let encryptedText = Buffer.from(this.masterPassword, "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(this.key),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

module.exports = mongoose.model("MasterPassword", MasterPasswordSchema);
