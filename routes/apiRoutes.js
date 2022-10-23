// const userControllers = require("../controllers/userController");
const db = require("../models");
module.exports = (app) => {
  // API routes using userControllers

  app.get("/entertainment", (req, res) => {
    db.Entertainment.find({})
      .limit(10)
      .then((data) => {
        res.json(data);
      });
  });

  app.post("/entertainment", (req, res) => {
    db.Entertainment.create(req.body).then((data) => {
      res.json(data);
    });
  });

  app.get("/deleteAll", (req, res) => {
    db.Entertainment.deleteMany({}).then((data) => {
      res.json(data);
    });
  });

  app.get("/entertainment/search", (req, res) => {
    let title = req.query.title;
    console.log(title);
    db.Entertainment.find({ title: { $regex: title, $options: "i" } })
      .limit(10)
      .then((data) => {
        res.json(data);
      });
  });
};
