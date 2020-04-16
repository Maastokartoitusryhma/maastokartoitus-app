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
    width: '75%',
    backgroundColor: Colors.neutralButton
  },
  removeObservationButton: {
    width: '75%',
    backgroundColor: Colors.negativeButton
  },
  addImageButton: {
    width: 130,
    backgroundColor: Colors.neutralButton,
  },
  removeImageButton: {
    width: 130,
    backgroundColor: Colors.negativeButton,
  }
})

export default ButtonStyles