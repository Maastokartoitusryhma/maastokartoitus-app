import { StyleSheet } from 'react-native'
import Colors from '../constants/colors'

const ContainerStyles = StyleSheet.create({
  homeContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  buttonContainer: {
    padding: 10
  },
  observationContainer: {
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
    width: '90%',
    padding: 10
  },
})

export default ContainerStyles