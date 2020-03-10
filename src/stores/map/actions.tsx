import { LatLng, Region } from 'react-native-maps'
import { GeometryCollection, Point  } from 'geojson'
import { mapActionTypes,
        SET_OBS_ZONE,
        CLEAR_OBS_ZONE,
        TOGGLE_CENTERED,
        TOGGLE_MAPTYPE,
        SET_REGION,
        TOGGLE_ZONE,
        CLEAR_REGION,
        } from './types'

export const setRegion = (region: Region) : mapActionTypes => ({
  type: SET_REGION,
  payload: region,
})

export const clearRegion = () :mapActionTypes => ({
  type: CLEAR_REGION
})

export const setObservationZone = ( zone : GeometryCollection ) : mapActionTypes => ({
  type: SET_OBS_ZONE,
  payload: zone
})

export const clearObservationZone = () : mapActionTypes => ({
  type: CLEAR_OBS_ZONE
})

export const toggleCentered = () : mapActionTypes => ({
  type: TOGGLE_CENTERED
})

export const toggleZoomToZone = () : mapActionTypes => ({
  type: TOGGLE_ZONE
})

export const toggleMaptype = () : mapActionTypes => ({
  type: TOGGLE_MAPTYPE
})