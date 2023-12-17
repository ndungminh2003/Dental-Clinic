const express = require("express");
const dentistCtrl = require("../controller/dentistCtrl");

const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/create-dentist-account",
  // authM.authMiddleware,
  // authM.isAdmin,
  dentistCtrl.createDentistAccount
);
router.get("/get-one-dentist", dentistCtrl.getOneDentist);
router.get("/get-all-dentist", dentistCtrl.getAllDentist);
router.put(
  "/change-dentist-profile",
  // authM.authMiddleware,
  // authM.isNotCustomer,
  // authM.isNotStaff,
  dentistCtrl.updateDentistProfile
);
router.put(
  "/change-dentist-password",
  // authM.authMiddleware,
  // authM.isNotCustomer,
  // authM.isNotStaff,
  dentistCtrl.changeDentistPassword
);
module.exports = router;
