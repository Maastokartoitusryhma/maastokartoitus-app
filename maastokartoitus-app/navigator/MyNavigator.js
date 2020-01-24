import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../screens/HomeScreen'
import MapScreen from '../screens/MapScreen'
import ObservationScreen from '../screens/ObservationScreen'
import LoginScreen from '../screens/LoginScreen'

const AppNavigator = createStackNavigator(
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

const AppContainer = createAppContainer(AppNavigator)
export default AppContainer
