import { mapActionTypes, 
        SET_OBS_ZONE,
        CLEAR_OBS_ZONE,
        TOGGLE_CENTERED,
        TOGGLE_MAPTYPE,
        SET_REGION,
        TOGGLE_ZONE,
        CLEAR_REGION,
        } from './types'

const initialRegion = { 
  latitude: 60.171, longitude: 24.931, latitudeDelta: 0.25, longitudeDelta: 0.25 
}

const regionReducer = (state = initialRegion, action: mapActionTypes) => {
  switch (action.type) {
    case SET_REGION:
      return action.payload
    case CLEAR_REGION:
      return initialRegion
    default:
      return state
  }
}

const zoneReducer = (state = null, action : mapActionTypes) => {
  switch (action.type) {
    case SET_OBS_ZONE:
      return action.payload
    case CLEAR_OBS_ZONE:
      return null
    default:
      return state
  }
}

const centeringReducer = (state = true, action : mapActionTypes) => {
  switch (action.type) {
    case TOGGLE_CENTERED: 
      const newState = !state
      return newState
    default:
      return state
  }
}

const zoomZoneReducer = (state = true, action: mapActionTypes) => {
  switch (action.type) {
    case TOGGLE_ZONE: 
      const newState = !state
      return newState
    default:
      return state
  }  
}

const maptypeReducer = (state: 'topographic' | 'satellite' = 'topographic', action : mapActionTypes) => {
  switch (action.type) {
    case TOGGLE_MAPTYPE: 
      const newState = state === 'topographic' ? 'satellite' : 'topographic'
      return newState
    default:
      return state
  } 
}

export { 
  regionReducer, 
  zoneReducer, 
  centeringReducer, 
  maptypeReducer,
}