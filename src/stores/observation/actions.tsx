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
        SET_SCHEMA,
        REPLACE_OBSERVATION_EVENTS,
        CLEAR_OBSERVATION_EVENTS
        } from './types'

export const setObservationLocation = (point : Point | null) : observationActionTypes => ({
  type: SET_OBSERVATION,
  payload: point,
})

export const clearObservationLocation = () : observationActionTypes => ({
  type: CLEAR_OBSERVATION
})

export const addToObservationLocations = (point : Point | null) : observationActionTypes => ({
  type: ADD_TO_LOCATIONS,
  payload: point
})

export const removeFromObservationLocations = (point: Point | null ) : observationActionTypes => ({
  type: REMOVE_FROM_LOCATIONS,
  payload: point
})

export const clearObservationLocations = () : observationActionTypes => ({
  type: CLEAR_LOCATIONS
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

export const setSchema = (schema : object) : observationActionTypes => ({
  type: SET_SCHEMA,
  payload: schema
})