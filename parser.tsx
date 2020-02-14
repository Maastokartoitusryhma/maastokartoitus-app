import React from 'react'
import { TextInput, Text, View, Picker } from 'react-native'

interface MyObject{
  [key: string]: any
}

let dict: { [key: string]: any } = {}

export const parse = (data: MyObject = {}) => {
  const toReturn = []
  Object.keys(data).forEach((key: string) => {
    if (typeof(data[key]) === 'object') { // Check if key has other keys nested inside, aka is of type object
      toReturn.push(parseNested(data[key], key, key))
    }
  })
  return toReturn
} 

const parseNested = (data: MyObject = {}, objectTitle: string, parentObjectTitle: string) => {
    let title = null 
    let type = null
    let defaultValue = null
    let includesEnum = false
    let arrayObject = null
    Object.keys(data).forEach(key => {
      if (key === 'enum') {
        includesEnum = true
        createNewDictKey(objectTitle) // create new dictionary object inside dict
        setEnumKeys(data[key], objectTitle) // set keys to created dictionary object
    
      } else if (key === 'enumNames') {
        setEnumValues(data[key], objectTitle) // set values to previously created dictionary object

      } else if (typeof(data[key]) === 'object') { // Check if key has other keys nested inside, aka is of type object
        parseNested(data[key], key, objectTitle)

      } else if (key === 'type' && data[key] === 'array') {
        arrayObject = arrayFunc(data)

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

    if (arrayObject !== null) { 
      return arrayObject
    }

    if (title !== null && type !== null && !includesEnum) {
      return createInputElement(title, type)
    } else if (title !== null && type !== null && includesEnum) {
      return [<Text>{title}</Text>, createPicker(parentObjectTitle)]
    } 
}

const arrayFunc = (data: MyObject = {}) => {
  console.log(Object.keys(data))
  let type = null
  let title = null
  let defaultValue = null

  Object.keys(data).forEach(key => {
    if (typeof(data[key]) === 'object') {
      console.log('OBJECT!! New recursion. key: ', key)
      return arrayFunc(data[key])
    }
      if (key === 'title') {
        title = data[key]
      } else if (key === 'type') {
        type = data[key]
      } else if (key === 'default') {
        defaultValue = data[key]
      } else {
        console.log('Other field: '+ key, ": ", data[key])
      }

      console.log('title:', title, 'type:', type, 'default:', defaultValue)

  })

  if (type !== null && title !== null) {
    console.log('RENDER ', title, ' ', type)
    return createInputElement(title, type)
  } else {
    return <Text>array elements should be here</Text>
  }
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

// Creates a picker component with items, takes JSON schema item label as parameter
const createPicker = (keyName: string) => {
  const dictObject = dict[keyName]
  const pickerItems = []
  for (const key in dictObject) {
    pickerItems.push(<Picker.Item key={key} label={dictObject[key]} value={key} />)
  }
  return <Picker>{pickerItems}</Picker>
}

const createInputElement = (title: string, type: string) => {
  if (type === 'string') {
    return <View><Text>{title}</Text><TextInput style={{ borderColor: '#DEDEDE', borderWidth: 1 }} placeholder={title}/></View>
  } else {
    return <View><Text>not of type string</Text></View>
  }
  
}