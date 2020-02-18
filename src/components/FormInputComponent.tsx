import React from 'react'
import { Text, TextInput, View } from 'react-native'
import Os from '../styles/OtherStyles'

const FormInputComponent = (props) => {

  return (
    <View>
      <Text>{props.title}</Text>
      <TextInput style={Os.textInput} keyboardType={props.keyboardType} placeholder={props.title} value={props.defaultValue} />
    </View>
  )

}

export default FormInputComponent