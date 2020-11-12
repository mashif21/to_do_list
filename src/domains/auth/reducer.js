import * as CONSTANTS from './constants'
import { produce } from 'immer'

export default function reduce (
  state = {
    loggedIn: false,
    loginError: null,
    registrationError: false
  },
  action
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case CONSTANTS.USER_LOGIN_SUCCESS:
        draft.loggedIn = true
        draft.loginError = null
        draft.token = action.token
        break
      case CONSTANTS.USER_LOGIN_FAIL:
        draft.loggedIn = false
        draft.loginError = action.error
        break
      case CONSTANTS.USER_LOGOUT:
        draft.loggedIn = false
        draft.loginError = null
        draft.token = null
        break
      case CONSTANTS.USER_REGISTER_SUCCESS:
        draft.registered = true
        draft.loggedIn = true
        draft.loginError = null
        draft.registrationError = false
        draft.token = action.token
        break
      case CONSTANTS.USER_REGISTER_FAIL:
        draft.registrationError = true
        draft.loggedIn = false
        draft.registered = false
        break
      default:
        return state
    }
  })
}
