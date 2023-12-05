var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
const dotenv = require("dotenv").config();
var port = process.env.PORT || 3000;
var app = express();
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

const { roleAuthentication } = require("./controller/authCtrl");
const authRoute = require("./routes/authRoute");
const appointmentRoute = require("./routes/appointmentRoute");
const customerRoute = require("./routes/customerRoute");
const dentistRoute = require("./routes/dentistRoute");
const invoiceRoute = require("./routes/invoiceRoute");
const medicineRoute = require("./routes/medicineRoute");
const patientRecordRoute = require("./routes/patientRecordRoute");
const prescribeMedicineRoute = require("./routes/prescribeMedicineRoute");
const serviceRoute = require("./routes/serviceRoute");
const staffRoute = require("./routes/staffRoute");
const serviceUseRoute = require("./routes/serviceUseRoute");
const scheduleRoute = require("./routes/scheduleRoute");

app.use(morgan("dev"));
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(roleAuthentication);
app.get("/", (req, res) => {
  res.json({
    msg: "root",
  });
});

app.use("/api/customer", customerRoute);
app.use("/api/auth", authRoute);
app.use("/api/appointment", appointmentRoute);
app.use("/api/dentist", dentistRoute);
app.use("/api/invoice", invoiceRoute);
app.use("/api/medicine", medicineRoute);
app.use("/api/patient-record", patientRecordRoute);
app.use("/api/prescribe-medicine", prescribeMedicineRoute);
app.use("/api/service", serviceRoute);
app.use("/api/staff", staffRoute);
app.use("/api/service-use", serviceUseRoute);
app.use("/api/schedule", scheduleRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
