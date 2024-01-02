const express = require("express");
const staffCtrl = require("../controller/staffCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-staff-account", /*authM.isAdmin,*/ staffCtrl.createStaff);
router.get(
  "/get-one-staff/:staffId",
  authM.isNotCustomer,
  authM.isNotDentist,
  staffCtrl.getOneStaff
);
router.get("/get-all-staff", /*authM.isAdmin,*/ staffCtrl.getAllStaff);
router.put(
  "/change-staff-profile",
  // authM.authMiddleware,
  // authM.isNotCustomer,
  // authM.isNotDetist,
  staffCtrl.updateStaffProfile
);
router.put(
  "/change-staff-password",
  // authM.authMiddleware,
  // authM.isNotCustomer,
  // authM.isNotDentist,
  staffCtrl.changeStaffPassword
);
module.exports = router;
