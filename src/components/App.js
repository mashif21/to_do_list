import { Route, Switch, withRouter } from 'react-router-dom'

import { Container } from 'semantic-ui-react'
import Header from '../elements/Header.js'
import UserDetails from '../domains/users/components/Details'
import toDoDetail from '../domains/todo_list/components/Details'
import toDoList from '../domains/todo_list/components/List'
import toDoListCreate from '../domains/todo_list/components/Create'
import NotFound from './NotFound.js'
import React, { Component } from 'react'

class App extends React.Component {
  render () {
    return (
      <Container fluid className='px-8 pb-10'>
        <Header {...this.props} />
        <Switch>
          <Route exact path='/user/details' component={UserDetails} />
          <Route exact path='/task/update/:id' component={toDoDetail} />
          <Route exact path='/task/new' component={toDoListCreate} />
          <Route exact path='/task' component={toDoList} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    )
  }
}

export default withRouter(App)
