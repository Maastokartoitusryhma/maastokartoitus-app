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
  setValue: any
  errors: any
  register: any
}

const FormInputComponent = (props: Props) => {

  //const [value, setValue] = useState(props.defaultValue)

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
        onChangeText={text => props.setValue(props.title, text)}
        ref={props.register({ name: props.title})}
      />
    </View>
  )
}

export default FormInputComponent