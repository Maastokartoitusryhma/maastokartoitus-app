import React from 'react'
import { Text, Button } from 'react-native'
import FormInputComponent from './src/components/FormInputComponent'
import FormPickerItemComponent from './src/components/FormPickerItemComponent'
import FormPickerComponent from './src/components/FormPickerComponent'

interface MyObject{
  [key: string]: any
}

let dict: { [key: string]: any } = {}

export const parse = (data: MyObject = {}) => {
  const toReturn: Array<any> = []
  Object.keys(data).forEach((key: string) => {
    if (typeof(data[key]) === 'object') { // Check if key has other keys nested inside, aka is of type object
      toReturn.push(parseNested(data[key], key))
    }
  })
  toReturn.push(<Button title='ADD'></Button>)
  return toReturn
} 

const parseNested = (data: MyObject = {}, objectTitle: string) => {
    let toReturn = []
    let type: string|null = null
    let title: string|null = null 
    let defaultValue: string|null = null
    let includesEnum = false
    
    Object.keys(data).forEach(key => {
      if (key === 'enum') {
        includesEnum = true
        createNewDictKey(objectTitle) // Create new dictionary object inside dict
        setEnumKeys(data[key], objectTitle) // Set keys to created dictionary object
    
      } else if (key === 'enumNames') {
        setEnumValues(data[key], objectTitle) // Set values to previously created dictionary object

      } else if (typeof(data[key]) === 'object') { // Check if key has other keys nested inside, aka is of type object
        toReturn.push(parseNested(data[key], key))

      } else {
        if (key === 'type') {
          type = data[key]
        } else if (key === 'title') {
          title = data[key]
        } else if (key === 'default') {
          defaultValue = data[key] 
        }
      }
    })
    // All keys in subtree are looped
    if (includesEnum) {
      toReturn.push([<Text>{title}</Text>, createPicker(objectTitle)])
    } else {
      toReturn.push(createInputElement(title, type, defaultValue))
    } 

    return toReturn
}

const createNewDictKey = (name: string) => {
  dict[name] = {}
}

const setEnumKeys = (data: MyObject = {}, dictKey: string) => {
  const dictObject = dict[dictKey]
  Object.keys(data).forEach(key => {
    dictObject[data[key]] = ""
  })
}

const setEnumValues = (data: MyObject = {}, dictKey: string) => {
  const dictObject = dict[dictKey]
  const array = Object.values(data)
  for (const key in dictObject) {
    const value = array.shift()
    dictObject[key] = value
  }
}

const createPicker = (keyName: string) => { // Creates a picker component with items, takes JSON schema item label as parameter
  const dictObject = dict[keyName]
  const pickerItems = []
  for (const key in dictObject) {
    pickerItems.push(<FormPickerItemComponent key={key} label={dictObject[key]} value={key} title={key} />)
  }
  return <FormPickerComponent pickerItems={pickerItems} title={keyName} />
}

const createInputElement = (title: string, type: string, defaultValue: string | null) => {
  if (type === 'string') {
    return <FormInputComponent title={title} defaultValue={defaultValue} keyboardType='default' />
  } else if (type === 'integer') {
    return <FormInputComponent title={title} defaultValue={defaultValue} keyboardType='numeric' />    
  }
}