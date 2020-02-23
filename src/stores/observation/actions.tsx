import { LatLng } from 'react-native-maps'
import { GeometryCollection } from 'geojson'
import { observationActionTypes,
        SET_OBSERVATION,
        CLEAR_OBSERVATION,
        SET_OBS_ZONE,
        CLEAR_OBS_ZONE,
        TOGGLE_OBSERVING,
        TOGGLE_CENTERED,
        TOGGLE_MAPTYPE,
        NEW_OBSERVATION_EVENT
        } from './types'

export const setObservationLocation = (location : LatLng | null) : observationActionTypes => ({
  type: SET_OBSERVATION,
  payload: location,
})

export const clearObservationLocation = () : observationActionTypes => ({
  type: CLEAR_OBSERVATION
})

export const setObservationZone = ( zone : GeometryCollection ) : observationActionTypes => ({
  type: SET_OBS_ZONE,
  payload: zone
})

export const clearObservationZone = () : observationActionTypes => ({
  type: CLEAR_OBS_ZONE
})

export const toggleObserving = () : observationActionTypes => ({
  type: TOGGLE_OBSERVING
})

export const toggleCentered = () : observationActionTypes => ({
  type: TOGGLE_CENTERED
})

export const toggleMaptype = () : observationActionTypes => ({
  type: TOGGLE_MAPTYPE
})

export const newObservationEvent = (observation : object) : observationActionTypes => ({
  type: NEW_OBSERVATION_EVENT,
  payload: observation
})