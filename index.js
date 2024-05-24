require("dotenv/config");
const express = require("express");
const cors = require("cors");
const dbConnect = require("./database/mongo");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes/index"));

app.get("*", (req, res) => {
  res.send("404 - not found");
});
app.use(errorHandler);

dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Api running on http://localhost:${PORT}`);
  });
});
