const jwt = require("jsonwebtoken");
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
    res.status(200).json(db.recordset);
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

    const accessToken = generateToken({
      phone: input.phone,
      role: input.role == "guest" ? "customer" : input.role,
    });
    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(200).json(db.recordset);
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
  try {
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

const roleAuthentication = async (req, res, next) => {
  try {
    let accessToken;
    if (req?.cookies?.accessToken) {
      accessToken = req.cookies.accessToken;
      if (accessToken) {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const sql = `SELECT * FROM ${decoded.role} WHERE phoneNumber = '${decoded.phone}'`;
        const db = await (await getDb(decoded.role)).query(sql);
        const user = db.recordset[0];
        if (user) {
          req.user = {
            phone: decoded.phone,
            role: decoded.role,
          };
          return next();
        } else throw null;
      }
    } else throw null;
  } catch {
    return next();
  }
};

const getRole = (req, res) => {
  const user = req.user;
  return user ? user.role : "guest";
};

module.exports = {
  signUp,
  login,
  logout,
  roleAuthentication,
  getRole,
};
