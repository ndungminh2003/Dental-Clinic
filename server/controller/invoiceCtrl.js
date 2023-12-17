const { getDb } = require("../config/dbconfig");
const { getRole } = require("../middlewares/authMiddleware");

const addInvoice = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("recordId", input.recordId)
      .input("date_time", input.date_time)
      .input("status", input.status)
      .input("total", input.total)
      .input("staffId", input.staffId)
      .execute("sp_addInvoice");
    res.status(200).json(db.recordset);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
      return res.status(statuscode).send(error.message);
    }
    return res.status(500).send("Action Failed");
  }
};

const updateInvoiceStatus = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("invoiceId", input.invoiceId)
      .input("status", input.status)
      .execute("sp_updateInvoiceStatus");
    res.status(200).json(db.recordset);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
      return res.status(statuscode).send(error.message);
    }
    return res.status(500).send("Action Failed");
  }
};

const getInvoiceByRecordId = async (req, res) => {
  const { recordId } = req.query;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("recordId", recordId)
      .execute("sp_viewInvoiceByRecordId");
    res.status(200).json(db.recordset);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
      return res.status(statuscode).send(error.message);
    }
    return res.status(500).send("Action Failed");
  }
};

const getAllInvoice = async (req, res) => {
  try {
    const role = getRole(req);
    const db = await (await getDb(role)).execute("sp_viewAllInvoice");
    res.status(200).json(db.recordset);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
      return res.status(statuscode).send(error.message);
    }
    return res.status(500).send("Action Failed");
  }
};

const getOneInvoice = async (req, res) => {
  const { invoiceId } = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("invoiceId", invoiceId)
      .execute("sp_viewInvoiceById");
    res.status(200).json(db.recordset);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
      return res.status(statuscode).send(error.message);
    }
    return res.status(500).send("Action Failed");
  }
};

const getStaffInvoice = async (req, res) => {
  const { staffId } = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("staffId", staffId)
      .execute("sp_viewStaffInvoice");
    res.status(200).json(db.recordset);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
      return res.status(statuscode).send(error.message);
    }
    return res.status(500).send("Action Failed");
  }
};

module.exports = {
  addInvoice,
  updateInvoiceStatus,
  getInvoiceByRecordId,
  getAllInvoice,
  getStaffInvoice,
  getOneInvoice,
};
