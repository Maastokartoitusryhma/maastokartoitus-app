import React from 'react'
import { Text, TextInput, View } from 'react-native'
import Os from '../styles/OtherStyles'
import Cs from '../styles/ContainerStyles'

interface Props {
  key: string
  title: string
  keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | undefined
  defaultValue: string|undefined
  setValue: Function
  errors: Object
  register: Function
  isArrayItem: boolean
}

const FormInputComponent = (props: Props) => {

  return (
    <View key={props.key} style={Cs.formInputContainer}>
      {!props.isArrayItem
        ? <Text>{props.title}</Text>
        : null
      }
      <TextInput
        style={Os.textInput}
        keyboardType={props.keyboardType}
        onChangeText={text => props.setValue(props.title, text)}
        defaultValue={props.defaultValue}
        ref={props.register({name: props.title})}
      />
      {props.setValue(props.title, props.defaultValue)}
    </View>
  )
}

export default FormInputComponent