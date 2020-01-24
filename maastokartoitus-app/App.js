import React, { Component } from 'react'
import AppContainer from './navigator/MyNavigator'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { updateLocation } from './actions/LocationActions'
import locationReducer from './reducers/LocationReducer'
import * as TaskManager from 'expo-task-manager'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

const LOCATION_BACKGROUND_TASK = 'backgroundLocationHandler'
const store = createStore(locationReducer)

export default class App extends Component {
  constructor() {
    super()
    this.watchLocationAsync()
  }

  watchLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
  
    if(status !== 'granted') {
      store.dispatch(updateLocation(null))
    }
  
    await Location.startLocationUpdatesAsync(LOCATION_BACKGROUND_TASK, {
      distanceInterval: 100,
      timeInterval: 20000,
    })
  
    await Location.watchPositionAsync({
      distanceInterval: 1,
      timeInterval: 500
    },
    location => {
      store.dispatch(updateLocation(location))
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
  }
})