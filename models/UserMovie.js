
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userMovieSchema = new Schema(
  {
    state: { type: String, required: true },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entertainment"
    },
    episodesWatchted: { type: Number, default: 0}
  },
  { timestamps: true }
);

const UserMovie = mongoose.model("UserMovie", userMovieSchema);
module.exports = UserMovie;
