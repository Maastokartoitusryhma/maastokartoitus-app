import React, { Component } from 'react'
import AppContainer from './src/navigator/MyNavigator'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { updateLocation, appendPath } from './src/stores/position/actions'
import reducer from './src/stores/combinedReducer'
import * as TaskManager from 'expo-task-manager'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { Platform } from 'react-native'
import Colors from './src/styles/Colors'
import './src/language/i18n'


const store = createStore(reducer)
const LOCATION_BACKGROUND_TASK = 'backgroundLocationHandler'

export default class App extends Component {
  constructor() {
    super()

    if (Platform.OS === 'ios') {
      this.watchLocationAsynciOS()
    } else {
      this.watchLocationAsyncAndroid()
    }
  }

  watchLocationAsyncAndroid = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      store.dispatch(updateLocation(null))
    }

    await Location.startLocationUpdatesAsync(LOCATION_BACKGROUND_TASK, {
      accuracy: 6,
      distanceInterval: 1,
      timeInterval: 1000,
      //foregroundService: {
      //  notificationTitle: 'Maastokartoitus-App',
      //  notificationBody: 'Geotracking running',
      //  notificationColor: Colors.headerBackground
      //}
    })
  }

  watchLocationAsynciOS = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      store.dispatch(updateLocation(null))
    }

    await Location.watchPositionAsync({
      accuracy: 6,
      distanceInterval: 1,
      timeInterval: 1000
    },
    location => {
      store.dispatch(updateLocation(location))
      store.dispatch(appendPath([location]))
    })
  }

  render() {
    return  (
      <Provider store={ store }>
        <AppContainer />
      </Provider>
    )
  }
}

TaskManager.defineTask(LOCATION_BACKGROUND_TASK, async ({data, error }) => {
  const { locations } = data
  if (locations) {
    store.dispatch(updateLocation(locations[locations.length - 1]))
    store.dispatch(appendPath(locations))
  }
})
