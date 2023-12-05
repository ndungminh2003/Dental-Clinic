const { getDb } = require("../config/dbconfig");
const { getRole } = require("../middlewares/authMiddleware");

const getAllCustomer = async (req, res) => {
  try {
    const role = getRole(req);
    const db = await (await getDb(role)).execute("sp_viewAllCustomer");
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

const getOneCustomer = async (req, res) => {
  const { customerId } = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("customerId", customerId)
      .execute("sp_viewOneCustomer");
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

const changeCustomerPassword = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("customerId", input.customerId)
      .input("oldPassword", input.oldPassword)
      .input("newPassword", input.newPassword)
      .execute("sp_changeCustomerPassword");
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

const updateCustomerProfile = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("customerId", input.customerId)
      .input("name", input.name)
      .input("phoneNumber", input.phoneNumber)
      .input("gender", input.gender)
      .input("address", input.address)
      .input("birthday", input.birthday)
      .execute("sp_updateCustomerProfile");
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
  getAllCustomer,
  getOneCustomer,
  changeCustomerPassword,
  updateCustomerProfile,
};
