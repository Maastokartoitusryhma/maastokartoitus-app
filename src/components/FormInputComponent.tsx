import React from 'react'
import { Text, TextInput, View } from 'react-native'
import Os from '../styles/OtherStyles'
import { useForm, Controller } from 'react-hook-form'
import { composeInitialProps } from 'react-i18next'

const FormInputComponent = (props) => {
  //For react-hook-form
  const { control, handleSubmit, errors } = useForm()
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    }
  }

  return (
    <View>
      <Text>{props.title}</Text>
      <Controller
        as={<TextInput />}
        control={control}
        name={props.title}
        onChange={onChange}
        rules={{ required: false }}
        defaultValue=""
      />
      <TextInput style={Os.textInput} keyboardType={props.keyboardType} placeholder={props.title} value={props.defaultValue} />
    </View>
  )

}

export default FormInputComponent