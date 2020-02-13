import React from 'react'
import { TextInput, Text, View, Picker } from 'react-native'

let dict = {}

export const parse = (data: object) => {
  const toReturn = []
  Object.keys(data).forEach(key => {
    if (typeof(data[key]) === 'object') { // Check if key has other keys nested inside, aka is of type object
      console.log('GO TO PARSE NESTED')
      toReturn.push(parseNested(data[key], key, key))
    }
  })
  toReturn.push(createPicker('recordBasis'))
  return toReturn
} 

const parseNested = (data: object, objectTitle: string, parentObjectTitle: string) => {
  //console.log('DATA:', data, 'OBJECT TITLE:', objectTitle, 'PARENTTITLE:', parentObjectTitle)
  if (objectTitle === 'enum') {
    createNewDictKey(parentObjectTitle) // create new dictionary object inside dict
    setEnumKeys(data, parentObjectTitle) // set keys to created dictionary object
  } else if (objectTitle === 'enumNames') {
    setEnumValues(data, parentObjectTitle) // set values to previously created dictionary object
    return [<Text>{objectTitle}</Text>, createPicker(parentObjectTitle)] // return picker
  } else { // 
    let title = null 
    let type = null
    let defaultValue = null
    Object.keys(data).forEach(key => {
      
      if (typeof(data[key]) === 'object') { // Check if key has other keys nested inside, aka is of type object
        console.log('INSIDE PARSE NESTED')
        parseNested(data[key], key, objectTitle)
      } else if (key === 'type' && data[key] === 'array') {
        return arrayFunc(data)
      } else {
        console.log('KEY:', key, '\tVALUE:', data[key])
        if (key === 'type') {
          type = data[key]
        } else if (key === 'title') {
          title = data[key]
        } else if (key === 'default') {
          defaultValue = data[key]
        }
/*
        if (type === 'array') {
          return arrayFunc(data)
        }*/
      }
    })

    // All keys in subtree are looped
    if (title !== null && type !== null && defaultValue === null) {
      return createInputElement(title, type)
    } else if (title !== null && type !== null && defaultValue !== null) {
      return [<Text>{title}</Text>, createPicker(parentObjectTitle)]
    } 

  }


  
}

const arrayFunc = (data: object) => {
  let type = null
  let title = null
  let required = null
  console.log('ARRAYFUNC ITEMS:', data['items'])

  /*

  Object.keys(data).forEach(key => {
    if (typeof(data[key]) === 'object') {
      arrayFunc(data[key])
    } else {
      if (key === 'title') {
        title = data[key]
      }
      if (key === 'type') {
        type = data[key]
      }
      if (key === 'required') {
        required = data[key]
      }

      if (type !== null && title !== null) {
        return createInputElement(title, type)
      }
    
    }
    
  })*/
  if (type !== null && title !== null) {
    return createInputElement(title, type)
  } else {
    return <Text>array here</Text>
  }

  
}

const setEnumKeys = (data: object, dictKey: string) => {
  const dictObject = dict[dictKey]
  Object.keys(data).forEach(key => {
    dictObject[data[key]] = ""
  })
}

const setEnumValues = (data: object, dictKey: string) => {
  const dictObject = dict[dictKey]
  const array = Object.values(data)
  for (const key in dictObject) {
    const value = array.shift()
    dictObject[key] = value
  }
}

const createNewDictKey = (name: string) => {
  dict[name] = {}
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