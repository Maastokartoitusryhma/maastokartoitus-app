import { userActionTypes, SET_USER, REMOVE_USER } from './types'

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

export { userReducer }