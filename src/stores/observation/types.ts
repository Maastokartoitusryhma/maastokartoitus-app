import { LatLng } from 'react-native-maps'

export const SET_OBSERVATION = 'SET_OBSERVATION'
export const CLEAR_OBSERVATION = 'CLEAR_OBSERVATION'
export const SET_OBS_ZONE = 'SET_OBS_ZONE'
export const CLEAR_OBS_ZONE = 'CLEAR_OBS_ZONE'

interface setObservationLocation {
  type: typeof SET_OBSERVATION
  payload: LatLng | null
}

interface clearObservationLocation {
  type: typeof CLEAR_OBSERVATION
}

interface setObservationZone {
  type : typeof SET_OBS_ZONE
  payload: LatLng[]
}

interface clearObservationZone {
  type: typeof CLEAR_OBS_ZONE
}

export type observationActionTypes = setObservationLocation | clearObservationLocation | setObservationZone | clearObservationZone