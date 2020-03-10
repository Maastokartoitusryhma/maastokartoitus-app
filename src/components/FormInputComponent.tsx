import React, { useState, useEffect } from 'react'
import { Text, TextInput, View } from 'react-native'
import Os from '../styles/OtherStyles'
import Cs from '../styles/ContainerStyles'

interface Props {
  parentObjectTitle: string
  objectTitle: string
  title: string
  keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | undefined
  defaultValue: string|undefined
  watch: Function
  setValue: Function
  unregister: Function
  errors: Object
  register: Function
  isArrayItem: boolean
  parentCallback: Function
}

const FormInputComponent = (props: Props) => {

  const [currentValue, setCurrentValue] = useState<string>(props.defaultValue)

  const addValueToArray = (value: string) => {
    const values = props.watch(props.parentObjectTitle)
    const index = values.indexOf(currentValue)
    if (index > -1) {
      values.splice(index, 1)
    }
    values.push(value)
    props.setValue(props.parentObjectTitle, values)
    setCurrentValue(value)
  }

  useEffect(() => {
    props.parentObjectTitle !== ''
      ? addValueToArray(props.defaultValue)
      : props.setValue(props.objectTitle, props.defaultValue)
    if (props.parentCallback !== null) {
      props.parentCallback({ title: props.title, value: props.defaultValue })
    }
  }, [])
  
  return (
    <View style={props.isArrayItem ? Cs.formArrayInputContainer : Cs.formInputContainer}>
      {!props.isArrayItem
        ? <Text>{props.title}</Text>
        : null
      }
      <TextInput
        style={Os.textInput}
        keyboardType={props.keyboardType}
        onChangeText={text => {
          props.parentObjectTitle !== ''
            ? addValueToArray(text)
            : props.setValue(props.objectTitle, text)

          props.parentCallback !== null
            ? props.parentCallback({ title: props.title, value: text })
            : null
          }          
        }
        defaultValue={props.defaultValue}
        ref={props.parentObjectTitle === ''
          ? props.register({ name: props.objectTitle })
          : null }
      />
    </View>
  )
}

export default FormInputComponent