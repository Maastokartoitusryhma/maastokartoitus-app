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
  isArrayItem: boolean
}

const FormInputComponent = (props: Props) => {

  const [inputValue, setInputValue] = useState(props.defaultValue)
  console.log('default ', inputValue, ' from ', props.title)

  if (inputValue !== null) {
    console.log('set value ', inputValue, ' into ', props.title)
    props.setValue(props.title, inputValue)
  }

  return (
    <View style={Cs.formInputContainer}>
      {(props.title !== '' && !props.isArrayItem)
        ? <Text>{props.title}</Text>
        : null
      }
      <TextInput
        style={Os.textInput}
        keyboardType={props.keyboardType}
        onChangeText={text => {
          setInputValue(text)
          props.setValue(props.title, text)}
        }
        value={inputValue}
        defaultValue={''}
        ref={props.register({ name: props.title})}
      />
    </View>
  )
}

export default FormInputComponent