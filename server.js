const express = require("express");
const mongoose = require("mongoose");
const app = express();
// Get variables from .env file
require("dotenv").config();

const PORT = 5001;
const MONGODB_URI =
  "mongodb+srv://billmell:billmell@melapi.cqewmco.mongodb.net/?retryWrites=true&w=majority";

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse request body as JSON

// Express routes
require("./routes/apiRoutes")(app);

// Mongo / Mongoose (Object Data Mapper) settings
mongoose.connect(MONGODB_URI);

app.listen(PORT, () => {
  console.log("Server successfully listening at: http://localhost:" + PORT);
});
