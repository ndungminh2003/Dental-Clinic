var db = require("../utils/dbOperation");

exports.all = () => {
  return db.load("select * from CUSTOMER");
};

exports.single = (id) => {
  return db.load(`select * from CUSTOMER where id = ${id}`);
};

exports.add = (entity) => {
  return db.add("customer", entity);
};

exports.del = (id) => {
  return db.del("customer", "id", id);
};

exports.patch = (id, entityWoId) => {
  return db.patch("customer", "id", id, entityWoId);
};
