const db = require("../models");
var mongoose = require("mongoose");
module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render('index');
  });
}

