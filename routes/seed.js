const { Router } = require("express");

const { getSeed } = require("../controllers/seed");

// const {} = require('../validators/seed');

const router = Router();

router.get("/", getSeed);

module.exports = router;
