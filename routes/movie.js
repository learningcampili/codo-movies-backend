const { Router } = require("express");

const { getMovies, getMovie } = require("../controllers/movie");
const { cacheInit } = require("../middlewares/cache");

// const {} = require("../validators/movie");

const router = Router();

router.get("/", cacheInit, getMovies);
router.get("/:id", cacheInit, getMovie);

module.exports = router;
