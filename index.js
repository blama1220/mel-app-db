import mongoose from "mongoose";
import User from "./model/User.js";
import Entertainment from "./model/Entertainment.js";
mongoose.connect(
  "mongodb+srv://billmell:billmell@melapi.cqewmco.mongodb.net/?retryWrites=true&w=majority"
);

// Create a new user
const firstUser = await User.create({
  name: "Brian",
  lastName: "López",
  email: "brianlama@gmail.com",
  work: "Programmer",
  location: "Dominican Republic",
  age: "26",
  gender: "Male",
});

const firstEntertainment = await Entertainment.create({
  title: "Gold",
  genre: "Action",
  type: "Movie",
  year: 2020,
  episodes: "1",
  releaseYear: "2022",
  // releaseDate: "08/2022",
  rating: 7,
  img: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Gold_%282022_film%29.jpg/220px-Gold_%282022_film%29.jpg",
  // entertainmentDetails: {
  //   status: {
  //     type: "",
  //   },
  //   progress: "1/1",
  //   score: 5,
  // },
});

// const firstUser = await User.findById(
//   "63439c550adb22a424f74122",
//   "name work age"
// ).exec();

// const deleteFirst = await User.deleteOne({ title: "Brian" });
console.log(firstUser);
console.log(firstEntertainment);
