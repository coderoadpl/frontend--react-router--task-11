const API_KEY = process.env.REACT_APP_API_KEY

export const getMovie = (imdbID) => {
  return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`)
    .then((r) => r.json())
}
