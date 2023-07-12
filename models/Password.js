const mongoose = require("mongoose");
const crypto = require("crypto");

const PasswordSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Usernam / Email is required"],
  },
  site: {
    type: String,
    required: [true, "Site / App name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be atleast 6 characters long"],
  },
  category: {
    type: String,
    default: "Other",
    enum: ['App', 'Browser', 'Other']
  },
  iv: {
    type: String,
  },
}, {
  timestamps: true
});

PasswordSchema.pre("save", async function (next) {
  let masterPassword = await this.model("MasterPassword").find();
  masterPassword = masterPassword[0].masterPassword;

  const iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(masterPassword, "utf-8"),
    iv
  );
  let encrypted = cipher.update(this.password);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  this.password = encrypted.toString("hex");
  this.iv = iv.toString("hex");
  next();
});

PasswordSchema.methods.unhashPassword = async function () {
  let masterPassword = await this.model("MasterPassword").find();
  masterPassword = masterPassword[0].masterPassword;

  let encryptedText = Buffer.from(this.password, "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(masterPassword, "utf-8"),
    Buffer.from(this.iv, "hex")
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

module.exports = mongoose.model("Password", PasswordSchema);
