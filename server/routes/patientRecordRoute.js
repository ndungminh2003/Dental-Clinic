const express = require("express");
const patientRecordCtrl = require("../controller/patientRecordCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/create-patient-record",
  authM.authMiddleware,
  authM.isDentist,
  patientRecordCtrl.createPatientRecord
);
router.put(
  "/update-patient-record",
  authM.isDentist,
  patientRecordCtrl.updatePatientRecord
);
router.delete(
  "/delete-patient-record",
  authM.isDentist,
  patientRecordCtrl.deletePatientRecord
);
router.get("/get-patient-record", patientRecordCtrl.getOnePatientRecord);
router.get(
  "/get-all-patient-record",
  authM.isNotDentist,
  authM.isNotCustomer,
  patientRecordCtrl.getAllPatientRecord
);
router.get(
  "/get-patient-record-by-id",
  authM.isNotDentist,
  authM.isNotCustomer,
  patientRecordCtrl.getOnePatientRecordByCustomerId
);

router.get(
  "/get-patient-record-by-dentist-id/:dentistId",
  // authM.isNotDentist,
  // authM.isNotCustomer,
  patientRecordCtrl.getPatientRecordDentistId
);

module.exports = router;
