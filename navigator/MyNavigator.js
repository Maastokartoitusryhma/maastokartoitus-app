import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { withTranslation } from 'react-i18next'
import HomeScreen from '../screens/HomeScreen'
import MapScreen from '../screens/MapScreen'
import ObservationScreen from '../screens/ObservationScreen'
import LoginScreen from '../screens/LoginScreen'

const MainNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    Map: MapScreen,
    Observation: ObservationScreen
  },
  {
    initialRouteName: 'Login'
  }
)

const AppContainer = createAppContainer(MainNavigator)

class AppNavigator extends Component {
  render() {
    const { t, i18n } = this.props

    return (
      <AppContainer 
      screenProps={{
        t,
        i18n
      }}
      />
    )
  }
}
export default withTranslation()(AppNavigator)
