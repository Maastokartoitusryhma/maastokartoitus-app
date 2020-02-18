import React from 'react'
import { Picker } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

const FormPickerComponent = (props) => {
  //For react-hook-form
  const { control, handleSubmit, errors } = useForm()
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    }
  }

  return (
    <Controller
        as={<Picker>
          {props.pickerItems}
        </Picker>}
        control={control}
        name={props.title}
        onChange={onChange}
        rules={{ required: false }}
        defaultValue=""
      />
  )
}

export default FormPickerComponent