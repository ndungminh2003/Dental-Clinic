const { getDb } = require("../config/dbconfig");
const { getRole } = require("../middlewares/authMiddleware");

const makeAppointment = async (req, res) => {
  const input = req.body;
  console.log(input);
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("phone", input.phone)
      .input("name", input.name)
      .input("gender", input.gender)
      .input("birthday", input.birthday)
      .input("address", input.address)
      .input("dentistId", input.dentistId)
      .input("staffId", input.staffId)
      .input("startTime", input.startTime)
      .execute("sp_makeAppointment");
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

const getAllAppointment = async (req, res) => {
  try {
    const role = getRole(req);
    console.log(req.user);
    const db = await (await getDb(role)).execute("sp_viewAllAppointment");
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

const getCustomerAppointment = async (req, res) => {
  const { customerId } = req.params;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("customerId", customerId)
      .execute("sp_viewCustomerAppointment");
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

const getDentistAppointment = async (req, res) => {
  const input = req.params;
  console.log(input.dentistId);
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("dentistId", input.dentistId)
      .execute("sp_viewDentistAppointment");
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

const getOneAppointment = async (req, res) => {
  try {
    const role = getRole(req);
    const db = await (await getDb(role)).execute("sp_viewOneAppointment");
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

const updateAppointmentStatus = async (req, res) => {
  const input = req.body;
  console.log(input);
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("dentistId", input.dentistId)
      .input("startTime", input.startTime)
      .input("status", input.status)
      .execute("sp_updateAppointmentStatus");
    res.status(200).json(db.recordset);
  } catch (error) {}
};

const cancelAppointment = async (req, res) => {
  const input = JSON.stringify({ ...req.query });
  console.log(input);
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("dentistId", input.dentistId)
      .input("startTime", input.startTime)
      .input("customerId", input.customerId)
      .execute("sp_cancelAppointment");
    console.log(db);
    res.status(200).send("Appointment has been canceled");
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
  makeAppointment,
  getAllAppointment,
  getOneAppointment,
  getCustomerAppointment,
  getDentistAppointment,
  cancelAppointment,
  updateAppointmentStatus,
};
