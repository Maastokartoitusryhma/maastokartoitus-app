import React, { useState, useEffect } from 'react'
import { Text, TextInput, View, Button } from 'react-native'
import Os from '../styles/OtherStyles'
import Cs from '../styles/ContainerStyles'
import DateTimePicker from '@react-native-community/datetimepicker'
import { parseDateForUI, setDateForDocument, parseDateFromISOToDocument } from '../utilities/dateHelper'

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

const FormDatePickerComponent = (props: Props) => {

  const [currentValue, setCurrentValue] = useState<string>(props.defaultValue)
  const [currentDate, setCurrentDate] = useState<string>(props.defaultValue)
  const [currentTime, setCurrentTime] = useState<string>(props.defaultValue)
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    props.setValue(props.objectTitle, currentValue)
    console.log('START, objectitle', props.watch(props.objectTitle) + " " + props.objectTitle)
  }, [])

  useEffect(() => {
    const combinedDate = currentDate.substring(0, 11) + currentTime.substring(11, 16)
    console.log('COMBINED', combinedDate)
    props.setValue(props.objectTitle, combinedDate)
    combinedDate !== '' ? setCurrentValue(combinedDate) : null
  }, [currentDate, currentTime])
  
  const onChangeDate = (event, date: Date) => {
    setShow(false)
    date !== undefined ? setCurrentDate(parseDateFromISOToDocument(date)) : null
  }

  const onChangeTime = (event, date: Date) => {
    date !== undefined ? setCurrentTime(parseDateFromISOToDocument(date)) : null
  }

  return (
    <View style={Cs.formInputContainer}>
      <Text>{props.title}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10}}>
        <TextInput
          style={Os.datePicker}
          value={parseDateForUI(currentValue)}
          editable={false}
          ref={props.register({ name: props.objectTitle })}
        />
        
        <Button title='edit' onPress={() => setShow(true)}></Button>
      </View>
      {show && (
        <View>
          <DateTimePicker
            value={new Date(Date.parse(currentValue))}
            mode='time'
            onChange={onChangeTime}
          />
          <DateTimePicker
            value={new Date(Date.parse(currentValue))}
            mode='date'
            onChange={onChangeDate}
            maximumDate={new Date(Date.parse(setDateForDocument()))}
          />
        </View>
      )}
    </View>
  )

  
}

export default FormDatePickerComponent