import React from 'react'
import PropTypes from 'prop-types'

import { useParams } from 'react-router-dom'
import { useAsyncFn } from 'react-use'

import { getMovie as getMovieAPIRequest } from '../../api/getMovie'

import classes from './styles.module.css'

export const PageMoviesResult = (props) => {
  const {
    className,
    ...otherProps
  } = props

  const { imdbID } = useParams()

  const [getMovieState, getMovie] = useAsyncFn(getMovieAPIRequest)

  React.useEffect(() => {
    if (imdbID) getMovie(imdbID)
  }, [getMovie, imdbID])

  return (
    <div
      className={`${classes.root}${className ? ` ${className}` : ''}`}
      {...otherProps}
    >
      <p>
        PageMoviesResult
      </p>
      {
        getMovieState.error ?
          'Error loading movie'
          :
          getMovieState.loading ?
            'Loading movie...'
            :
              !getMovieState.value ?
                'No data'
                :
                getMovieState.value.Error ?
                  getMovieState.value.Error
                  :
                  <ul>
                    {
                      Object.entries(getMovieState.value).map(([fieldName, value]) => {
                        return (
                          <li
                            key={fieldName}
                          >
                            {fieldName} | {' '}
                            {
                              fieldName === 'Poster' ?
                                <img
                                  src={value}
                                  alt={'Poster'}
                                />
                                :
                                fieldName === 'Ratings' ?
                                  <ul>
                                    {value.map((rating) => {
                                      return (
                                        <li
                                          key={rating.Source}
                                        >
                                          {rating.Source} | {rating.Value}
                                        </li>
                                      )
                                    })}
                                  </ul>
                                  :
                                  value
                            }
                          </li>
                        )
                      })
                    }
                  </ul>
      }
    </div>
  )
}

PageMoviesResult.propTypes = {
  className: PropTypes.string
}

export default PageMoviesResult
