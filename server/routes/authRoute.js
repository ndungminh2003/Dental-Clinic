const express = require("express");
const { signUp, login, logout } = require("../controller/authCtrl");
const router = express.Router();

router.post("/signup", signUp);
router.post("/logout", logout);
router.post("/login", login);

module.exports = router;
