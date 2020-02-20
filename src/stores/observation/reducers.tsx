import { observationActionTypes, 
        SET_OBSERVATION,
        CLEAR_OBSERVATION,
        SET_OBS_ZONE,
        CLEAR_OBS_ZONE,
        START_OBSERVING,
        STOP_OBSERVING,
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

const observingReducer = (state = false, action : observationActionTypes) => {
  switch (action.type) {
    case START_OBSERVING:
      return true
    case STOP_OBSERVING:
      return false
    default:
      return state
  }
}
export { observationReducer, zoneReducer, observingReducer }