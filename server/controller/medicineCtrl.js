const { getDb } = require("../config/dbconfig");
const { getRole } = require("../middlewares/authMiddleware");

const createMedicine = async (req, res) => {
  const input = req.body;
  console.log(input);
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("name", input.name)
      .input("unit", input.unit)
      .input("description", input.description)
      .input("expirationDate", input.expirationDate)
      .input("indication", input.indication)
      .input("quantity", input.quantity)
      .input("price", input.price)
      .execute("sp_createMedicine");
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

const updateMedicine = async (req, res) => {
  const input = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("medicineId", input.medicineId)
      .input("name", input.name)
      .input("unit", input.unit)
      .input("description", input.description)
      .input("expirationDate", input.expirationDate)
      .input("indication", input.indication)
      .input("quantity", input.quantity)
      .input("price", input.price)
      .execute("sp_updateMedicine");
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

const deleteMedicine = async (req, res) => {
  const input = req.body;
  console.log(input);
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("medicineId", input.medicineId)
      .execute("sp_deleteMedicine");
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

const getOneMedicine = async (req, res) => {
  const { medicineId } = req.body;
  try {
    const role = getRole(req);
    const db = await (await getDb(role))
      .input("medicineId", medicineId)
      .execute("sp_viewOneMedicine");
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

const getAllMedicine = async (req, res) => {
  try {
    const role = getRole(req);
    const db = await (await getDb(role)).execute("sp_viewAllMedicine");
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
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getAllMedicine,
  getOneMedicine,
};
