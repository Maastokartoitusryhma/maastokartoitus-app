import { observationActionTypes, 
        SET_OBSERVATION,
        CLEAR_OBSERVATION,
        TOGGLE_OBSERVING,
        NEW_OBSERVATION_EVENT,
        ALL_OBSERVATION_EVENTS,
        SET_SCHEMA_FI,
        SET_SCHEMA_EN,
        SET_SCHEMA_SV,
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

const schemaFiReducer = (state = null, action : observationActionTypes) => {
  switch (action.type) {
    case SET_SCHEMA_FI:
      return action.payload
    default:
      return state
  }
}

const schemaEnReducer = (state = null, action : observationActionTypes) => {
  switch (action.type) {
    case SET_SCHEMA_EN:
      return action.payload
    default:
      return state
  }
}

const schemaSvReducer = (state = null, action : observationActionTypes) => {
  switch (action.type) {
    case SET_SCHEMA_SV:
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
  observingReducer, 
  observationEventsReducer,
  schemaFiReducer,
  schemaEnReducer,
  schemaSvReducer,
  observationIdReducer, 
}