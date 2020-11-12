import api from './domains/api/reducer'
import auth from './domains/auth/reducer'
import { combineReducers } from 'redux'

export const reducers = combineReducers({
  api,
  auth
})