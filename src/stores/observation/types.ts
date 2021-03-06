import { Point } from 'geojson'

export const SET_OBSERVATION = 'SET_OBSERVATION'
export const CLEAR_OBSERVATION = 'CLEAR_OBSERVATION'
export const TOGGLE_OBSERVING = 'TOGGLE_OBSERVING'
export const NEW_OBSERVATION_EVENT ='NEW_OBSERVATION_EVENT'
export const ALL_OBSERVATION_EVENTS = 'ALL_OBSERVATION_EVENTS'
export const REPLACE_OBSERVATION_EVENTS = 'REPLACE_OBSERVATION_EVENTS'
export const REPLACE_LOCATION_BY_ID = 'REPLACE_UNIT_BY_ID'
//export const DELETE_OBSERVATION_BY_ID = 'DELETE_OBSERVATION_BY_ID'
export const CLEAR_OBSERVATION_EVENTS = 'CLEAR_OBSERVATION_EVENTS'
export const SET_SCHEMA_FI ='SET_SCHEMA_FI'
export const SET_SCHEMA_EN ='SET_SCHEMA_EN'
export const SET_SCHEMA_SV ='SET_SCHEMA_SV'
export const SET_OBSERVATION_ID = 'SET_OBSERVATION_ID'
export const CLEAR_OBSERVATION_ID = 'CLEAR_OBSERVATION_ID'

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

interface allObservationEvents {
  type: typeof ALL_OBSERVATION_EVENTS
}

interface replaceObservationEvents {
  type: typeof REPLACE_OBSERVATION_EVENTS
  payload: any[]
}

interface replaceLocationById {
  type: typeof REPLACE_LOCATION_BY_ID
  payload: object
}

/**
interface deleteObservationById {
  type: typeof DELETE_OBSERVATION_BY_ID
  payload: object
}
*/

interface clearObservationEvents {
  type: typeof CLEAR_OBSERVATION_EVENTS
}

interface setSchemaFi {
  type: typeof SET_SCHEMA_FI
  payload: object
}

interface setSchemaEn {
  type: typeof SET_SCHEMA_EN
  payload: object
}

interface setSchemaSv {
  type: typeof SET_SCHEMA_SV
  payload: object
}

interface setObservationId {
  type: typeof SET_OBSERVATION_ID
  payload: object
}

interface clearObservationId {
  type: typeof CLEAR_OBSERVATION_ID
}

export type observationActionTypes = setObservationLocation | 
                                     clearObservationLocation |  
                                     toggleObserving | 
                                     newObservationEvent |
                                     allObservationEvents |
                                     replaceObservationEvents |
                                     replaceLocationById |
                                     //deleteObservationById |
                                     clearObservationEvents |
                                     setSchemaFi |
                                     setSchemaEn |
                                     setSchemaSv |
                                     setObservationId |
                                     clearObservationId
