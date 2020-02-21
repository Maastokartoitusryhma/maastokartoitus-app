import { LatLng } from 'react-native-maps'
import { GeometryCollection } from 'geojson'

export const SET_OBSERVATION = 'SET_OBSERVATION'
export const CLEAR_OBSERVATION = 'CLEAR_OBSERVATION'
export const SET_OBS_ZONE = 'SET_OBS_ZONE'
export const CLEAR_OBS_ZONE = 'CLEAR_OBS_ZONE'
export const START_OBSERVING = 'START_OBSERVING'
export const STOP_OBSERVING = 'STOP_OBSERVING'

interface setObservationLocation {
  type: typeof SET_OBSERVATION
  payload: LatLng | null
}

interface clearObservationLocation {
  type: typeof CLEAR_OBSERVATION
}

interface setObservationZone {
  type : typeof SET_OBS_ZONE
  payload: GeometryCollection
}

interface clearObservationZone {
  type: typeof CLEAR_OBS_ZONE
}

interface startObserving {
  type : typeof START_OBSERVING
}

interface stopObserving {
  type : typeof STOP_OBSERVING
}

export type observationActionTypes = setObservationLocation | clearObservationLocation | setObservationZone | clearObservationZone | startObserving | stopObserving