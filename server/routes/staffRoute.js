const express = require("express");
const staffCtrl = require("../controller/staffCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-staff", authM.isAdmin, staffCtrl.createStaff);
router.get(
  "/get-staff",
  authM.isNotCustomer,
  authM.isNotDentist,
  staffCtrl.getOneStaff
);
router.get("/get-all-staff", authM.isAdmin, staffCtrl.getAllStaff);
router.put("/block-staff", authM.isNotAdmin, staffCtrl.blockStaff);

module.exports = router;
