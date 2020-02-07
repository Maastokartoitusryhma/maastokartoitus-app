import { combineReducers } from 'redux'
import { locationActionTypes, 
         UPDATE_LOCATION,
         APPEND_PATH
        } from './types'


const locationReducer = (state = null, action : locationActionTypes) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return action.payload
    default:
      return state
  }
}

const pathReducer = (state = [], action : locationActionTypes) => {
  switch (action.type) {
    case APPEND_PATH:
      return [...action.payload, ...state]
    default:
      return state
  }
}

export default combineReducers({
  location: locationReducer,
  path: pathReducer,
})