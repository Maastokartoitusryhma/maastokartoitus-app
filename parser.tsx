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
      console.log('GO TO PARSE NESTED')
      toReturn.push(parseNested(data[key], key, key))
    }
  })
  return toReturn
} 

<<<<<<< HEAD
const parseNested = (data: object, objectTitle: string, parentObjectTitle: string) => {
=======
const parseNested = (data: MyObject = {}, objectTitle: string, parentObjectTitle: string) => {
  //console.log('DATA:', data, 'OBJECT TITLE:', objectTitle, 'PARENTTITLE:', parentObjectTitle)
  if (objectTitle === 'enum') {
    createNewDictKey(parentObjectTitle) // create new dictionary object inside dict
    setEnumKeys(data, parentObjectTitle) // set keys to created dictionary object
  } else if (objectTitle === 'enumNames') {
    setEnumValues(data, parentObjectTitle) // set values to previously created dictionary object
    return [<Text>{objectTitle}</Text>, createPicker(parentObjectTitle)] // return picker
  } else { // 
>>>>>>> 4ed2d1cc0a70ca39078059cc3a27e1acb8043d47
    let title = null 
    let type = null
    let defaultValue = null
    let includesEnum = false
    Object.keys(data).forEach(key => {
      if (key === 'enum') {
        includesEnum = true
        createNewDictKey(objectTitle) // create new dictionary object inside dict
        setEnumKeys(data[key], objectTitle) // set keys to created dictionary object
    
      } else if (key === 'enumNames') {
        setEnumValues(data[key], objectTitle) // set values to previously created dictionary object
        return [<Text>{objectTitle}</Text>, createPicker(objectTitle)] // return picker

      } else if (typeof(data[key]) === 'object') { // Check if key has other keys nested inside, aka is of type object
        parseNested(data[key], key, objectTitle)

      } else if (key === 'type' && data[key] === 'array') {
        return arrayFunc(data)

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
    if (title !== null && type !== null && !includesEnum) {
      return createInputElement(title, type)
    } else if (title !== null && type !== null && includesEnum) {
      return [<Text>{title}</Text>, createPicker(parentObjectTitle)]
    } 

  
}

<<<<<<< HEAD
const arrayFunc = (data: object) => {
  const toReturn = []
  let type: string|null = null
  let title: string|null = null
  let defaultValue: string|null = null
=======
const arrayFunc = (data: MyObject = {}) => {
  let type = null
  let title = null
  let required = null
  console.log('ARRAYFUNC ITEMS:', data['items'])

  /*

>>>>>>> 4ed2d1cc0a70ca39078059cc3a27e1acb8043d47
  Object.keys(data).forEach(key => {
    if (typeof(data[key]) === 'object') {
      arrayFunc(data[key])
    } else {
      
      if (key === 'title') {
        title = data[key]
      } else if (key === 'type') {
        type = data[key]
      } else if (key === 'default') {
        defaultValue = data[key]
      }
      console.log('title:', title, 'type:', type, 'default:', defaultValue)

    }
  })
  if (type !== null && title !== null) {
    toReturn.push(createInputElement(title, type))
  }
  return toReturn
  
}

<<<<<<< HEAD
const createNewDictKey = (name: string) => {
  dict[name] = {}
}

const setEnumKeys = (data: object, dictKey: string) => {
  console.log('SETENUMKEYS, DATA:', data)
=======
const setEnumKeys = (data: MyObject = {}, dictKey: string) => {
>>>>>>> 4ed2d1cc0a70ca39078059cc3a27e1acb8043d47
  const dictObject = dict[dictKey]
  Object.keys(data).forEach(key => {
    dictObject[data[key]] = ""
  })
}

const setEnumValues = (data: object, dictKey: string) => {
  console.log('SETENUMVALUES, DATA:', data)
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
    return <View><Text>nuthing</Text></View>
  }
  
}