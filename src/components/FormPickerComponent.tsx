import React, { useState } from 'react'
import { View, Text, Picker } from 'react-native'
import Cs from '../styles/ContainerStyles'

interface Props {
  key: string
  title: string
  selectedValue: string|null
  pickerItems: Array<Object>
  setValue: Function
  errors: Object
  register: Function
}

const FormPickerComponent = (props: Props) => {

  const [selected, setSelected] = useState(props.selectedValue)

  return (
    <View key={props.key}>
      <Text>{props.title}</Text>
      <View style={Cs.formPickerContainer}>
        <Picker
          ref={props.register({ name: props.title })}
          selectedValue={selected}
          onValueChange={itemValue => {
            setSelected(itemValue)
            props.setValue(props.title, itemValue)}
          }>
            {props.pickerItems}
        </Picker>
        {props.setValue(props.title, selected)}
      </View>
    </View>
  )
}

export default FormPickerComponent