const { getDb } = require("../config/dbconfig");
const { getRole } = require("../middlewares/authMiddleware");

const createService = async (req, res) => {
  const input = req.body;
  console.log(input);
  try {
    const role = getRole(req);
    console.log(role);
    const db = await (await getDb(role))
      .input("name", input.name)
      .input("price", input.price)
      .input("description", input.description)
      .execute("sp_addService");
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

const deleteService = async (req, res) => {
  const input = req.params;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("serviceId", input.serviceId)
      .execute("sp_deleteService");
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

const updateService = async (req, res) => {
  const input = req.body;
  console.log(input);
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("serviceId", input.serviceId)
      .input("name", input.name)
      .input("price", input.price)
      .input("description", input.description)
      .execute("sp_updateService");
    res.status(200).json(db.recordset);
  } catch (error) {}
};

const getOneService = async (req, res) => {
  const { serviceId } = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("serviceId", serviceId)
      .execute("sp_viewOneService");
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

const getAllService = async (req, res) => {
  try {
    const role = getRole(req);
    const db = await (await getDb(role)).execute("sp_viewAllService");
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
  createService,
  deleteService,
  updateService,
  getOneService,
  getAllService
};

