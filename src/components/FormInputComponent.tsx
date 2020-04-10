import React, { useState, useEffect } from 'react'
import { Text, TextInput, View } from 'react-native'
import Os from '../styles/OtherStyles'
import Cs from '../styles/ContainerStyles'
import DatePicker from 'react-native-datepicker'
import { parseDateForUI, parseDateForDocument } from '../utilities/dateHelper'

interface Props {
  title: string
  objectTitle: string
  parentObjectTitle: string
  keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | undefined
  defaultValue: string
  register: Function
  setValue: Function
  watch: Function
  errors: Object
  unregister: Function
  isArrayItem: boolean
  parentCallback: Function | undefined
}

const FormInputComponent = (props: Props) => {

  const [currentValue, setCurrentValue] = useState<string>(props.defaultValue)

  const addValueToArray = (value: string) => {
    const values = props.watch(props.parentObjectTitle)
    console.log('values: ', props.parentObjectTitle)
    console.log('currentvalue: ', currentValue)
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
    if (props.parentCallback !== undefined) {
      props.parentCallback({ title: props.title, value: props.defaultValue })
    }
  }, [])
  

  if (props.objectTitle === 'dateBegin' || props.objectTitle === 'dateEnd') {
    return (
      <View style={Cs.formInputContainer}>
        <Text>{props.title}</Text>
        <DatePicker
          style={Os.datePicker}
          mode="datetime"
          date={parseDateForUI(props.defaultValue)}
          format="MM.DD.YYYY HH.mm"
          onDateChange={(date) => props.setValue(parseDateForDocument(date))}
        />
      </View>
    )
  } else {
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
            props.parentCallback !== undefined
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

  
}

export default FormInputComponent