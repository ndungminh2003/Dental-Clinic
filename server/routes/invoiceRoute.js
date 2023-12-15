const express = require("express");
const invoiceCtrl = require("../controller/invoiceCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/add-invoice",
  authM.authMiddleware,
  authM.isStaff,
  invoiceCtrl.addInvoice
);
router.put(
  "/update-invoice-status",
  authM.authMiddleware,
  authM.isStaff,
  invoiceCtrl.updateInvoiceStatus
);
router.get(
  "/get-record-invoice",
  // authM.authMiddleware,
  // authM.isNotDentist,
  invoiceCtrl.getInvoiceByRecordId
);
router.get(
  "/get-all-invoice",
  authM.authMiddleware,
  authM.isAdmin,
  invoiceCtrl.getAllInvoice
);
router.get(
  "/get-staff-invoice",
  authM.authMiddleware,
  authM.isDentist,
  authM.isNotCustomer,
  invoiceCtrl.getStaffInvoice
);
router.get(
  "/get-one-invoice",
  authM.authMiddleware,
  authM.isStaff,
  invoiceCtrl.getOneInvoice
);

module.exports = router;
