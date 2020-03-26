import { observationActionTypes, 
        SET_OBSERVATION,
        CLEAR_OBSERVATION,
        ADD_TO_LOCATIONS,
        REMOVE_FROM_LOCATIONS,
        TOGGLE_OBSERVING,
        NEW_OBSERVATION_EVENT,
        ALL_OBSERVATION_EVENTS,
        SET_SCHEMA,
        CLEAR_LOCATIONS,
        REPLACE_OBSERVATION_EVENTS,
        CLEAR_OBSERVATION_EVENTS,
        SET_OBSERVATION_ID,
        CLEAR_OBSERVATION_ID
        } from './types'
import { Point } from 'geojson'

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

const observationLocationsReducer = (state: Point[] = [], action : observationActionTypes) => {
  switch (action.type) {
    case ADD_TO_LOCATIONS:
      const newState = [...state, action.payload]
      return newState
    case REMOVE_FROM_LOCATIONS:
      const filteredState = state.filter(p => p !== action.payload)
      return filteredState
      case CLEAR_LOCATIONS:
      return []
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
      const newState = [...state, action.payload]
      return newState
    case ALL_OBSERVATION_EVENTS:
      return state
    case REPLACE_OBSERVATION_EVENTS:
      return action.payload
    case CLEAR_OBSERVATION_EVENTS:
      return []
    default:
      return state
  }
}

const schemaReducer = (state = null, action : observationActionTypes) => {
  switch (action.type) {
    case SET_SCHEMA:
      return action.payload
    default: 
      return state
  }
}

const observationIdReducer = (state = null, action : observationActionTypes) => {
  switch (action.type) {
    case SET_OBSERVATION_ID:
      return action.payload
    case CLEAR_OBSERVATION_ID:
      return null
    default:
      return state
  }
}

export { 
  observationReducer, 
  observationLocationsReducer,
  observingReducer, 
  observationEventsReducer,
  schemaReducer,
  observationIdReducer, 
}