import { StyleSheet } from 'react-native'
import Colors from './Colors'

const ButtonStyles = StyleSheet.create({
  homeButton: {
    width: '20%',
    padding: 10,
  },
  loginButton: {
    width: '60%',
    padding: 10,
  },
  editEventButton: {
    width: 60,
    backgroundColor: Colors.neutralButton
  },
  sendEventButton: {
    width: 60,
    backgroundColor: Colors.positiveButton
  },
  editObservationButton: {
    backgroundColor: Colors.neutralButton
  },
  removeObservationButton: {
    backgroundColor: Colors.negativeButton
  },
  addImageButton: {
    width: 130,
    backgroundColor: Colors.neutralButton,
  },
  removeImageButton: {
    width: 30,
    height: 30,
  },
  logoutButton: {
    backgroundColor: Colors.negativeButton,
    width: '45%',
  },
  continueButton: {
    backgroundColor: Colors.neutralColor
  },
  endButton: {
    backgroundColor: Colors.negativeColor
  }
})

export default ButtonStyles