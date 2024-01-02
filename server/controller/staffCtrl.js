const { getDb } = require("../config/dbconfig");
const { getRole } = require("../middlewares/authMiddleware");

const createStaff = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("name", input.name)
      .input("password", input.password)
      .input("phoneNumber", input.phoneNumber)
      .input("gender", input.gender)
      .execute("sp_createStaff");
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

const getOneStaff = async (req, res) => {
  const input = req.params;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("staffId", input.staffId)
      .execute("sp_viewOneStaff");
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

const getAllStaff = async (req, res) => {
  try {
    const role = getRole(req);
    const db = await (await getDb(role)).execute("sp_viewAllStaff");
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

const blockStaff = async (req, res) => {
  const { staffId } = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("staffId", input.staffId)
      .execute("sp_blockStaff");
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

const updateStaffProfile = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("staffId", input.staffId)
      .input("name", input.name)
      .input("phoneNumber", input.phoneNumber)
      .input("gender", input.gender)
      .execute("sp_updateStaffProfile");
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

const changeStaffPassword = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("staffId", input.staffId)
      .input("oldPassword", input.oldPassword)
      .input("newPassword", input.newPassword)
      .execute("sp_changeStaffPassword");
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
  createStaff,
  getOneStaff,
  getAllStaff,
  blockStaff,
  updateStaffProfile,
  changeStaffPassword
};

