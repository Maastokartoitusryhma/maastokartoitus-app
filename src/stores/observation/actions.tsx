import { LatLng, Region } from 'react-native-maps'
import { GeometryCollection, Point  } from 'geojson'
import { observationActionTypes,
        SET_OBSERVATION,
        CLEAR_OBSERVATION,
        TOGGLE_OBSERVING,
        NEW_OBSERVATION_EVENT,
        SET_SCHEMA
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

export const setSchema = (schema : object) : observationActionTypes => ({
  type: SET_SCHEMA,
  payload: schema
})