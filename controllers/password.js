const asyncHandaler = require("../middleware/async");
const Password = require("../models/Password");
const MasterPassword = require("../models/MaterPassword");
const ErrorResponse = require("../utils/errorResponse");

exports.createMasterPassword = asyncHandaler(async (req, res, next) => {
  const password = req.body.password;
  await MasterPassword.create({
    masterPassword: password,
  });
  res.status(200).json({
    success: true,
    message: "Master Password created",
  });
});

exports.getDecryptedMasterPassword = asyncHandaler(async (req, res, next) => {
  const password = req.body.password;
  let masterPassword = await MasterPassword.find();
  masterPassword = masterPassword[0];
  const decryptedMasterPassword = masterPassword.decryptMasterPassword();

  if (decryptedMasterPassword !== password) {
    return next(new ErrorResponse("Invalid Password", 400));
  }

  res.status(200).json({
    success: true,
    authenticated: true,
  });
});

exports.createPassword = asyncHandaler(async (req, res, next) => {
  await Password.create(req.body);
  res.status(200).json({
    success: true,
    message: "Password saved",
  });
});

exports.getPasswords = asyncHandaler(async (req, res, next) => {
  const passwords = await Password.find();

  if (passwords.length === 0) {
    return next(new ErrorResponse("No records found", 404));
  }

  const passwordData = [];
  var pswd = {};

  for (let i = 0; i < passwords.length; i++) {
    pswd = {};
    pswd["email"] = passwords[i].email;
    pswd["site"] = passwords[i].site;
    pswd["password"] = await passwords[i].unhashPassword();
    pswd["username"] = passwords[i].username;
    passwordData.push(pswd);
  }

  res.status(200).json({ success: true, data: passwordData });
});

exports.findPasswordBySite = asyncHandaler(async (req, res, next) => {
  if (!req.body.site) {
    return next(new ErrorResponse("Enter a site name"));
  }

  const passwords = await Password.find({ site: req.body.site });

  if (passwords.length === 0) {
    return next(new ErrorResponse("No records found", 404));
  }

  var passwordData = [];
  var pswd = {};

  for (let i = 0; i < passwords.length; i++) {
    pswd = {};
    pswd["email"] = passwords[i].email;
    pswd["site"] = passwords[i].site;
    pswd["password"] = await passwords[i].unhashPassword();
    pswd["username"] = passwords[i].username;
    passwordData.push(pswd);
  }

  res.status(200).json({ success: true, data: passwordData });
});

exports.findPasswordByEmail = asyncHandaler(async (req, res, next) => {
  if (!req.body.email) {
    return next(new ErrorResponse("Enter your email"));
  }

  const passwords = await Password.find({ email: req.body.email });

  if (passwords.length === 0) {
    return next(new ErrorResponse("No records found", 404));
  }

  var passwordData = [];
  var pswd = {};

  for (let i = 0; i < passwords.length; i++) {
    pswd = {};
    pswd["email"] = passwords[i].email;
    pswd["site"] = passwords[i].site;
    pswd["password"] = await passwords[i].unhashPassword();
    pswd["username"] = passwords[i].username;
    passwordData.push(pswd);
  }

  res.status(200).json({ success: true, data: passwordData });
});
