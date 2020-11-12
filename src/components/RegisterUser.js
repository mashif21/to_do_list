import * as api from '../domains/api/actions'
import { register } from '../domains/auth/actions'

import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'
import React, { Component } from 'react'

import _ from 'lodash'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

class RegisterUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      password: '',
      age: '',
      disabled: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderBottomBarMessage = this.renderBottomBarMessage.bind(this)
  }

  handleChange (e, { name, value }) {
    this.setState({ [name]: value, disabled: false })
  }

  handleSubmit () {
    this.setState({ disabled: true })
    this.props.registerUser(this.state)
  }

  renderBottomBarMessage () {
    if (this.state.disabled) {
      this.setState({ disabled: false })
    }
      return (
        <Message
          error
          header='Not a Valid Entry'
          content='Sorry unable to process your request'
        />
      )
  }

  render () {
    if (this.props.loggedIn) return <Redirect to='/task' />
    return (
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Container className='m-4'>
            <Image src='/img/nuvalence.jpeg' size='medium' centered />
          </Container>
          <Form
            size='large'
            onSubmit={this.handleSubmit}
            error={!_.isEmpty(this.props.error)}
            success={
              !_.isEmpty(this.props.resetEmail) &&
                  this.props.resetEmail.FailureCount <= 0
            }
            warning={
              !_.isEmpty(this.props.resetEmail) &&
                  this.props.resetEmail.FailureCount > 0
            }>
            <Segment stacked>
              <Header as='h2'>{'Register New User'}</Header>
              <Header as='h4'>{'Enter your details below'}</Header>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='User Name'
                required
                name='name'
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                required
                name='email'
                onChange={this.handleChange}
              />
              <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  required
                  name='password'
                  onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Enter your age'
                type="number"
                required
                name='age'
                onChange={this.handleChange}
              />
              { !this.state.disabled ? (
                <Button fluid size='large' disabled={this.state.disabled}>
                    {'Register'}
                </Button>
              ) : <p>{'Processing ...'}</p>}
            </Segment>
          </Form>
          {this.props.error &&  this.renderBottomBarMessage()}
          <br />
          <div>
            <p>Go back and <a href='/login'>Sign in</a></p>
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: async ({
        email,
        name,
        password,
        age
    }) =>
        dispatch(register({
            email,
            name,
            password,
            age
        })) 
  }
}

const mapStateToProps = (state) => ({
  loading: api.getApiLoading(state, 'user.register'),
  apiResult: api.getApiResult(state, 'user.register'),
  error: api.getApiError(state, 'user.register'),
  loggedIn: state.auth.loggedIn,
  token: state.auth.token
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RegisterUser))
