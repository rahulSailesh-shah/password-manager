const express = require("express");
const {
  findPasswordBySite,
  findPasswordByEmail,
  getPasswords,
} = require("../controllers/password");

const router = express.Router();

router.route("/site").post(findPasswordBySite);

router.route("/email").post(findPasswordByEmail);

router.route("/").get(getPasswords);

module.exports = router;
