import React, { useState } from 'react'
import { View, Text, Picker } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import Cs from '../styles/ContainerStyles'

interface Props {
  title: string
  selectedValue: string|null
  pickerItems: Array<Object>
}

const FormPickerComponent = (props: Props) => {

  const [selected, setSelected] = useState(props.selectedValue)

  if (selected !== null) {
    props.setValue(props.title, selected)
  }

  return (
    <View>
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
      </View>
    </View>
  )
}

export default FormPickerComponent