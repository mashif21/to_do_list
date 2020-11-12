import * as api from '../domains/api/actions'

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
import { withRouter } from 'react-router-dom'

class ResetPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      disabled: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e, { name, value }) {
    this.setState({ [name]: value, disabled: false })
  }

  handleSubmit () {
    this.setState({ disabled: true })
  }

  renderBottomBarMessage (from) {
    if (this.state.disabled) {
      this.setState({ disabled: false })
    }
    if (from === 1) {
      return (
        <Message
          error
          header='Not a Valid Email'
          content='Sorry unable to process your request'
        />
      )
    } else {
      return (
        <Message
          success
          header=''
          content='Thanks! If your account is found in our system, you will receive an email with instructions to set a new password.'
        />
      )
    }
  }

  render () {
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
              <Header as='h2'>{'Reset your password'}</Header>
              <Header as='h4'>{'Enter your email and you will be back on track in no time'}</Header>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                required
                name='email'
                onChange={this.handleChange}
              />
              { !this.state.disabled ? (
                <Button fluid size='large' disabled={this.state.disabled}>
                    Send Email
                </Button>
              ) : <p>{'Sending Email ...'}</p>}
            </Segment>
          </Form>
          {this.props.error && this.renderBottomBarMessage(1)}
          {!_.isEmpty(this.props.resetEmail) && this.renderBottomBarMessage(2)}
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
  }
}

const mapStateToProps = (state) => ({
  loading: api.getApiLoading(state, 'auth.resetPasswordEmail'),
  resetEmail: api.getApiResult(state, 'auth.resetPasswordEmail'),
  error: api.getApiError(state, 'auth.resetPasswordEmail'),
  loggedIn: state.auth.loggedIn
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetPassword))
