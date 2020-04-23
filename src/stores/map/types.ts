import { Region } from 'react-native-maps'

export const SET_REGION = 'SET_REGION'
export const CLEAR_REGION = 'CLEAR_REGION'
export const SET_CURRENT_OBS_ZONE = 'SET_CURRENT_OBS_ZONE'
export const CLEAR_CURRENT_OBS_ZONE = 'CLEAR_CURRENT_OBS_ZONE'
export const SET_OBS_ZONES = 'SET_OBS_ZONES'
export const TOGGLE_CENTERED = 'TOGGLE_CENTERED'
export const TOGGLE_MAPTYPE = 'TOGGLE_MAPTYPE'
export const TOGGLE_ZONE  = 'TOGGLE_ZONE'
export const SET_EDITING = 'SET_EDITING'

interface setRegion {
  type: typeof SET_REGION
  payload: Region
}

interface clearRegion {
  type: typeof CLEAR_REGION
}

interface setCurrentObservationZone {
  type : typeof SET_CURRENT_OBS_ZONE
  payload: string
}

interface clearCurrentObservationZone {
  type: typeof CLEAR_CURRENT_OBS_ZONE
}

interface setObservationZones {
  type: typeof SET_OBS_ZONES
  payload: object[]
}

interface toggleCentered {
  type: typeof TOGGLE_CENTERED
}

interface toggleMaptype {
  type: typeof TOGGLE_MAPTYPE
}

interface toggleZoomToZone {
  type: typeof TOGGLE_ZONE
}

interface setEditing {
  type: typeof SET_EDITING
  payload: boolean[]
}

export type mapActionTypes = setRegion |
                                     clearRegion |
                                     setCurrentObservationZone | 
                                     clearCurrentObservationZone | 
                                     setObservationZones | 
                                     toggleCentered |
                                     toggleMaptype |
                                     toggleZoomToZone |
                                     setEditing
