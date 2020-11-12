import {
    Button,
    Container,
    Form,
    Grid
  } from 'semantic-ui-react'
  import React, { Component } from 'react'
  import { Redirect, withRouter } from 'react-router-dom'
  import { connect } from 'react-redux'
  import { login, getAuthenticatedUser } from '../../../domains/auth/actions'
  import * as api from '../../../domains/api/actions'
  import { AUTHENTICATION_GLOBAL_PARAMS, USER_URL } from '../../url_constants'
  
  class UserDetails extends Component {
    constructor (props) {
      super(props)
      this.state = {}
  
      this.handleChange = this.handleChange.bind(this)
    }
    
    componentDidMount () {
      this.props.getAuthenticatedUser()
    }

    handleChange (e, { name, value }) {
      this.setState({ [name]: value })
    }

    render () {
      if (!this.props.loggedIn) return <Redirect to='/login' />
      return (
        <Grid
          textAlign='center'
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 1200 }}>
            <Container className='m-4'>
              <h1>{'PROFILE'}</h1>
            </Container>
            <Form>
            <Form.Field style={{width: '70%'}}>
                <label style={{textAlign: 'left', paddingLeft: '1rem'}}>Email</label>
                <input placeholder='Email' value={this.props.userList && this.props.userList.email} readOnly={true}/>
            </Form.Field>
            <Form.Field style={{width: '70%'}}>
                <label style={{textAlign: 'left', paddingLeft: '1rem'}}>Name</label>
                <input placeholder='Name' value={this.props.userList && this.props.userList.name} readOnly={true}/>
            </Form.Field>
            <Form.Field style={{width: '70%'}}>
                <label style={{textAlign: 'left', paddingLeft: '1rem'}}>Age</label>
                <input placeholder='Age' value={this.props.userList && this.props.userList.age} readOnly={true}/>
            </Form.Field>
            <Button primary disabled={true}>
              {'Update'}
            </Button>
            <Button disabled={true}>
              {'Cancel'}
            </Button>
            </Form>
          </Grid.Column>
        </Grid>
      )
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {  
        login: (params) => dispatch(login(params)),
        getAuthenticatedUser: () => dispatch(getAuthenticatedUser())
    }
  }
  
  const mapStateToProps = (state) => {
    const { IS_LOGGED_IN, TOKEN } = AUTHENTICATION_GLOBAL_PARAMS
    return {
      loggedIn: state.auth.loggedIn || localStorage.getItem(IS_LOGGED_IN),
      token: state.auth.token || localStorage.getItem(TOKEN),
      loginError: state.auth.loginError,
      loadingUserList: api.getApiLoading(state, USER_URL.USERME),
      userList: api.getApiResult(state, USER_URL.USERME),
      userListError: api.getApiError(state, USER_URL.USERME)
    } 
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(UserDetails))
