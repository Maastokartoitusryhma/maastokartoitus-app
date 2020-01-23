import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../screens/HomeScreen'
import MapScreen from '../screens/MapScreen'
import HavaintoScreen from '../screens/HavaintoScreen'
import LoginScreen from "../screens/LoginScreen";

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    Map: MapScreen,
    Havainto: HavaintoScreen
  },
  {
    initialRouteName: 'Login'
  }
)

const AppContainer = createAppContainer(AppNavigator)
export default AppContainer
  