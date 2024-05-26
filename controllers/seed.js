const { generos, idiomas } = require("../data/data");

const CustomError = require("../models/customError");
const axios = require("axios");
const { fetchDetails, addDetailsToMovies } = require("../utils");
const Movie = require("../models/Movie");
const baseUrl = "https://api.themoviedb.org/3";

const getSeed = async (req, res, next) => {
  try {
    let page = 1;
    let allMovies = [];

    while (page < 3) {
      const { data } = await axios.get(`${baseUrl}/movie/popular`, {
        params: {
          api_key: process.env.TMDB_API_KEY,
          language: "es-ES",
          page: page,
        },
      });

      allMovies = [...allMovies, ...data.results];
      page++;
    }

    const response = await axios.get(`${baseUrl}/movie/top_rated`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: "es-ES",
      },
    });
    allMovies = [...allMovies, ...response.data.results];
    const updatedMovies = await addDetailsToMovies(allMovies);

    try {
      await Movie.deleteMany();
      await Movie.insertMany(updatedMovies);
      console.log(`Database seeded with ${updatedMovies.length} movies`);
    } catch (err) {
      console.error("Error seeding database:", err.message);
    }

    res.json(`Database seeded with ${updatedMovies.length} movies`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSeed,
};
