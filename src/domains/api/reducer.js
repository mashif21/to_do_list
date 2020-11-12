import * as CONSTANTS from './constants'
const { LOADING, RESULT, ERROR, LAST_SUCCESSFUL_RESULT } = CONSTANTS.STATE_TYPES

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.API_LOADING:
      return {
        ...state,
        [`api${action.endpoint}.${LOADING}`]: true
      }
    case CONSTANTS.API_ERROR:
      return {
        ...state,
        [`api${action.endpoint}.${RESULT}`]: null,
        [`api${action.endpoint}.${ERROR}`]: action.error,
        [`api${action.endpoint}.${LOADING}`]: false
      }
    case CONSTANTS.API_SUCCESS:
      return {
        ...state,
        [`api${action.endpoint}.${LAST_SUCCESSFUL_RESULT}`]: action.result,
        [`api${action.endpoint}.${RESULT}`]: action.result,
        [`api${action.endpoint}.${ERROR}`]: null,
        [`api${action.endpoint}.${LOADING}`]: false
      }
    case CONSTANTS.API_CLEAR:
      return {
        ...state,
        [`api${action.endpoint}.${LAST_SUCCESSFUL_RESULT}`]: null,
        [`api${action.endpoint}.${RESULT}`]: null,
        [`api${action.endpoint}.${ERROR}`]: null,
        [`api${action.endpoint}.${LOADING}`]: false
      }
    default:
      return state
  }
}

export default reducer