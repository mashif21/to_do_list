import { Redirect, Route } from 'react-router-dom'

import React from 'react'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }}
  />
)

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn || localStorage.getItem('IS_LOGGED_IN')
  }
}

export default connect(mapStateToProps)(PrivateRoute)