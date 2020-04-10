import {
  userActionTypes,
  SET_USER,
  REMOVE_USER,
  GET_PERSON_TOKEN,
  SET_PERSON_TOKEN,
  CLEAR_PERSON_TOKEN } from './types'

const userReducer = (state = null, action: userActionTypes) => {
  switch (action.type) {
    case SET_USER:
      return action.payload
    case REMOVE_USER:
      return null
    default:
      return state
  }
}

const tokenReducer = (state = '', action: userActionTypes) => {
  switch (action.type) {
    case GET_PERSON_TOKEN:
      return state
    case SET_PERSON_TOKEN:
      return action.payload
    case CLEAR_PERSON_TOKEN:
      return ''
    default:
      return state
  }
}

export { userReducer, tokenReducer }
