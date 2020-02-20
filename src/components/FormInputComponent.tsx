import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
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

  const [inputValue, setInputValue] = useState(props.defaultValue)

  if (inputValue !== null) {
    props.setValue(props.title, inputValue)
  }

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
        value={inputValue}
        onChangeText={text => {
          setInputValue(text)
          props.setValue(props.title, text)}
        }
        ref={props.register({ name: props.title})}
      />
    </View>
  )
}

export default FormInputComponent