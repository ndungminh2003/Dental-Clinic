const jwt = require("jsonwebtoken");

const generateToken = ({ phone, role }) => {
  return jwt.sign({ phone: phone, role: role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { generateToken };
