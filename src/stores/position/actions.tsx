import { LocationData } from 'expo-location'
import { UPDATE_LOCATION, APPEND_PATH, locationActionTypes } from './types'

export const updateLocation = ( location : LocationData | null ) : locationActionTypes => ({
  type: UPDATE_LOCATION,
  payload: location,
})

export const appendPath = ( locations : LocationData[] ) : locationActionTypes => ({
  type: APPEND_PATH,
  payload: locations
})