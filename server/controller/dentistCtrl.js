const { getDb } = require("../config/dbconfig");
const { getRole } = require("../middlewares/authMiddleware");

const createDentistAccount = async (req, res) => {
  const input = req.body;
  try {
    const db = await (await getDb("guest"))
      .input("name", input.name)
      .input("password", input.password)
      .input("phoneNumber", input.phoneNumber)
      .input("gender", input.gender)
      .input("birthday", input.birthday)
      .input("introduction", input.introduction)
      .execute("sp_createDentist");
    res.status(200).send("successful create dentist");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
      return res.status(statuscode).send(error.message);
    }
    return res.status(500).send("Action Failed");
  }
};

const getOneDentist = async (req, res) => {
  const { dentistId } = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("dentistId", dentistId)
      .execute("sp_viewOneDentist");
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

const getAllDentist = async (req, res) => {
  try {
    const role = getRole(req);
    const db = await (await getDb(role)).execute("sp_viewAllDentist");
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

const updateDentistProfile = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("dentistId", input.dentistId)
      .input("name", input.name)
      .input("phoneNumber", input.phoneNumber)
      .input("gender", input.gender)
      .input("birthday", input.birthday)
      .input("introduction", input.introduction)
      .execute("sp_updateDentistProfile");
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

const changeDentistPassword = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("dentistId", input.dentistId)
      .input("oldPassword", input.oldPassword)
      .input("newPassword", input.newPassword)
      .execute("sp_changeDentistPassword");
    res.status(200).send("Successfully change password !");
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
  createDentistAccount,
  getOneDentist,
  getAllDentist,
  updateDentistProfile,
  changeDentistPassword,
};
