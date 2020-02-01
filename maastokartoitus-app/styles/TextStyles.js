import { StyleSheet } from 'react-native'
import Colors from '../constants/colors'

const TextStyles = StyleSheet.create({
  observationTitle: {
    fontWeight: 'bold',
    padding: 10
  },
  loginHeader: {
    fontSize: 25,
  },
  loginText: {
    textAlign: 'center',
    padding: 10
  },
  errorText: {
    color: Colors.negativeColor
  },
  observationText: {
    fontWeight: 'bold'
  },
  loggedIn: {
    padding: 10,
  },
  userInfoTitle: {
    padding: 10
  },
})

export default TextStyles