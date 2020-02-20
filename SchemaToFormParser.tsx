import React from 'react'
import FormInputComponent from './src/components/FormInputComponent'
import FormArrayComponent from './src/components/FormArrayComponent'
import FormPickerItemComponent from './src/components/FormPickerItemComponent'
import FormPickerComponent from './src/components/FormPickerComponent'

interface MyObject{
  [key: string]: any
}

let dict: { [key: string]: any } = {}


export const parseSchemaToForm = (data: MyObject = {}, setValue, errors, register) => {
  const toReturn: Array<any> = []
  Object.keys(data).forEach((key: string) => {
    if (typeof(data[key]) === 'object') { // Check if key has other keys nested inside, aka is of type object
      toReturn.push(parseNested(data[key], key, false, setValue, errors, register))
    }
  })
  return toReturn
} 

const parseNested = (data: MyObject = {}, objectTitle: string, arrayBoolean: boolean, setValue, errors, register) => {
    let toReturn = []
    let type: string = ''
    let title: string = ''
    let defaultValue: string = ''
    let includesEnum = false
    let isArray = arrayBoolean
    
    Object.keys(data).forEach(key => {
      if (key === 'enum') {
        includesEnum = true
        createNewDictKey(objectTitle) // Create new dictionary object inside dict
        setEnumKeys(data[key], objectTitle) // Set keys to created dictionary object
    
      } else if (key === 'enumNames') {
        setEnumValues(data[key], objectTitle) // Set values to previously created dictionary object

      } else if (typeof(data[key]) === 'object') { // Check if key has other keys nested inside, aka is of type object
        toReturn.push(parseNested(data[key], key, isArray, setValue, errors, register))

      } else {
        if (key === 'type') {
          if (data[key] === 'array') {
            isArray = true
          }
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
      toReturn.push(createPicker(title, objectTitle, defaultValue))
    } else if (title !== '' && type !== '' && isArray) {
      toReturn.push(createArray(title, type, defaultValue, setValue, errors, register))
    } else if (title !== '' && type !== '') {
      toReturn.push(createInputElement(title, type, defaultValue, setValue, errors, register))
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

// Creates a picker component with items, takes JSON schema item label as parameter
const createPicker = (title: string, keyName: string, defaultValue: string) => {
  const dictObject = dict[keyName]
  const pickerItems = []
  for (const key in dictObject) {
    pickerItems.push(<FormPickerItemComponent key={key} label={dictObject[key]} value={key} />)
  }

  if (defaultValue !== null) {
    return <FormPickerComponent title={title} pickerItems={pickerItems} selectedValue={defaultValue} />
  } else {
    return <FormPickerComponent title={title} pickerItems={pickerItems} selectedValue={null}/>
  }
}

const createArray = (title: string, type: string, defaultValue: string, setValue, errors, register) => {
  const inputElements = [createInputElement('', type, defaultValue, setValue, errors, register)]
  return <FormArrayComponent title={title} inputType={type} inputElements={inputElements} />
}

const createInputElement = (title: string, type: string, defaultValue: string, setValue, errors, register) => {
  console.log('title ', title, 'setValue ', setValue, ' errors ', errors, ' register ', register)
  if (type === 'string') {
    return <FormInputComponent title={title} defaultValue={defaultValue} keyboardType='default' setValue={setValue} errors={errors} register={register} />
  } else if (type === 'integer') {
    return <FormInputComponent title={title} defaultValue={defaultValue} keyboardType='numeric' setValue={setValue} errors={errors} register={register} />    
  }
} 