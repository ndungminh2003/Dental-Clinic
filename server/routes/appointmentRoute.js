const express = require("express");
const {
  makeAppointment,
  getOneAppointment,
  cancelAppointment,
} = require("../controller/appointmentCtrl");
const { isNotDentist } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/make-appointment", isNotDentist, makeAppointment);
router.get("/get-one-appointment", getOneAppointment);
router.delete("/cancel-appointment", cancelAppointment);
module.exports = router;
