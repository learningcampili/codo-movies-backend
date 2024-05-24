const { Router } = require("express");
const fs = require("fs");

const router = Router();

const PATH_ROUTES = __dirname;

removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

// lee los archivos del directorio ['index.js','tracks.js','users.js]
// crea el nombre sacando las extensiones
// si no es index crea la ruta
fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);
  if (name !== "index") {
    router.use(`/${name}`, require(`./${file}`));
  }
});

module.exports = router;
