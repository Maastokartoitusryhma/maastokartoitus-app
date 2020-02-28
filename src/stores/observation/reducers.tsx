import { observationActionTypes, 
        SET_OBSERVATION,
        CLEAR_OBSERVATION,
        TOGGLE_OBSERVING,
        NEW_OBSERVATION_EVENT,
        SET_SCHEMA
        } from './types'

const observationReducer = (state = null, action : observationActionTypes) => {
  switch (action.type) {
    case SET_OBSERVATION:
      return action.payload
    case CLEAR_OBSERVATION:
      return null
    default:
      return state
  }
}

const observingReducer = (state = false, action : observationActionTypes) => {
  switch (action.type) {
    case TOGGLE_OBSERVING:
      const newState = !state
      return newState
    default:
      return state
  }
}

const observationEventsReducer = (state: any[] = [], action : observationActionTypes) => {
  switch (action.type) {
    case NEW_OBSERVATION_EVENT:
      return [...state, action.payload]
    default:
      return state
  }
}

const schemaReducer = (state : object = {}, action : observationActionTypes) => {
  switch (action.type) {
    case SET_SCHEMA:
      return action.payload
    default: 
      return state
  }
}

export { 
  observationReducer, 
  observingReducer, 
  observationEventsReducer,
  schemaReducer 
}