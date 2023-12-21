const express = require("express");
const appointmentCtrl = require("../controller/appointmentCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/make-appointment",
  // authM.isNotDentist,
  appointmentCtrl.makeAppointment
);
router.get("/get-one-appointment", appointmentCtrl.getOneAppointment);
router.get(
  "/get-all-appointment",
  // authM.authMiddleware,
  appointmentCtrl.getAllAppointment
);
router.get(
  "/get-customer-appointment/:customerId",
  authM.authMiddleware,
  appointmentCtrl.getCustomerAppointment
);
router.get(
  "/get-dentist-appointment/:dentistId",
  // authM.authMiddleware,
  appointmentCtrl.getDentistAppointment
);
router.put(
  "/update-appointment-status",
  appointmentCtrl.updateAppointmentStatus
);
router.delete("/cancel-appointment", appointmentCtrl.cancelAppointment);

module.exports = router;
