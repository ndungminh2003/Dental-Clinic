const express = require("express");
const medicineCtrl = require("../controller/medicineCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/create-medicine",
  authM.authMiddleware,
  authM.isAdmin,
  medicineCtrl.createMedicine
);
router.put(
  "/update-medicine",
  authM.authMiddleware,
  authM.isAdmin,
  medicineCtrl.updateMedicine
);
router.delete(
  "/delete-medicine",
  authM.authMiddleware,
  authM.isAdmin,
  medicineCtrl.deleteMedicine
);

router.get(
  "/get-one-medicine",
  authM.authMiddleware,
  authM.isNotStaff,
  authM.isNotCustomer,
  medicineCtrl.getOneMedicine
);
router.get(
  "/get-all-medicine",
  authM.authMiddleware,
  authM.isNotStaff,
  authM.isNotCustomer,
  medicineCtrl.getAllMedicine
);

module.exports = router;
