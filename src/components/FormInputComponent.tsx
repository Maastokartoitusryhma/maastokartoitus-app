import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { composeInitialProps } from 'react-i18next'
import Os from '../styles/OtherStyles'
import Cs from '../styles/ContainerStyles'

interface Props {
  title: string
  keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | undefined
  defaultValue: string|undefined
}

const FormInputComponent = (props: Props) => {

  //For react-hook-form
  const { control, handleSubmit, errors, register } = useForm()
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    }
  }

  const [value, setValue] = useState(props.defaultValue)

  return (
    <View style={Cs.formInputContainer}>
      {props.title !== ''
        ? <Text>{props.title}</Text>
        : null
      }
      <TextInput
        style={Os.textInput}
        keyboardType={props.keyboardType}
        placeholder={props.title}
        value={value}
        onChangeText={text => setValue(text)}
      />
    </View>
  )
  /*
  <Controller
        as={<TextInput ref={register} />}
        control={control}
        name={props.title}
        onChange={onChange}
        rules={{ required: false }}
        defaultValue=""
      />
      */
}

export default FormInputComponent