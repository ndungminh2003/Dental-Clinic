var express = require("express");
var customerModel = require("../models/customerModel");

var router = express.Router();

router.get("/", (req, res) => {
  customerModel.all().then((rows) => {
    res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  customerModel.single(req.params.id).then((rows) => {
    if (rows.length === 0) {
      res.status(204).end();
    } else {
      res.json(rows[0]);
    }
  });
});

router.post("/", (req, res) => {
  customerModel.add(req.body).then((insertId) => {
    res.status(201).json({
      id: insertId,
      ...req.body,
    });
  });
});

router.delete("/:id", (req, res) => {
  customerModel.del(req.params.id).then((affectedRows) => {
    res.status(200).json({
      affectedRows,
    });
  });
});

router.patch("/:id", (req, res) => {
  customerModel
    .patch(req.params.id, req.body)
    .then((affectedRows) => {
      res.status(200).json({
        affectedRows,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
