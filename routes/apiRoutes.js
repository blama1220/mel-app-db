
const db = require("../models");
var mongoose = require('mongoose');
module.exports = (app) => {

  app.get("/users", (req, res) => {
    db.Users.find({})
    .populate("list")
    .populate("states")
    .populate({ 
      path: 'states',
      populate: {
        path: 'movie',
      }
    })
    .then((data) => {
      res.json(data);
    });
  });

  app.post("/getState", (req, res) => {
    db.UserMovie.findById(req.body.id)
    .populate("movie")
    .then((data) => {
      res.json(data);
    })
  });


  // Agregar movie al usuario
  // El body necesita:
  // *Email del usuario (email)
  // *Id de la pelicula (movieId)
  app.post("/users/addmovie", (req, res) => {
    db.Users.findOneAndUpdate({email: req.body.email},{$push: {list: req.body.movieId}})
      .then((data) => {
        res.json("Movie added to " + data.name);
      });
  });

  // Agregar state movie al usuario
  // El body necesita:
  // *email del usuario (userEmail)
  // *el nombre de state (stateName)
  // *el id de la pelicula para asignar el movie state al usuario (movieId)
  app.post("/users/addstate", (req, res) => {
    // Crear state
    db.UserMovie.create({state: req.body.stateName, movie: req.body.movieId }).then((data) => {
      // State creado, buscando usuario para insertarle el nuevo MovieState
      db.Users.findOneAndUpdate({email: req.body.userEmail},{$push: {states: data._id}}).then((userData) => {
        res.json({"msg": "Movie state added to user: " + userData.name});
      });
    });

  });

  app.post("/users", (req, res) => {
    db.Users.findOne({email: req.body.email})
      .then((data) => {
        if(data){
          res.json({msg: "Email used exists in the database."})
        } else {
          db.Users.create(req.body).then((data) => {
            res.json({msg: "User created successfully."})
          });
        }
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

  // app.get("/deleteAll", (req, res) => {
  //   db.Entertainment.deleteMany({}).then((data) => {
  //     res.json(data);
  //   });
  // });


};
