import React, { useState, useEffect } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import Os from '../styles/OtherStyles'
import Cs from '../styles/ContainerStyles'
import DateTimePicker from '@react-native-community/datetimepicker'
import { parseDateForUI, setDateForDocument, parseDateFromISOToDocument } from '../utilities/dateHelper'
import Colors from '../styles/Colors';

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
  }, [])

  // Every time date and time change, combine them so both values are updated
  useEffect(() => {
    const combinedDate = currentDate.substring(0, 11) + currentTime.substring(11, 16)
    props.setValue(props.objectTitle, combinedDate)
    // Set combined date as current value
    combinedDate !== '' ? setCurrentValue(combinedDate) : null
  }, [currentDate, currentTime])
  
  const onChangeDate = (event: any, date: Date | undefined) => {
    setShow(false)
    date !== undefined ? setCurrentDate(parseDateFromISOToDocument(date)) : null
  }

  const onChangeTime = (event: any, date: Date | undefined) => {
    date !== undefined ? setCurrentTime(parseDateFromISOToDocument(date)) : null
  }

  return (
    <View style={Cs.formInputContainer}>
      <Text>{props.title}</Text>
      <View style={Cs.eventDateContainer}>
        <TextInput
          style={Os.datePicker}
          value={parseDateForUI(currentValue)}
          editable={false}
          ref={props.register({ name: props.objectTitle })}
        />
        <Button
          buttonStyle={{ backgroundColor: Colors.neutralButton}}
          icon={<Icon name={'edit'} color='white' size={22} />}
          onPress={() => setShow(true)}>
        </Button>
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