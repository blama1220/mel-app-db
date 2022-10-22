const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entertainmentSchema = new Schema({
  title: { type: String, required: true },
  genres: { type: [String], required: true },
  type: { type: String,  required: true}, // movie, serie o drama
  year: { type: Number},
  episodes: { type: Number }, 
  // releaseYear: { type: Number },
  date: { type: String },
  // releaseDate: Date,
  rating: { type: Number },
  img: { type: String },
  // entertainmentDetails: {
  //   status: {
  //     type: String,
  //     enum: [
  //       "Watching",
  //       "Completed",
  //       "Plan To Watch",
  //       "On Hold",
  //       "Dropped",
  //       "",
  //     ],
  //   },
  //   progress: String,
  //   score: { type: Number, min: 0, max: 10 },
  // },
}, { timestamps: true });

const Entertainment = mongoose.model("Entertainment", entertainmentSchema);
module.exports = Entertainment;
