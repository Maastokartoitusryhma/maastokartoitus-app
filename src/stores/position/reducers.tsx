import { locationActionTypes, 
         UPDATE_LOCATION,
         APPEND_PATH
        } from './types'


const positionReducer = (state = null, action : locationActionTypes) => {
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
      if (action.payload.length === 1) {
        return [...action.payload, ...state]
      }
      const path = action.payload.reverse()

      return [...path, ...state]
    default:
      return state
  }
}

export { positionReducer, pathReducer }