const { Schema, model } = require("mongoose");

const MovieSchema = new Schema(
  {
    title: String,
    overview: String,
    release_date: String,
    poster_path: String,
    vote_average: Number,
    genres: [{ id: Number, name: String }],
    id: Number,
    original_language: String,
    crew: [{ name: String, job: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Movie", MovieSchema);
