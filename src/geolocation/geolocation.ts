import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import Colors from '../styles/Colors'
import { Platform } from 'react-native'
import { LOCATION_BACKGROUND_TASK } from '../constants/tasks'
import { LocationData } from 'expo-location'

const watchLocationAsync = async (updateLocation : (location: LocationData | null) => void, appendPath: (path: LocationData[]) => void) => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION)

  if (status !== 'granted') {
    updateLocation(null)
  }
  
  if (Platform.OS === 'ios') {
    await watchLocationAsynciOS(updateLocation, appendPath)
  } else {
    await watchLocationAsyncAndroid()
  }
}

const watchLocationAsyncAndroid = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_BACKGROUND_TASK, {
    accuracy: 6,
    distanceInterval: 10,
    timeInterval: 5000,
    foregroundService: {
      notificationTitle: 'Maastokartoitus-App',
      notificationBody: 'Geotracking running',
      notificationColor: Colors.headerBackground
    }
  })
}

const watchLocationAsynciOS = async (updateLocation : (location: LocationData | null) => void, appendPath: (path: LocationData[]) => void) => {
  await Location.watchPositionAsync({
    accuracy: 6,
    distanceInterval: 10,
    timeInterval: 5000
  },
  location => {
    updateLocation(location)
    appendPath([location])
  })
}

const stopLocationAsync = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_BACKGROUND_TASK)
}

export {watchLocationAsync, stopLocationAsync}