const { generateToken } = require("../utils/jwtToken");
const { getDb } = require("../config/dbconfig");

const signUp = async (req, res) => {
  const input = req.body;
  try {
    const db = await (await getDb("guest"))
      .input("phone", input.phone)
      .input("password", input.password)
      .input("name", input.name)
      .input("gender", input.gender)
      .input("birthday", input.birthday)
      .input("address", input.address)
      .execute("sp_signUp");
    res.status(200).json(db.recordsets);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
      return res.status(statuscode).send(error.message);
    }
    return res.status(500).send("Signup failed");
  }
};

const login = async (req, res) => {
  const input = req.body;
  try {
    const db = await (await getDb(input.role))
      .input("phone", input.phone)
      .input("password", input.password)
      .input("role", input.role)
      .execute("sp_login");
    const accessToken = generateToken(input);
    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(200).json(db.recordsets);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
      return res.status(statuscode).send(error.message);
    }
    return res.status(500).send("Login failed");
  }
};

const logout = async (req, res) => {
  const input = req.body;
  try {
    const sql = `SELECT * FROM ${input.role} WHERE phoneNumber = '${input.phone}' AND password = '${input.password}'`;
    const db = await (await getDb(input.role)).query(sql);
    console.log(db.recordsets);
    res.clearCookie("accessToken", {
      httpOnly: false,
      secure: false,
    });
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
      return res.status(statuscode).send(error.message);
    }
    return res.status(500).send("Logout failed");
  }
};

module.exports = {
  signUp,
  login,
  logout,
};
