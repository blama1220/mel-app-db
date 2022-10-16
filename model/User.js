import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  work: String,
  location: String,
  age: Number,
  gender: { type: String, enum: ["Male", "Female", ""] },
  list: [{ movies: String }],
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

const User = model("User", userSchema);
export default User;
