const CustomError = require("../models/customError");
const Movie = require("../models/Movie");

const getMovies = async (req, res, next) => {
  const { limit = 12, offset = 0 } = req.query;

  try {
    const movies = await Movie.find().skip(Number(offset)).limit(Number(limit));

    res.json(movies);
  } catch (error) {
    next(error);
  }
};

const getMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findOne({ id });

    if (!movie) {
      throw new CustomError("Pélicula no encontrada", 404);
    }
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMovies,
  getMovie,
};
