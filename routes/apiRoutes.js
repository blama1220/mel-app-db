// const userControllers = require("../controllers/userController");
const db = require("../models");
module.exports = (app) => {

    // API routes using userControllers

    app.get("/movie", (req, res) => {
        db.Entertainment.find({}).then((data)=> {
            res.json(data);
        });
    });

    app.post("/movie", (req, res) => {
        db.Entertainment.create(req.body).then((data)=> {
            res.json(data);
        });
    });

    app.get("/deleteAll", (req, res) => {
        db.Entertainment.deleteMany({}).then((data)=> {
            res.json(data);
        });
    });


    
}