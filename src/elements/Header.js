import * as api from '../domains/api/actions'

import React, { Component } from 'react'

import { Button } from 'semantic-ui-react'
import PrimaryMenu from '../elements/PrimaryMenu.js'
import { connect } from 'react-redux'
import { logout } from '../domains/auth/actions'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getAuthenticatedUser } from '../domains/auth/actions'

const HeaderContainer = styled.div.attrs({
  className: 'header-container'
})`
  padding-top: 10px;
  position: relative;
  margin-bottom: 20px;
`

const BrandingContainer = styled.div.attrs({
  className: 'branding-container'
})`
  margin-top: 10px;

  a {
    display: block;
    height: 30px;
    background-size: contain;
    text-indent: -9999px;
  }
`

const UserActionsContainer = styled.div.attrs({
  className: 'user-actions-container'
})`
  display: block;
  position: absolute;
  right: 0;
  top: 20px;

  .ui.button {
    margin-right: 0;
    margin-left: 20px;
  }
`

class Header extends Component {
  render () {
    return (
      <HeaderContainer>
        <BrandingContainer>
          <a href='/'>To Do List</a>
        </BrandingContainer>
        <UserActionsContainer>
          <span>
            Hello, <i><Link to={'/user/details'}>{this.props.loggedIn ? `${this.props.authUser.name}` : ''}</Link></i>
          </span>
          <Button icon='sign-out' size='mini' onClick={this.props.logout} />
        </UserActionsContainer>
        <PrimaryMenu {...this.props} />
      </HeaderContainer>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    getAuthenticatedUser: () => dispatch(getAuthenticatedUser())
  }
}

const mapStateToProps = (state) => {
  return  {
    authUser: api.getApiResult(state, 'user.me') || {},
    loggedIn: state.auth.loggedIn || localStorage.getItem('IS_LOGGED_IN'),
    token: state.auth.token || localStorage.getItem('TOKEN')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
