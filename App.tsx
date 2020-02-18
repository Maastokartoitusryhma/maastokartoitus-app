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
import {LOCATION_BACKGROUND_TASK} from './src/constants/tasks'

const store = createStore(reducer)

export default class App extends Component {
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
