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

  //For react-hook-form
  const { control, handleSubmit, errors, register } = useForm()
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    }
  }

  const [selected, setSelected] = useState(props.selectedValue)

  return (
    <View>
      <Text>{props.title}</Text>
      <View style={Cs.formPickerContainer}>
        <Picker
          selectedValue={selected}
          onValueChange={itemValue => setSelected(itemValue)}>
            {props.pickerItems}
        </Picker>
      </View>
    </View>
  )
}

export default FormPickerComponent