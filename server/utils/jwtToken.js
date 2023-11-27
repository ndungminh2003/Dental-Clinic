const jwt = require("jsonwebtoken");

const generateToken = ({ phone, password, role }) => {
  return jwt.sign(
    { phone: phone, password: password, role: role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

module.exports = { generateToken };
