import { Point } from 'geojson'

export const SET_OBSERVATION = 'SET_OBSERVATION'
export const CLEAR_OBSERVATION = 'CLEAR_OBSERVATION'
export const ADD_TO_LOCATIONS = 'ADD_TO_LOCATIONS'
export const REMOVE_FROM_LOCATIONS = 'REMOVE_FROM_LOCATIONS'
export const CLEAR_LOCATIONS = 'CLEAR_LOCATIONS'
export const TOGGLE_OBSERVING = 'TOGGLE_OBSERVING'
export const NEW_OBSERVATION_EVENT ='NEW_OBSERVATION_EVENT'
export const ALL_OBSERVATION_EVENTS = 'ALL_OBSERVATION_EVENTS'
export const REPLACE_OBSERVATION_EVENTS = 'REPLACE_OBSERVATION_EVENTS'
export const SET_SCHEMA ='SET_SCHEMA'

interface setObservationLocation {
  type: typeof SET_OBSERVATION
  payload: Point | null
}

interface clearObservationLocation {
  type: typeof CLEAR_OBSERVATION
}

interface addToObservationLocations {
  type: typeof ADD_TO_LOCATIONS
  payload: Point | null
}

interface removeFromObservationLocations {
  type: typeof REMOVE_FROM_LOCATIONS
  payload: Point | null
}

interface clearObservationLocations {
  type: typeof CLEAR_LOCATIONS
}

interface toggleObserving {
  type: typeof TOGGLE_OBSERVING
}

interface newObservationEvent {
  type: typeof NEW_OBSERVATION_EVENT
  payload: object
}

interface allObservationEvents {
  type: typeof ALL_OBSERVATION_EVENTS
}

interface replaceObservationEvents {
  type: typeof REPLACE_OBSERVATION_EVENTS
  payload: any[]
}

interface setSchema {
  type: typeof SET_SCHEMA
  payload: object
}

export type observationActionTypes = setObservationLocation | 
                                     clearObservationLocation |  
                                     addToObservationLocations |
                                     removeFromObservationLocations |
                                     clearObservationLocations |
                                     toggleObserving | 
                                     newObservationEvent |
                                     allObservationEvents |
                                     replaceObservationEvents |
                                     setSchema
