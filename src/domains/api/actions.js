import * as AUTH_CONSTANTS from '../auth/constants'
import * as CONSTANTS from './constants'
import axios from 'axios'

/* global localStorage */
/* global fetch */

const { LOADING, RESULT, ERROR, LAST_SUCCESSFUL_RESULT } = CONSTANTS.STATE_TYPES
const API_URL = 'https://api-nodejs-todolist.herokuapp.com/'
const api = (route) => API_URL + route
const IS_LOGGED_IN = 'IS_LOGGED_IN'
const TOKEN = 'TOKEN'

export class AuthenticationError extends Error {}
export class ServerError extends Error {}

export const USER_LOGOUT = (reason) => ({
  type: AUTH_CONSTANTS.USER_LOGOUT,
  reason
})

export const SERVER_ERROR = (error) => ({
  type: CONSTANTS.SERVER_ERROR,
  error
})

export const NETWORK_ERROR = (error) => ({
  type: CONSTANTS.NETWORK_ERROR,
  error
})

export const HIDE_ERROR = (id) => ({
  type: CONSTANTS.HIDE_ERROR,
  id
})

export const HIDE_ALL_ERRORS = () => ({
  type: CONSTANTS.HIDE_ALL_ERRORS
})

export function isLoggedIn () {
  return {
    loggedIn: localStorage.getItem(IS_LOGGED_IN),
    token: localStorage.getItem(TOKEN)
  }
}

export function setLoggedIn (token) {
  localStorage.setItem(IS_LOGGED_IN, true)
  localStorage.setItem(TOKEN, token)
}

export function setLogedOut () {
  localStorage.removeItem(IS_LOGGED_IN)
  localStorage.removeItem(TOKEN)
}

export function postAndUpdate (
  dispatch,
  url,
  body = {},
  type = 'post',
  existingValues = null,
  token = null
) {
  const headers = {
    'Content-Type': 'application/json'
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  } else {
    token = this.isLoggedIn().token
    headers['Authorization'] = `Bearer ${token}`
  }
  return async (dispatch) => {
    const endpoint = url.split('/').join('.')
    dispatch({
      type: CONSTANTS.API_LOADING,
      endpoint
    })
    return axios({
      method: type,
      url: `${API_URL}${url}`,
      headers,
      data: {
        ...body
      }
    })
      .then((result) => {
        dispatch({
          type: CONSTANTS.API_SUCCESS,
          result: result.data || [],
          endpoint
        })
        return result
      })
      .catch((error) => {
        dispatch({
          type: CONSTANTS.API_ERROR,
          error,
          endpoint
        })
      })
  }
}

export function getAndDelete ({
  dispatch,
  url,
  params = {},
  type = 'get',
  token = null,
  details = true,
  queryParams = null
}) {
  const headers = {
    'Content-Type': 'application/json'
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return async (dispatch) => {
    const endpoint = url.split('/').join('.')
    dispatch({
      type: CONSTANTS.API_LOADING,
      endpoint
    })
    let apiUrl = `${API_URL}${url}`
    if (queryParams) apiUrl = `${apiUrl}?completed=${queryParams}`
    return axios({
      method: type,
      url: `${apiUrl}`,
      headers,
      params
    })
      .then((result) => {
        dispatch({
          type: CONSTANTS.API_SUCCESS,
          result: result.data || [],
          endpoint
        })
      })
      .catch((error) => {
        dispatch({
          type: CONSTANTS.API_ERROR,
          error,
          endpoint
        })
      })
  }
}

export function deleteCall ({ url, taskId, existingValues = {} }) {
  const { token } = this.isLoggedIn()
  const headers = {
    'Content-Type': 'application/json'
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return async (dispatch) => {
    const endpoint = url.split('/').join('.')
    dispatch({
      type: CONSTANTS.API_LOADING,
      endpoint
    })
    return axios({
      method: 'delete',
      url: `${API_URL}${url}/${taskId}`,
      headers
    })
      .then((result) => {
        let data = []
        if (existingValues && existingValues.data) {
          data = existingValues.data.filter((val) => val._id !== taskId)
          dispatch({
            type: CONSTANTS.API_SUCCESS,
            result: { count: existingValues.count, data } || {},
            endpoint
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: CONSTANTS.API_ERROR,
          error,
          endpoint
        })
      })
  }
}

export function getApiState (state, endpoint, type) {
  return state.api[`api${endpoint}.${type}`]
}

export function getApiLoading (state, endpoint) {
  return getApiState(state, endpoint, LOADING)
}

export function getApiError (state, endpoint) {
  return getApiState(state, endpoint, ERROR)
}

export function getApiResult (state, endpoint) {
  return getApiState(state, endpoint, RESULT)
}

export function getApiLastSuccessfulResult (state, endpoint) {
  return getApiState(state, endpoint, LAST_SUCCESSFUL_RESULT)
}
