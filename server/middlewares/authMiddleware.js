const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const expressAsyncHandler = require("express-async-handler");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let accessToken;
  console.log("headers:", req?.headers?.authorization);
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    accessToken = req.headers.authorization.split(" ")[1];
    try {
      if (accessToken) {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = {
          phone: decoded.phone,
          role: decoded.role,
        };
        next();
      } else {
        throw new Error("Not Authorized");
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please login again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

const verifyRole = async (roleName, req, res, next) => {
  const { role } = req.user;
  if (role !== roleName) {
    res.status(402).send("Not Authorized");
  } else {
    next();
  }
};

const blockRole = async (roleName, req, res, next) => {
  const role = getRole(req);
  if (role === roleName) {
    res.status(402).send("Not Authorized");
  } else {
    next();
  }
};

const getRole = (req) => {
  const user = req?.user;
  return user ? user.role : "guest";
};

const isCustomer = async (req, res, next) =>
  verifyRole("customer", req, res, next);

const isStaff = async (req, res, next) => verifyRole("staff", req, res, next);

const isDentist = async (req, res, next) =>
  verifyRole("dentist", req, res, next);

const isAdmin = async (req, res, next) => verifyRole("admin", req, res, next);

const isNotAdmin = async (req, res, next) => blockRole("admin", req, res, next);

const isNotStaff = async (req, res, next) => blockRole("staff", req, res, next);

const isNotDentist = async (req, res, next) =>
  blockRole("dentist", req, res, next);

const isNotCustomer = async (req, res, next) =>
  blockRole("customer", req, res, next);

module.exports = {
  authMiddleware,
  isCustomer,
  isStaff,
  isDentist,
  isAdmin,
  isNotAdmin,
  isNotStaff,
  isNotDentist,
  isNotCustomer,
  getRole,
};
