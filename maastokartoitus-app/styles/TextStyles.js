import { StyleSheet } from 'react-native'
import Colors from '../constants/colors'

const TextStyles = StyleSheet.create({
  observationEventTitle: {
    fontWeight: 'bold',
    padding: 10
  },
  languageText: {
    padding: 10,
    color: Colors.white
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
    paddingTop: 10
  },
  previousObservationsTitle: {
    fontWeight: 'bold',
  }
})

export default TextStyles