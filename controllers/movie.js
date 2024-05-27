const CustomError = require("../models/customError");
const Movie = require("../models/Movie");

const getMovies = async (req, res, next) => {
  const { limit = 12, offset = 0, top = false } = req.query;

  const orderBy = top ? { vote_average: -1 } : { title: 1 }; // "vote_average" o "release_date";

  try {
    const movies = await Movie.find()
      .sort(orderBy)
      .skip(Number(offset))
      .limit(Number(limit));
    const totalMovies = await Movie.countDocuments();

    res.json({
      totalMovies,
      movies,
    });
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
