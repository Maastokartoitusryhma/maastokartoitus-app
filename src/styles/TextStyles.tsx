import { StyleSheet, Platform } from 'react-native'
import Colors from './Colors'

const TextStyles = StyleSheet.create({
  speciesText: {
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
  },
  observationEventTitle: {
    padding: 10,
    fontWeight: 'bold'
  },
  observationEventListElement: {
    padding: 6
  },
  loginLanguage: {
    padding: 10
  },
  boldText: {
    fontWeight: 'bold'
  }
})

export default TextStyles