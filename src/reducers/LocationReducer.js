import { combineReducers } from 'redux'

const locationReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return action.data
    default:
      return state
  }
}

const pathReducer = (state = [], action) => {
  switch (action.type) {
    case 'APPEND_PATH':
      return [...action.data, ...state]
    default:
      return state
  }
}

export default combineReducers({
  location: locationReducer,
  path: pathReducer,
})