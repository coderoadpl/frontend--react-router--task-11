const API_KEY = process.env.REACT_APP_API_KEY

export const getMovies = (searchPhrase) => {
  return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=${searchPhrase}`)
    .then((r) => r.json())
    .then((data) => data.Search)
}
