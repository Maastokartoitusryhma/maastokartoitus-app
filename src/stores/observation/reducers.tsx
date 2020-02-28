import { observationActionTypes, 
        SET_OBSERVATION,
        CLEAR_OBSERVATION,
        SET_OBS_ZONE,
        CLEAR_OBS_ZONE,
        TOGGLE_OBSERVING,
        TOGGLE_CENTERED,
        TOGGLE_MAPTYPE,
        NEW_OBSERVATION_EVENT,
        SET_REGION,
        CLEAR_REGION,
        SET_SCHEMA
        } from './types'

const initialRegion = { 
  latitude: 60.171, longitude: 24.931, latitudeDelta: 0.25, longitudeDelta: 0.25 
}

const regionReducer = (state = initialRegion, action: observationActionTypes) => {
  switch (action.type) {
    case SET_REGION:
      return action.payload
    case CLEAR_REGION:
      return initialRegion
    default:
      return state
  }
}

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

const zoneReducer = (state = null, action : observationActionTypes) => {
  switch (action.type) {
    case SET_OBS_ZONE:
      return action.payload
    case CLEAR_OBS_ZONE:
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

const centeringReducer = (state = true, action : observationActionTypes) => {
  switch (action.type) {
    case TOGGLE_CENTERED: 
      const newState = !state
      return newState
    default:
      return state
  }
}

const maptypeReducer = (state: 'topographic' | 'satellite' = 'topographic', action : observationActionTypes) => {
  switch (action.type) {
    case TOGGLE_MAPTYPE: 
      const newState = state === 'topographic' ? 'satellite' : 'topographic'
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
  regionReducer, 
  observationReducer, 
  zoneReducer, 
  observingReducer, 
  centeringReducer, 
  maptypeReducer,
  observationEventsReducer,
  schemaReducer }