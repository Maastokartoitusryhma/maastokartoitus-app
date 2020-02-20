import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import Os from '../styles/OtherStyles'
import Cs from '../styles/ContainerStyles'

interface Props {
  title: string
  keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | undefined
  defaultValue: string|undefined
}

const FormInputComponent = (props: Props) => {

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

}

export default FormInputComponent