import { LatLng, Region } from 'react-native-maps'
import { GeometryCollection, Point  } from 'geojson'
import { observationActionTypes,
        SET_OBSERVATION,
        CLEAR_OBSERVATION,
        SET_OBS_ZONE,
        CLEAR_OBS_ZONE,
        TOGGLE_OBSERVING,
        TOGGLE_CENTERED,
        TOGGLE_MAPTYPE,
        NEW_OBSERVATION_EVENT,
        SET_REGION,
        CLEAR_REGION
        } from './types'

export const setRegion = (region: Region) : observationActionTypes => ({
  type: SET_REGION,
  payload: region,
})

export const clearRegion = () :observationActionTypes => ({
  type: CLEAR_REGION
})

export const setObservationLocation = (point : Point | null) : observationActionTypes => ({
  type: SET_OBSERVATION,
  payload: point,
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