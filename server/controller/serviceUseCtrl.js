const { getDb } = require("../config/dbconfig");
const { getRole } = require("../middlewares/authMiddleware");

const createServiceUse = async (req, res) => {
  const input = req.body;
  console.log(input);
  try {
    const role = getRole(req);
    console.log(role);
    const db = await (await getDb(role))
      .input("serviceId", input.serviceId)
      .input("recordId", input.recordId)
      .input("quantity", input.quantity)
      .execute("sp_addServiceUse");
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

const deleteServiceUse = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("serviceId", input.medicineId)
      .input("recordId", input.recordId)
      .execute("sp_deleteServiceUse");
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

const getServiceUseByRecordId = async (req, res) => {
  const { recordId } = req.params;
  console.log("hi",recordId);
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("recordId", recordId)
      .execute("sp_viewServiceUse");
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
  createServiceUse,
  deleteServiceUse,
  getServiceUseByRecordId,
};
