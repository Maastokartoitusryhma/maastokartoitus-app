import { StyleSheet } from 'react-native'
import Colors from '../constants/colors'

const ContainerStyles = StyleSheet.create({
  homeContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    padding: 10
  },
  observationEventContainer: {
    width: '90%',
    backgroundColor: Colors.blueBackground
  },
  pickerContainer: {
    paddingLeft: 20
  },
  loginContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '45%'
  },
  inputContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  observationContainer2: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
  },
  inputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10
  },
  logoutButtonContainer: {
    paddingTop: 10,
    paddingRight: 10
  },
  previousObservationsContainer: {
    width: '90%',
    paddingTop: 10
  }
})

export default ContainerStyles