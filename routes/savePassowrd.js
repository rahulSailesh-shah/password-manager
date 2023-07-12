const express = require("express");
const { createPassword } = require("../controllers/password");

const router = express.Router();

router.route("/").post(createPassword);

module.exports = router;
