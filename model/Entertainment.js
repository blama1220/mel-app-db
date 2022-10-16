import { Schema, model } from "mongoose";

const entertainmentSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  type: { type: String, enum: ["Movie", "Serie", "Play/Drama"] },
  year: { type: String, required: true, lowercase: true },
  episodes: String,
  releaseYear: String,
  // releaseDate: Date,
  rating: Number,
  img: String,
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
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
});

const Entertainment = model("Entertainment", entertainmentSchema);
export default Entertainment;
