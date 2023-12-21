const express = require("express");
const prescribeMedicineCtrl = require("../controller/prescribeMedicineCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/create-prescribe-medicine",
  // authM.isDentist,
  prescribeMedicineCtrl.createPrescribeMedicine
);
router.put(
  "/update-prescribe-medicine",
  authM.isDentist,
  prescribeMedicineCtrl.updatePrescribeMedicine
);
router.delete(
  "/delete-prescribe-medicine",
  authM.isDentist,
  prescribeMedicineCtrl.deletePrescribeMedicine
);
router.get(
  "/get-prescribe-medicine",
  prescribeMedicineCtrl.getPrescribeMedicineByRecordId
);

module.exports = router;
