const express = require("express");
const staffCtrl = require("../controller/staffCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-staff-account", /*authM.isAdmin,*/ staffCtrl.createStaff);
router.get(
  "/get-one-staff",
  authM.isNotCustomer,
  authM.isNotDentist,
  staffCtrl.getOneStaff
);
router.get("/get-all-staff", /*authM.isAdmin,*/ staffCtrl.getAllStaff);

module.exports = router;
