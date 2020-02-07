import { LatLng } from 'react-native-maps'
import { observationActionTypes,
        SET_OBSERVATION,
        CLEAR_OBSERVATION,
        SET_OBS_ZONE,
        CLEAR_OBS_ZONE
        } from './types'

export const setObservationLocation = (location : LatLng | null) : observationActionTypes => ({
  type: SET_OBSERVATION,
  payload: location,
})

export const clearObservationLocation = () : observationActionTypes => ({
  type: CLEAR_OBSERVATION
})

export const setObservationZone = ( polygon : LatLng[] ) : observationActionTypes => ({
  type: SET_OBS_ZONE,
  payload: polygon
})

export const clearObservationZone = () : observationActionTypes => ({
  type: CLEAR_OBS_ZONE
})