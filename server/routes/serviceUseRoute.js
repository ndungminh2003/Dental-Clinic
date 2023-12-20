const express = require("express");
const serviceUseCtrl = require("../controller/serviceUseCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/create-service-use",
  // authM.isDentist,
  serviceUseCtrl.createServiceUse
);
router.delete(
  "/delete-service-use",
  authM.isDentist,
  serviceUseCtrl.deleteServiceUse
);
router.get("/get-service-use", serviceUseCtrl.getServiceUseByRecordId);

module.exports = router;
