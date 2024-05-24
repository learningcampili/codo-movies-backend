const { Router } = require("express");

const { getMovies, getMovie } = require("../controllers/movie");

// const {} = require("../validators/movie");

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovie);

module.exports = router;
