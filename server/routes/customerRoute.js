const express = require("express");
const customerCtrl = require("../controller/customerCtrl");
const authM = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/get-one-customer", customerCtrl.getOneCustomer);
router.get(
  "/get-all-customer",
  // authM.authMiddleware,
  // authM.isAdmin,
  customerCtrl.getAllCustomer
);

router.put(
  "/update-customer-profile/:customerId",
  authM.authMiddleware,
  authM.isNotDentist,
  authM.isNotStaff,
  customerCtrl.updateCustomerProfile
);

router.put(
  "/change-customer-password",
  authM.authMiddleware,
  authM.isNotDentist,
  authM.isNotStaff,
  customerCtrl.changeCustomerPassword
);

module.exports = router;
