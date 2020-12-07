import {
    Button,
    Container,
    Form,
    Grid,
    Image,
    Message,
    Segment
  } from 'semantic-ui-react'
  import React, { Component } from 'react'
  import { Redirect, withRouter } from 'react-router-dom'
  
  import { connect } from 'react-redux'
  import { login } from '../domains/auth/actions'
  
  class Login extends Component {
    constructor (props) {
      super(props)
      this.state = {
        email: '',
        password: ''
      }
  
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleChange (e, { name, value }) {
      this.setState({ [name]: value })
    }
  
    handleSubmit () {
      this.props.login(this.state)
    }

    render () {
      if (this.props.loggedIn) {
        return <Redirect to='/task' />
      }
      return (
        <Grid
          textAlign='center'
          style={{ height: '100vh' }}
          verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Container className='m-4'>
              <Image src='/img/northone.png' size='medium' centered />
            </Container>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
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
                <Button fluid size='large'>
                  {'Login'}
                </Button>
              </Segment>
            </Form>
            <div>
              <br />
              <a href='/register'>{'Create New User'}</a>
            </div>
            <div>
              <br />
              <a href='/reset'>{'Forgot Password'}</a>
            </div>
            {this.props.loginError ? (
              <Message
                error
                header='Authentication Error'
                content='Wrong username and/or password'
              />
            ) : null}
          </Grid.Column>
        </Grid>
      )
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      login: (params) => dispatch(login(params))
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      loggedIn: state.auth.loggedIn || localStorage.getItem('IS_LOGGED_IN'),
      loginError: state.auth.loginError,
      token: state.auth.token || localStorage.getItem('TOKEN')
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Login))
  