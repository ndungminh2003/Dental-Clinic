var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
const dotenv = require("dotenv").config();
var port = process.env.PORT || 3000;
var app = express();
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

const customerRoute = require("./routes/customerRoute");
const authRoute = require("./routes/authRoute");
app.use(morgan("dev"));
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    msg: "root",
  });
});

// app.use("/api/customer", customerRoute);
app.use("/api/auth", authRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
