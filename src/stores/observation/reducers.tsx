import { observationActionTypes, 
        SET_OBSERVATION,
        CLEAR_OBSERVATION,
        SET_OBS_ZONE,
        CLEAR_OBS_ZONE,
        TOGGLE_OBSERVING,
        TOGGLE_CENTERED,
        TOGGLE_MAPTYPE,
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

export { observationReducer, zoneReducer, observingReducer, centeringReducer, maptypeReducer }