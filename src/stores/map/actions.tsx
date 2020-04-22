import { Region } from 'react-native-maps'
import { mapActionTypes,
        SET_CURRENT_OBS_ZONE,
        CLEAR_CURRENT_OBS_ZONE,
        SET_OBS_ZONES,
        TOGGLE_CENTERED,
        TOGGLE_MAPTYPE,
        SET_REGION,
        TOGGLE_ZONE,
        CLEAR_REGION,
        SET_EDITING,
        } from './types'

export const setRegion = (region: Region) : mapActionTypes => ({
  type: SET_REGION,
  payload: region,
})

export const clearRegion = () :mapActionTypes => ({
  type: CLEAR_REGION
})

export const setCurrentObservationZone = ( id: string ) : mapActionTypes => ({
  type: SET_CURRENT_OBS_ZONE,
  payload: id
})

export const clearCurrentObservationZone = () : mapActionTypes => ({
  type: CLEAR_CURRENT_OBS_ZONE
})

export const setObservationZones = ( zones : object[] ) : mapActionTypes => ({
  type: SET_OBS_ZONES,
  payload: zones
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

export const setEditing = (editing: boolean[]) : mapActionTypes => ({
  type: SET_EDITING,
  payload: editing
})