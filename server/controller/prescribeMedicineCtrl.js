const { getDb } = require("../config/dbconfig");
const { getRole } = require("../middlewares/authMiddleware");

const createPrescribeMedicine = async (req, res) => {
  const input = req.body;
  console.log(input);
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("RECORD_ID", input.recordId)
      .input("MEDICINE_ID", input.medicineId)
      .input("QUANTITY", input.quantity)
      .execute("sp_addPrescribeMedicine");
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

const updatePrescribeMedicine = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("recordId", input.customerId)
      .input("medicineId", input.medicineId)
      .input("quantity", input.quantity)
      .execute("sp_updatePrescribeMedicine");
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

const deletePrescribeMedicine = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("medicineId", input.medicineId)
      .input("recordId", input.recordId)
      .input("medicineName", input.medicineName)
      .execute("sp_deletePrescribeMedicine");
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

const getPrescribeMedicineByRecordId = async (req, res) => {
  const { recordId } = req.params;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("recordId", recordId)
      .execute("sp_viewPrescribeMedicine");
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
  createPrescribeMedicine,
  updatePrescribeMedicine,
  deletePrescribeMedicine,
  getPrescribeMedicineByRecordId,
};
