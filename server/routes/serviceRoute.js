const express = require("express");
const serviceCtrl = require("../controller/serviceCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/create-service",
  // authM.isAdmin,
  serviceCtrl.createService
);

router.delete(
  "/delete-service/:serviceId",
  // authM.authMiddleware,
  // authM.isAdmin,
  serviceCtrl.deleteService
);
router.put(
  "/update-service",
  // authM.isAdmin,
  serviceCtrl.updateService
);
router.get("/get-service", serviceCtrl.getOneService);
router.get("/get-all-service", serviceCtrl.getAllService);

module.exports = router;
