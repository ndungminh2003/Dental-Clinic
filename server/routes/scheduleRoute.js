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

router.get(
  "/get-dentist-schedule/:dentistId",
  scheduleCtrl.getOneDentistSchedule
);

router.get(
  "/get-all-dentist-schedule",
  authM.isNotCustomer,
  scheduleCtrl.getAllSchedule
);

router.get(
  "/get-all-dentist-schedule-available",
  scheduleCtrl.getAllScheduleAvailable
);

router.get(
  "/get-schedule-available-on-day/:date",
  scheduleCtrl.getScheduleAvailableOnDay
);

router.get("/get-dentist-have-schedule", scheduleCtrl.getDentistHaveSchedule);

module.exports = router;
