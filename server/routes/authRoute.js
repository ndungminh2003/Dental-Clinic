const express = require("express");
const authCtrl = require("../controller/authCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/sign-up", authCtrl.signUp);
router.post("/logout", authCtrl.logout);
router.post("/login", authCtrl.login);
router.put(
  "/block-user",
  // authM.authMiddleware,
  // authM.isAdmin,
  authCtrl.blockUser
);

module.exports = router;
