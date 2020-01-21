import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../screens/HomeScreen'
import MapScreen from '../screens/MapScreen'
import HavaintoScreen from '../screens/HavaintoScreen'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen,
    Havainto: HavaintoScreen
  },
  {
    initialRouteName: 'Home'
  }
)

const AppContainer = createAppContainer(AppNavigator)
export default AppContainer
  