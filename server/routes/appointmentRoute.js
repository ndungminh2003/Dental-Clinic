const express = require("express");
const {
  authMiddleware,
  isAdmin,
  isCustomer,
  isDentist,
  isStaff,
} = require("../middlewares/authMiddleware");
const {
  makeAppointment,
  getAllAppointment,
} = require("../controller/appointmentCtrl");
const router = express.Router();

router.post("/make-appointment", makeAppointment);
router.get("/get-all-appointment", getAllAppointment);

module.exports = router;
