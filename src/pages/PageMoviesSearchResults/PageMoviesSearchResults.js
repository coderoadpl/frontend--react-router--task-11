import React from 'react'
import PropTypes from 'prop-types'

import { useParams } from 'react-router-dom'
import { useAsyncFn } from 'react-use'

import NavLink from '../../components/NavLink'

import { getMovies as getMoviesAPIRequest } from '../../api/getMovies'

import classes from './styles.module.css'

export const PageMoviesSearchResults = (props) => {
  const {
    className,
    ...otherProps
  } = props

  const { searchPhrase } = useParams()

  const [getMoviesState, getMovies] = useAsyncFn(getMoviesAPIRequest)

  React.useEffect(() => {
    if (searchPhrase) getMovies(searchPhrase)
  }, [getMovies, searchPhrase])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <p>
        PageMoviesSearchResults | search phrase is: {searchPhrase}
      </p>

      <div>
        {
          getMoviesState.error ?
            'Error loading movies'
            :
            getMoviesState.loading ?
              'Loading movies...'
              :
                !getMoviesState.value ?
                  'No data'
                  :
                  <ul>
                    {
                      getMoviesState.value.map((movie) => {
                        return (
                          <NavLink
                            key={movie.imdbID}
                            to={'/movies/' + movie.imdbID}
                          >
                            {movie.Year} | {movie.Title}
                          </NavLink>
                        )
                      })
                    }
                  </ul>
        }
      </div>
    </div>
  )
}

PageMoviesSearchResults.propTypes = {
  className: PropTypes.string
}

export default PageMoviesSearchResults
