import React, { Component } from 'react'
import AppContainer from './navigator/MyNavigator'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { updateLocation, appendPath } from './actions/LocationActions'
import locationReducer from './reducers/LocationReducer'
import * as TaskManager from 'expo-task-manager'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import Platform from 'react-native'
import './language/i18n'

const store = createStore(locationReducer)
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
      distanceInterval: 10,
      timeInterval: 1000,
    })
  }

  watchLocationAsynciOS = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      store.dispatch(updateLocation(null))
    }

    await Location.watchPositionAsync({
      distanceInterval: 10,
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

TaskManager.defineTask(LOCATION_BACKGROUND_TASK, async ({ data, error }) => {
  if (data) {
    const { locations } = data
    store.dispatch(updateLocation(locations[0]))
    store.dispatch(appendPath(locations))
  }
})