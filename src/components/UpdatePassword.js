import * as api from '../domains/api/actions'

import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Image,
  Label,
  Message,
  Segment
} from 'semantic-ui-react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import React, { Component } from 'react'

import _ from 'lodash'
import { connect } from 'react-redux'

class UpdatePassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      update_password: '',
      notMatch: false,
      loadingText: 'Loading ...',
      sending: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
  }

  handleChange (e, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit () {

  }

  renderErrorMessage () {

  }

  render () {
      return (
        <Grid
          textAlign='center'
          style={{ height: '100vh' }}
          verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large'>
              <Segment stacked>
                <Header as='h2'>{'Update password'}</Header>
                <Header as='h4'>{'Please enter a new password'}</Header>
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Enter Password'
                  type='password'
                  required
                  name='password'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Re-enter Password'
                  type='password'
                  required
                  name='update_password'
                  onChange={this.handleChange}
                />
                {!this.state.sending
                  ? (<Button fluid size='large' disabled={this.state.sending}>
                        Update Password
                  </Button>
                  ) : <p>{'Updating ..'}</p>
                }
              </Segment>
            </Form>
            <div>
              <br />
              <p>Go back and <a href='/login'>Sign in</a></p>
            </div>
          </Grid.Column>
        </Grid>
      )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  } 
}

const mapStateToProps = (state) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdatePassword))
