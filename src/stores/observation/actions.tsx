import { LatLng, Region } from 'react-native-maps'
import { GeometryCollection, Point  } from 'geojson'
import { observationActionTypes,
        SET_OBSERVATION,
        CLEAR_OBSERVATION,
        ADD_TO_LOCATIONS,
        REMOVE_FROM_LOCATIONS,
        CLEAR_LOCATIONS,
        TOGGLE_OBSERVING,
        NEW_OBSERVATION_EVENT,
        ALL_OBSERVATION_EVENTS,
        SET_SCHEMA_FI,
        SET_SCHEMA_EN,
        SET_SCHEMA_SV,
        REPLACE_OBSERVATION_EVENTS,
        CLEAR_OBSERVATION_EVENTS,
        SET_OBSERVATION_ID,
        CLEAR_OBSERVATION_ID,
        } from './types'

export const setObservationLocation = (point : Point | null) : observationActionTypes => ({
  type: SET_OBSERVATION,
  payload: point,
})

export const clearObservationLocation = () : observationActionTypes => ({
  type: CLEAR_OBSERVATION
})

export const toggleObserving = () : observationActionTypes => ({
  type: TOGGLE_OBSERVING
})

export const newObservationEvent = (observation : object) : observationActionTypes => ({
  type: NEW_OBSERVATION_EVENT,
  payload: observation
})

export const allObservationEvents = () : observationActionTypes => ({
  type: ALL_OBSERVATION_EVENTS
})

export const replaceObservationEvents = (events: any[]) : observationActionTypes => ({
  type: REPLACE_OBSERVATION_EVENTS,
  payload: events
})

export const clearObservationEvents = () : observationActionTypes => ({
  type: CLEAR_OBSERVATION_EVENTS
})

export const setSchemaFi = (schema : object) : observationActionTypes => ({
  type: SET_SCHEMA_FI,
  payload: schema
})

export const setSchemaEn = (schema : object) : observationActionTypes => ({
  type: SET_SCHEMA_EN,
  payload: schema
})

export const setSchemaSv = (schema : object) : observationActionTypes => ({
  type: SET_SCHEMA_SV,
  payload: schema
})

export const setObservationId = (id : object) : observationActionTypes => ({
  type: SET_OBSERVATION_ID,
  payload: id
})

export const clearObservationId = () : observationActionTypes => ({
  type: CLEAR_OBSERVATION_ID
})