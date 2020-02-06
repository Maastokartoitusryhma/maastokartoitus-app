import { StyleSheet } from 'react-native'
import Colors from './Colors'

const OtherStyles = StyleSheet.create({
  textInput: {
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    height: 40,
    width: '80%',
    padding: 10
  },
  observationTextInput: {
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    textAlign: 'justify'
  },
})

export default OtherStyles