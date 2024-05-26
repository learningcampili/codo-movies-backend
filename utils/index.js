const axios = require("axios");
const { generos, idiomas } = require("../data/data");

const generateGenres = (data) => {
  const genres = [];
  for (let i = 0; i < data.length; i++) {
    const genre = generos.find((genre) => genre.id === data[i]);
    genres.push(genre);
  }
  return genres;
};

const convertLanguage = (data) => {
  const { name } = idiomas.find((language) => language.code === data);
  return name;
};

const fetchDetails = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );

  return {
    backdrop_path: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
    backdrop_path_alternative: `https://image.tmdb.org/t/p/original${data.belongs_to_collection?.backdrop_path}`,
    budget: data.budget,
    revenue: data.revenue,
    runtime: data.runtime,
    status: data.status,
    id: data.id,
  };
};
const fetchCrew = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
  );

  const crew = await data.crew
    .filter((member) => member.job === "Director" || member.job === "Writer")
    .map((member) => ({ name: member.name, job: member.job }));

  return crew;
};

const fetchVideos = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos??language=es&api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );

  const video = data.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );
  console.log(video);
  return video;
};

async function addDetailsToMovies(movies) {
  const updatedMovies = [];
  for (const movie of movies) {
    console.log(movie);
    const video = await fetchVideos(movie.id);
    const {
      revenue,
      runtime,
      backdrop_path,
      backdrop_path_alternative,
      budget,
      status,
    } = await fetchDetails(movie.id);

    const crew = await fetchCrew(movie.id);

    const genres = generateGenres(movie.genre_ids);

    const language = convertLanguage(movie.original_language);
    movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movie.crew = crew;
    movie.genres = genres;
    movie.original_language = language;
    movie.revenue = revenue;
    movie.runtime = runtime;
    movie.backdrop_path = backdrop_path;
    movie.backdrop_path_alternative = backdrop_path_alternative;
    movie.budget = budget;
    movie.status = status;
    movie.video = video?.key;
    delete movie.genre_ids;
    updatedMovies.push(movie);
  }
  return updatedMovies;
}

module.exports = {
  generateGenres,
  convertLanguage,
  fetchDetails,
  fetchCrew,
  fetchVideos,
  addDetailsToMovies,
};
