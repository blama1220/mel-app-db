const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    work: String,
    location: String,
    age: Number,
    gender: String,
    list: [{ type: Schema.Types.ObjectId, ref: "Entertainment" }],
    states: [{ type: Schema.Types.ObjectId, ref: "UserMovie" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
