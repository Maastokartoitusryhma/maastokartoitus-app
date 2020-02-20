import React from 'react'
import { Picker } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

interface Props {
  key: string
  label: string
  value: string
}

const FormPickerItemComponent = (props: Props) => {

  //For react-hook-form
  const { control, handleSubmit, errors, register } = useForm()
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    }
}

  return <Picker.Item key={props.key} label={props.label} value={props.value} />
}

export default FormPickerItemComponent