import React from 'react'
import { Picker } from 'react-native'

const FormPickerComponent = (props) => {
  return (
    <Picker>
      {props.pickerItems}
    </Picker>
  )
}

export default FormPickerComponent