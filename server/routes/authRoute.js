const express = require("express");
const { signUp, login, logout } = require("../controller/authCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/logout", authMiddleware, logout);
router.post("/login", login);

module.exports = router;
