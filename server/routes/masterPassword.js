const express = require("express");
const {
  createMasterPassword,
  getDecryptedMasterPassword,
} = require("../controllers/password");

const router = express.Router();

router.route("/").post(createMasterPassword);

router.route("/decrypt").post(getDecryptedMasterPassword);

module.exports = router;
