const db = require("../models");
var mongoose = require("mongoose");

module.exports = (app) => {
  app.get("/users", (req, res) => {
    db.Users.find({})
      .populate("list")
      .populate("states")
      .populate({
        path: "states",
        populate: {
          path: "movie",
        },
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  // Agregar movie al usuario
  // El body necesita:
  // *Email del usuario (email)
  // *Id de la pelicula (movieId)
  app.post("/users/addmovie", (req, res) => {
    db.Users.findOneAndUpdate(
      { email: req.body.email },
      { $push: { list: req.body.movieId } }
    )
      .then((data) => {
        res.json("Movie added to " + data.name);
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  // Login
  // El body necesita:
  // *Email del usuario (email)
  // *Password del usuario (password)
  app.post("/login", (req, res) => {
    let body = req.body;

    if (!body.email || !body.password) {
      return res.json({
        msg: "Please send the information necessary for the login.",
      });
    }
    db.Users.findOne({ email: body.email })
      .then((data) => {
        if (!data === null) {
          return res.json({ msg: "Email not found in the database" });
        } else if (body.password === data.password) {
          console.log(`Logged in with ${body.email}`);
          data.list = null;
          data.states = null;
          data.password = null;
          return res.json({
            msg: "Auth successful",
            auth: true,
            data: data,
          });
        } else {
          return res.json({ msg: "Incorrect password", auth: false });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "Internal database error" });
      });
  });

  // Get data by id
  app.get("/getData/:id", (req, res) => {
    db.Users.findById(req.params.id)
      .populate("states")
      .populate({
        path: "states",
        populate: {
          path: "movie",
        },
      })
      .then((data) => {
        if (data) {
          res.json({ movieList: data.list, movieStates: data.states });
        } else {
          res.json({ msg: "User not found." });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  // El body necesita userId
  app.post("/getData/:state", (req, res) => {
    db.Users.findById(req.body.userId)
      .populate("states")
      .populate({
        path: "states",
        populate: {
          path: "movie",
        },
      })
      .then((data) => {
        if (data.states.length != 0) {
          let states = [];
          data.states.forEach((el) => {
            console.log(el.state);
            if (el.state === req.params.state) {
              states.push(el);
            }
          });
          if (states.length === 0) {
            res.json({ msg: "No states found for user" });
          } else {
            res.json({ states: states });
          }
        } else {
          res.json({ msg: "No states found for user" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  // Agregar state movie al usuario
  // El body necesita:
  // email del usuario (userEmail)
  //el nombre de state (stateName)
  // *el id de la pelicula para asignar el movie state al usuario (movieId)
  app.post("/users/addstate", (req, res) => {
    console.log(req.body);
    try {
      db.Users.find({ email: req.body.userEmail })
        .populate("states")
        .then((data) => {
          // data del usuario en question
          let updated = false;
          data[0].states.forEach((state) => {
            if (state.movie.toString() === req.body.movieId) {
              // Change state
              updated = true;
              if (req.body.stateName === state.state) {
                return res.json({
                  msg: "State already exist with this movie.",
                });
              }
              db.UserMovie.findByIdAndUpdate(state._id, {
                state: req.body.stateName,
              }).then((data) => {
                return res.json({ msg: "State assinged successfuly." });
              });
            }
          });
          if (!updated) {
            db.UserMovie.create({
              state: req.body.stateName,
              movie: req.body.movieId,
            }).then((data) => {
              // State creado, buscando usuario para insertarle el nuevo MovieState
              db.Users.findOneAndUpdate(
                { email: req.body.userEmail },
                { $push: { states: data._id } }
              ).then((userData) => {
                return res.json({
                  msg: "Movie state added to user: " + userData.name,
                });
              });
            });
          }
        });
    } catch (error) {
      console.log(error);
      return res.json({ error: error, msg: "Internal database error" });
    }
  });

  //Create Users
  app.post("/users", (req, res) => {
    console.log(req.body);
    db.Users.findOne({ email: req.body.email })
      .then((data) => {
        if (data) {
          res.json({ msg: "Email used exists in the database." });
        } else {
          db.Users.create(req.body).then((data) => {
            res.json({ msg: "User created successfully." });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  app.get("/entertainment", (req, res) => {
    console.log(req.body);
    db.Entertainment.find({})
      .limit(10)
      .skip(req.query.startIndex ?? 0)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  app.get("/entertainment/bydate", (req, res) => {
    db.Entertainment.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  app.get("/entertainment/byrating", (req, res) => {
    db.Entertainment.find({})
      .sort({ rating: -1 })
      .limit(20)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  app.get("/entertainment/billboard", (req, res) => {
    db.Entertainment.find({})
      .sort({ createdAt: -1 })
      .find({ type: "billboard" })
      .limit(20)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  app.post("/entertainment/billboard/:id", (req, res) => {
    const change = { type: "billboard" };
    db.Entertainment.findByIdAndUpdate(req.params.id, change)
      .then((data) => {
        if (data) {
          res.send({msg:"Movie added to billboard."});
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  app.put("/entertainment/remove/:id", (req, res) => {
    const change = { type: "Movie" };
    db.Entertainment.findByIdAndUpdate(req.params.id, change)
      .then((data) => {
        if (data) {
          res.json({msg: "Movie removed from billboard."});
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  app.get("/entertainment/bytype/:type", (req, res) => {
    db.Entertainment.find({})
      .find({ type: req.params.type })
      .limit(20)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  app.get("/entertainment/bygenre/:genre", (req, res) => {
    db.Entertainment.find({})
      .find({ genres: req.params.genre })
      .limit(20)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  app.post("/entertainment", (req, res) => {
    db.Entertainment.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  app.get("/entertainment/search", (req, res) => {
    let title = req.query.title;
    db.Entertainment.find({ title: { $regex: title, $options: "i" } })
      .limit(10)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  // Agregar genero (Dominican, ETC)
  app.post("/entertainment/addgenre/:id/:genre", (req, res) => {
    const genre = { $push: { genres: req.params.genre } };
    db.Entertainment.findByIdAndUpdate(req.params.id, genre)
      .then((data) => {
        if (data) {
          res.send(
            "Movie genre " + req.params.genre + " added to movie " + data.title
          );
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  // Necesita userId en el body
  app.post("/recomendation", (req, res) => {
    db.Users.findById(req.body.userId)
      .populate("states")
      .populate({
        path: "states",
        populate: {
          path: "movie",
        },
      })
      .then((data) => {
        let genres = [];
        data.states.forEach((state) => {
          genres.push(
            state.movie.genres[
              Math.floor(Math.random() * state.movie.genres.length)
            ]
          );
        });
        console.log(genres);
        db.Entertainment.find({
          genres: { $in: genres },
          year: { $gt: 2014, $lt: 2022 },
          rating: { $gt: 7, $lt: 10 },
        })
          .sort({ rating: -1 })
          .limit(100)
          .then((data) => {
            let finalMovies = [];
            for (let i = 0; i < 10; i++) {
              finalMovies.push(data[Math.floor(Math.random() * data.length)]);
            }
            finalMovies = finalMovies.sort((p1, p2) =>
              p1.rating < p2.rating ? 1 : p1.rating > p2.rating ? -1 : 0
            );
            return res.json(finalMovies);
          });
      });
  });

  // app.get("/deleteAll", (req, res) => {
  //   db.Entertainment.deleteMany({}).then((data) => {
  //     res.json(data);
  //   });
  // });

  // Admin page

  app.delete("/users/:id", (req, res) => {
    db.Users.deleteOne({ _id: req.params.id })
      .then((data) => {
        res.json({ msg: "Deleted successfuly" });
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });

  app.delete("/entertainment/:id", (req, res) => {
    db.Entertainment.deleteOne({ _id: req.params.id })
      .then((data) => {
        res.json({ msg: "Deleted successfuly" });
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Internal database error" });
      });
  });
};
