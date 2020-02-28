import React from 'react'
import FormInputComponent from '../components/FormInputComponent'
import FormArrayComponent from '../components/FormArrayComponent'
import FormPickerItemComponent from '../components/FormPickerItemComponent'
import FormPickerComponent from '../components/FormPickerComponent'
import uuid from 'react-native-uuid'

interface MyObject{
  [key: string]: any
}

let dict: { [key: string]: any } = {}


export const parseSchemaToForm = (data: MyObject = {}, setValue: Function, unregister: Function, errors: Object, register: Function) => {
  register({'testi': 'testi'})
  const toReturn: Array<any> = []
  Object.keys(data).forEach((key: string) => {
    if (typeof(data[key]) === 'object') { // Check if key has other keys nested inside, aka is of type object
      toReturn.push(parseNested(data[key], key, false, setValue, unregister, errors, register))
    }
  })
  return toReturn
} 

const parseNested = (data: MyObject = {}, objectTitle: string, arrayBoolean: boolean, setValue: Function, unregister: Function, errors: Object, register: Function) => {
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
        toReturn.push(parseNested(data[key], key, isArray, setValue, unregister, errors, register))

      } else if (key === 'type') {
        if (data[key] === 'array') {
          isArray = true
        }
        type = data[key]
      } else if (key === 'title') {
        title = data[key]
      } else if (key === 'default') {
        defaultValue = data[key] 
      }
    })
    
    // All keys in subtree are looped
    if (includesEnum) {
      toReturn.push(createPicker(title, objectTitle, defaultValue, setValue, unregister, errors, register))
    } else if (title !== '' && type !== '' && isArray) {
      toReturn.push(createArray(title, type, defaultValue, setValue, unregister, errors, register))
    } else if (title !== '' && type !== '') {
      toReturn.push(createInputElement(title, type, defaultValue, setValue, unregister, errors, register, false))
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
const createPicker = (title: string, keyName: string, defaultValue: string, setValue: Function, unregister: Function, errors: Object, register: Function) => {
  const dictObject = dict[keyName]
  const pickerItems = []
  for (const key in dictObject) {
    pickerItems.push(<FormPickerItemComponent key={key} label={dictObject[key]} value={key} />)
  }

  if (defaultValue !== null) {
    return <FormPickerComponent key={title} title={title} pickerItems={pickerItems} selectedValue={defaultValue} setValue={setValue} errors={errors} register={register} />
  } else {
    return <FormPickerComponent key={title} title={title} pickerItems={pickerItems} selectedValue={null} setValue={setValue} errors={errors} register={register} />
  }
}

const createArray = (title: string, type: string, defaultValue: string, setValue: Function, unregister: Function, errors: Object, register: Function) => {
  const key = title + ' ' + uuid.v4()
  const inputElements = [createInputElement(key, type, defaultValue, setValue, unregister, errors, register, true)]
  return <FormArrayComponent key={title} title={title} inputType={type} inputElements={inputElements} setValue={setValue} unregister={unregister} errors={errors} register={register} />
}

const createInputElement = (title: string, type: string, defaultValue: string, setValue: Function, unregister: Function, errors: Object, register: Function, isArrayItem: boolean) => {
  if (type === 'string') {
    return <FormInputComponent key={title} title={title} defaultValue={defaultValue} keyboardType='default' setValue={setValue} unregister={unregister} errors={errors} register={register} isArrayItem={isArrayItem} />
  } else if (type === 'integer') {
    return <FormInputComponent key={title} title={title} defaultValue={defaultValue} keyboardType='numeric' setValue={setValue} unregister={unregister} errors={errors} register={register} isArrayItem={isArrayItem} />    
  }
} 