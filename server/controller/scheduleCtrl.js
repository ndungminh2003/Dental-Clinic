const { getDb } = require("../config/dbconfig");
const { getRole } = require("../middlewares/authMiddleware");


const createDentistSchedule = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("startTime", input.startTime)
      .input("dentistId", input.dentistId)
      .execute("sp_addDentistSchedule");
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

const deleteDentistSchedule = async (req, res) => {
  const input = req.query;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("dentistId", input.dentistId)
      .input("startTime", input.startTime)
      .execute("sp_deleteDentistSchedule");
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

const getOneDentistSchedule = async (req, res) => {
  const { dentistId } = req.params;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("dentistId", dentistId)
      .execute("sp_viewDentistSchedule");
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

const getAllSchedule = async (req, res) => {
  try {
    const role = getRole(req);
    const db = await (await getDb(role)).execute("sp_viewAllSchedule");
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

const getAllScheduleAvailable = async (req, res) => {
  try {
    const role = getRole(req);
    const db = await (await getDb(role)).execute("sp_viewAllScheduleAvailable");
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

const getScheduleAvailableOnDay = async (req, res) => {
  const { date } = req.params;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("date", date)
      .execute("sp_viewScheduleAvailableOnDay");
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

const getDentistHaveSchedule = async (req, res) => {
  try {
    const role = getRole(req);
    const db = await (await getDb(role)).execute("sp_getDentistHaveSchedule");
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

const getFullslotSchedule = async (req, res) => {
  try {
    const role = getRole(req);
    const db = await (await getDb(role)).execute("sp_viewFullslotSchedule");
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
  createDentistSchedule,
  deleteDentistSchedule,
  getOneDentistSchedule,
  getAllSchedule,
  getAllScheduleAvailable,
  getScheduleAvailableOnDay,
  getDentistHaveSchedule,
  getFullslotSchedule,
};
