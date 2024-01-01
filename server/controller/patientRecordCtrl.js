const { getDb } = require("../config/dbconfig");
const { getRole } = require("../middlewares/authMiddleware");

const createPatientRecord = async (req, res) => {
  const input = req.body;
  console.log(input);
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("customerId", input.customerId)
      .input("dentistId", input.dentistId)
      .input("date_time", input.date_time)
      .input("diagnostic", input.diagnostic)
      .input("symptom", input.symptom)
      .input("advice", input.advice)
      .execute("sp_createPatientRecord");
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

const updatePatientRecord = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("recordId", input.recordId)
      .input("date_time", input.date_time)
      .input("diagnostic", input.diagnostic)
      .input("sympton", input.sympton)
      .input("advice", input.advice)
      .execute("sp_updatePatientRecord");
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

const deletePatientRecord = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("recordId", input.recordId)
      .execute("sp_deletePatientRecord");
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

const getOnePatientRecord = async (req, res) => {
  const { recordId } = req.params;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("recordId", recordId)
      .execute("sp_viewOnePatientRecord");
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

const getAllPatientRecord = async (req, res) => {
  try {
    const role = getRole(req);
    const db = await (await getDb(role)).execute("sp_viewAllPatientRecord");
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

const getOnePatientRecordByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("customerId", customerId)
      .execute("sp_viewCustomerPatientRecord");
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

const getPatientRecordDentistId = async (req, res) => {
  const input = req.params;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("dentistId", input.dentistId)
      .execute("sp_viewDentistPatientRecord");
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
  createPatientRecord,
  updatePatientRecord,
  deletePatientRecord,
  getOnePatientRecord,
  getAllPatientRecord,
  getOnePatientRecordByCustomerId,
  getPatientRecordDentistId,
};
