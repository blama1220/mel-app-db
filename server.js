const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { engine } = require('express-handlebars');
// Get variables from .env file
require("dotenv").config();

const PORT = 5001;
const MONGODB_URI =
  "mongodb+srv://billmell:billmell@melapi.cqewmco.mongodb.net/?retryWrites=true&w=majority";

// handlebars middleware
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');
// Rest of express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse request body as JSON

// Express routes
require("./routes/apiRoutes")(app);
require("./routes/viewRoutes")(app);
// Mongo / Mongoose (Object Data Mapper) settings
mongoose.connect(MONGODB_URI);

app.listen(PORT, () => {
  console.log("Server successfully listening at: http://localhost:" + PORT);
});
