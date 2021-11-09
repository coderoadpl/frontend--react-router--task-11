import React from 'react'

import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import NavLink from './components/NavLink'

import Page404 from './pages/Page404'
import PageLogout from './pages/PageLogout'
import PageLogin from './pages/PageLogin'
import PageHome from './pages/PageHome'
import PageMoviesSearch from './pages/PageMoviesSearch'
import PageMoviesSearchResults from './pages/PageMoviesSearchResults'
import PageMoviesResult from './pages/PageMoviesResult'

import { useUser } from './contexts/UserContext'

export const App = () => {
  const { isUserLoggedIn } = useUser()

  return (
    <div>
      {
        isUserLoggedIn ?
          <NavBar>
            <NavLink
              to={'/'}
            >
              Home
            </NavLink>
            <NavLink
              to={'/movies/search'}
            >
              Movies search
            </NavLink>
            <NavLink
              to={'/logout'}
            >
              Log out
            </NavLink>
          </NavBar>
          :
          null
      }
      <Routes>
        {
          !isUserLoggedIn ?
            <Route
              path={'*'}
              element={<PageLogin />}
            />
            :
            <>
              <Route
                path={'/'}
                element={<PageHome />}
              />
              <Route
                path={'/movies/search'}
                element={<PageMoviesSearch />}
              >
                <Route
                  index={true}
                  element={
                    <p>
                      Start typing to search our movies database!
                    </p>
                  }
                />
                <Route
                  path={':searchPhrase'}
                  element={<PageMoviesSearchResults />}
                />
              </Route>
              <Route
                path={'/movies/:imdbID'}
                element={<PageMoviesResult />}
              />
              <Route
                path={'/logout'}
                element={<PageLogout />}
              />
              <Route
                path={'*'}
                element={<Page404 />}
              />
            </>
        }
      </Routes>
    </div>
  )
}

export default App
