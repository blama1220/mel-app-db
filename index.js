const axios = require("axios");

let i = 0;

let a = () => {
  i++;
  // console.log("Llamada numero: " + i);
  axios
    .get(
      "https://api.themoviedb.org/3/movie/popular?api_key=ec93b5467b7afc166f44d66adc5c90db&language=en-US&page=" +
        i
    )
    .then(function (response) {
      // handle success
      // console.log(response.data)
      response.data.results.forEach((movie) => {
        b(movie);
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

setInterval(a, 1500);
let b = (data) => {
  let genres = {};
  genres["28"] = "Action";
  genres["12"] = "Adventure";
  genres["16"] = "Animation";
  genres["35"] = "Comedy";
  genres["80"] = "Crime";
  genres["99"] = "Documentary";
  genres["18"] = "Drama";
  genres["10751"] = "Family";
  genres["14"] = "Fantasy";
  genres["36"] = "History";
  genres["27"] = "Horror";
  genres["10402"] = "Music";
  genres["9648"] = "Mystery";
  genres["10749"] = "Romance";
  genres["878"] = "Science Fiction";
  genres["10770"] = "TV Movie";
  genres["53"] = "Thriller";
  genres["10752"] = "War";
  genres["37"] = "Western";

  let genresKeys = Object.keys(genres);
  let obj = {};
  obj.title = data.title;
  obj.genres = [];
  data.genre_ids.forEach((id) => {
    if (genresKeys.includes(id + "")) {
      obj.genres.push(genres[id + ""]);
    }
  });
  obj.type = "Movie";
  obj.year = parseInt(data.release_date.split("-")[0]);
  obj.episodes = 1;
  obj.date = data.release_date;
  obj.rating = data.vote_average;
  obj.img = "https://image.tmdb.org/t/p/w500" + data.poster_path;
  axios
    .post("http://localhost:5001/movie", obj)
    .then(function (response) {
      // console.log(response.data);
      // console.log("==================================================");
    })
    .catch(function (error) {
      console.log(error);
    });
};
