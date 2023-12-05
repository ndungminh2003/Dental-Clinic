const express = require("express");
const scheduleCtrl = require("../controller/scheduleCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/create-dentist-schedule",
  authM.isDentist,
  scheduleCtrl.createDentistSchedule
);
router.delete(
  "/delete-dentist-schedule",
  authM.isDentist,
  scheduleCtrl.deleteDentistSchedule
);
router.get("/get-dentist-schedule", scheduleCtrl.getOneDentistSchedule);
router.get(
  "/get-all-dentist-schedule",
  authM.isNotCustomer,
  scheduleCtrl.getAllSchedule
);
router.get(
  "/get-all-dentist-schedule-available",
  scheduleCtrl.getAllScheduleAvailable
);

module.exports = router;
