import * as CONSTANTS from './constants'
import * as api from '../api/actions'

const SESSION_ROUTES = {
  login: 'user/login',
  register: 'user/register',
  logout: 'user/logout',
  user_data: 'user/me'
}

export const USER_LOGIN_SUCCESS = ({
  token
}) => ({
  type: CONSTANTS.USER_LOGIN_SUCCESS,
  token
})

export const USER_LOGIN_FAIL = (error = null) => ({
  type: CONSTANTS.USER_LOGIN_FAIL,
  error: error || true
})

export const USER_LOGOUT = () => ({
  type: CONSTANTS.USER_LOGOUT,
  token: null
})

export const USER_REGISTER_SUCCESS = ({
  token
}) => ({
  type: CONSTANTS.USER_REGISTER_SUCCESS,
  token
})

export const USER_REGISTER_FAIL = () => ({
  type: CONSTANTS.USER_REGISTER_FAIL
})

export const login = (args) => {
  return (dispatch) => {
    return dispatch(api
      .postAndUpdate(dispatch, SESSION_ROUTES['login'], args))
      .then((result) => {
        if (result && result.data) {
          api.setLoggedIn(result.data.token)
          dispatch(USER_LOGIN_SUCCESS(result.data))
        } else {
          dispatch(USER_LOGIN_FAIL())
        }  
      })
      .catch((err) => {
        dispatch(USER_LOGIN_FAIL(err))
      })
  }
}

export const register = (args) => {
  return (dispatch) => {
    return dispatch(
        api.postAndUpdate(dispatch, SESSION_ROUTES['register'], args)
      )
      .then((result) => {
        if (result && result.data) {
          api.setLoggedIn(result.data.token)
          dispatch(USER_REGISTER_SUCCESS(result.data))
        } else {
          dispatch(USER_REGISTER_FAIL())
        }
      })
      .catch((err) => {
        dispatch(USER_REGISTER_FAIL(err))
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    return dispatch(api.postAndUpdate(
      dispatch, 
      SESSION_ROUTES['logout']
    )).then(() => {
      api.setLogedOut()
      dispatch(USER_LOGOUT())
    })
  }
}

export const getAuthenticatedUser = () => {
  const { loggedIn, token } = api.isLoggedIn()
  if (loggedIn && token) {
    return async (dispatch) => {
      if (loggedIn && token) {
        return dispatch(api.getAndDelete({
          dispatch, 
          url: SESSION_ROUTES['user_data'],
          token
        }))
      }
    }
  } else return {type: ''}
}