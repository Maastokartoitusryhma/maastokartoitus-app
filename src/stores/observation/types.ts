import { LatLng, Region } from 'react-native-maps'
import { GeometryCollection, Point } from 'geojson'

export const SET_REGION = 'SET_REGION'
export const CLEAR_REGION = 'CLEAR_REGION'
export const SET_OBSERVATION = 'SET_OBSERVATION'
export const CLEAR_OBSERVATION = 'CLEAR_OBSERVATION'
export const SET_OBS_ZONE = 'SET_OBS_ZONE'
export const CLEAR_OBS_ZONE = 'CLEAR_OBS_ZONE'
export const TOGGLE_OBSERVING = 'TOGGLE_OBSERVING'
export const TOGGLE_CENTERED = 'TOGGLE_CENTERED'
export const TOGGLE_MAPTYPE = 'TOGGLE_MAPTYPE'
export const NEW_OBSERVATION_EVENT ='NEW_OBSERVATION_EVENT'
export const SET_SCHEMA ='SET_SCHEMA'

interface setRegion {
  type: typeof SET_REGION
  payload: Region
}

interface clearRegion {
  type: typeof CLEAR_REGION
}

interface setObservationLocation {
  type: typeof SET_OBSERVATION
  payload: Point | null
}

interface clearObservationLocation {
  type: typeof CLEAR_OBSERVATION
}

interface setObservationZone {
  type : typeof SET_OBS_ZONE
  payload: GeometryCollection
}

interface clearObservationZone {
  type: typeof CLEAR_OBS_ZONE
}

interface toggleObserving {
  type: typeof TOGGLE_OBSERVING
}

interface toggleCentered {
  type: typeof TOGGLE_CENTERED
}

interface toggleMaptype {
  type: typeof TOGGLE_MAPTYPE
}

interface newObservationEvent {
  type: typeof NEW_OBSERVATION_EVENT
  payload: object
}

interface setSchema {
  type: typeof SET_SCHEMA
  payload: object
}

export type observationActionTypes = setRegion |
                                     clearRegion |
                                     setObservationLocation | 
                                     clearObservationLocation | 
                                     setObservationZone | 
                                     clearObservationZone | 
                                     toggleObserving | 
                                     toggleCentered |
                                     toggleMaptype |
                                     newObservationEvent |
                                     setSchema
