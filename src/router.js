import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import App from './components/App'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import React from 'react'
import ResetPassword from './components/ResetPassword'
import UpdatePassword from './components/UpdatePassword'
import RegisterUser from './components/RegisterUser'

export const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)}>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/reset' component={ResetPassword} />
      <Route path='/update/:token' component={UpdatePassword} />
      <Route path='/register' component={RegisterUser}/>
      <PrivateRoute component={App} />
    </Switch>
  </Router>
)