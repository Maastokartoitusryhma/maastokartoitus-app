import { Point } from 'geojson'

export const SET_OBSERVATION = 'SET_OBSERVATION'
export const CLEAR_OBSERVATION = 'CLEAR_OBSERVATION'
export const TOGGLE_OBSERVING = 'TOGGLE_OBSERVING'
export const NEW_OBSERVATION_EVENT ='NEW_OBSERVATION_EVENT'
export const SET_SCHEMA ='SET_SCHEMA'

interface setObservationLocation {
  type: typeof SET_OBSERVATION
  payload: Point | null
}

interface clearObservationLocation {
  type: typeof CLEAR_OBSERVATION
}

interface toggleObserving {
  type: typeof TOGGLE_OBSERVING
}

interface newObservationEvent {
  type: typeof NEW_OBSERVATION_EVENT
  payload: object
}

interface setSchema {
  type: typeof SET_SCHEMA
  payload: object
}

export type observationActionTypes = setObservationLocation | 
                                     clearObservationLocation |  
                                     toggleObserving | 
                                     newObservationEvent |
                                     setSchema
