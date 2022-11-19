
const db = require("../models");
module.exports = (app) => {

  app.get("/entertainment", (req, res) => {
    db.Users.find({})
      .then((data) => {
        res.json(data);
      });
  });

  app.get("/entertainment", (req, res) => {
    db.Entertainment.find({})
    .limit(10)
    .skip(req.query.startIndex ?? 0) 
      .then((data) => {
        res.json(data);
      });
  });

  app.get("/entertainment/bydate", (req, res) => {
    db.Entertainment.find({})
    .sort({createdAt: -1})
    .limit(20)
      .then((data) => {
        console.log(data);
        res.json(data);
      });
  });

  app.get("/entertainment/byrating", (req, res) => {
    db.Entertainment.find({})
    .sort({rating: -1})
    .limit(20)
      .then((data) => {
        console.log(data);
        res.json(data);
      });
  });

  app.get("/entertainment/billboard", (req, res) => {
    db.Entertainment.find({})
    .find({type: "billboard"})
    .limit(20)
      .then((data) => {
        console.log(data);
        res.json(data);
      });
  });

  app.post("/entertainment/billboard/:id", (req, res) => {
    const change = { type: 'billboard' };
    db.Entertainment.findByIdAndUpdate(req.params.id,change).then((data)=>{
      if(data){
        res.send("Movie added to billboard.")
      }
    })
  });

  app.get("/entertainment/bytype/:type", (req, res) => {
    db.Entertainment.find({})
    .find({type: req.params.type})
    .limit(20)
      .then((data) => {
        console.log(data);
        res.json(data);
      });
  });


  app.get("/entertainment/bygenre/:genre", (req, res) => {
    db.Entertainment.find({})
    .find({genres: req.params.genre})
    .limit(20)
      .then((data) => {
        console.log(data);
        res.json(data);
      });
  });


  app.post("/entertainment", (req, res) => {
    db.Entertainment.create(req.body).then((data) => {
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

    // Agregar genero (Dominican, ETC)
    app.post("/entertainment/addgenre/:id/:genre", (req, res) => {
      const genre = { $push: { genres: req.params.genre } };
      db.Entertainment.findByIdAndUpdate(req.params.id,genre).then((data)=>{
        if(data){
          res.send("Movie genre " + req.params.genre + " added to movie " + data.title)
        }
      })
    });

  app.get("/deleteAll", (req, res) => {
    db.Entertainment.deleteMany({}).then((data) => {
      res.json(data);
    });
  });


};
