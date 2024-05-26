const { Schema, model } = require("mongoose");

const MovieSchema = new Schema(
  {
    original_title: String,
    title: String,
    overview: String,
    popularity: Number,
    release_date: String,
    poster_path: String,
    vote_average: Number,
    genres: [{ id: Number, name: String }],
    id: Number,
    original_language: String,
    crew: [{ name: String, job: String }],
    revenue: Number,
    backdrop_path: String,
    backdrop_path_alternative: String,
    budget: Number,
    runtime: Number,
    status: String,
    video: String,
    vote_average: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Movie", MovieSchema);
