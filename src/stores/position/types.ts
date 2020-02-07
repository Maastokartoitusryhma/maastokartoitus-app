import { LocationData } from 'expo-location'

export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const APPEND_PATH = 'APPEND_PATH'

interface updateLocation {
  type: typeof UPDATE_LOCATION
  payload: LocationData | null
}

interface appendPath {
  type : typeof APPEND_PATH
  payload: LocationData[]
}

export type locationActionTypes = updateLocation | appendPath