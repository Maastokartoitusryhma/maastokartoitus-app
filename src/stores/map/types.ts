import { LatLng, Region } from 'react-native-maps'
import { GeometryCollection, Point } from 'geojson'

export const SET_REGION = 'SET_REGION'
export const CLEAR_REGION = 'CLEAR_REGION'
export const SET_OBS_ZONE = 'SET_OBS_ZONE'
export const CLEAR_OBS_ZONE = 'CLEAR_OBS_ZONE'
export const TOGGLE_CENTERED = 'TOGGLE_CENTERED'
export const TOGGLE_MAPTYPE = 'TOGGLE_MAPTYPE'
export const TOGGLE_ZONE  = 'TOGLE_ZONE'

interface setRegion {
  type: typeof SET_REGION
  payload: Region
}

interface clearRegion {
  type: typeof CLEAR_REGION
}

interface setObservationZone {
  type : typeof SET_OBS_ZONE
  payload: GeometryCollection
}

interface clearObservationZone {
  type: typeof CLEAR_OBS_ZONE
}

interface toggleCentered {
  type: typeof TOGGLE_CENTERED
}

interface toggleMaptype {
  type: typeof TOGGLE_MAPTYPE
}

interface toggleZoomToZone {
  type: typeof TOGGLE_ZONE
}

export type mapActionTypes = setRegion |
                                     clearRegion |
                                     setObservationZone | 
                                     clearObservationZone | 
                                     toggleCentered |
                                     toggleMaptype |
                                     toggleZoomToZone
