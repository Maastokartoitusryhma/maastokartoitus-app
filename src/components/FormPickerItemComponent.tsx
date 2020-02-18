import React from 'react'
import { Picker } from 'react-native'

const FormPickerItemComponent = (props) => {
  return <Picker.Item key={props.key} label={props.label} value={props.value} />
}

export default FormPickerItemComponent