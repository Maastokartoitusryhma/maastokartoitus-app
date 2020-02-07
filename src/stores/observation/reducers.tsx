import { observationActionTypes, 
        SET_OBSERVATION,
        CLEAR_OBSERVATION,
        SET_OBS_ZONE,
        CLEAR_OBS_ZONE,
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

const zoneReducer = (state = [], action : observationActionTypes) => {
  switch (action.type) {
    case SET_OBS_ZONE:
      return action.payload
    case CLEAR_OBS_ZONE:
      return []
    default:
      return state
  }
}

export { observationReducer, zoneReducer }