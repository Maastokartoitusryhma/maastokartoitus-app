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


export const parseSchemaToForm = (data: MyObject = {}, watch: Function, setValue: Function, unregister: Function, errors: Object, register: Function) => {
  const toReturn: Array<any> = []
  Object.keys(data).forEach((key: string) => {
    if (typeof(data[key]) === 'object') { // Check if key has other keys nested inside, aka is of type object
      toReturn.push(parseNested(data[key], key, '', false, watch, setValue, unregister, errors, register))
    }
  })
  return toReturn
} 

const parseNested = (data: MyObject = {}, objectTitle: string, parentObjectTitle: string, arrayBoolean: boolean, watch: Function, setValue: Function, unregister: Function, errors: Object, register: Function) => {
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
        if (objectTitle !== 'items' && objectTitle !== 'properties' && objectTitle !== 'required') {
          toReturn.push(parseNested(data[key], key, objectTitle, isArray, watch ,setValue, unregister, errors, register))
        } else {
          toReturn.push(parseNested(data[key], key, parentObjectTitle, isArray, watch, setValue, unregister, errors, register))
        }

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
      toReturn.push(createPicker(title, objectTitle, defaultValue, watch, setValue, unregister, errors, register))
    } else if (title !== '' && type !== '' && isArray) {
      toReturn.push(createArray(title, objectTitle, parentObjectTitle, type, defaultValue, watch, setValue, unregister, errors, register))
    } else if (title !== '' && type !== '') {
      toReturn.push(createInputElement(title, null, objectTitle, parentObjectTitle, type, defaultValue, watch, setValue, unregister, errors, register, false))
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
const createPicker = (title: string, keyName: string, defaultValue: string, watch: Function, setValue: Function, unregister: Function, errors: Object, register: Function) => {
  const dictObject = dict[keyName]
  const pickerItems = []

  for (const key in dictObject) {
    pickerItems.push(<FormPickerItemComponent key={key} label={dictObject[key]} value={key} />)
  }

  // If default value exists, set that as selected value. Otherwise, set the value of first picker item
  if (defaultValue !== '') {
    return <FormPickerComponent key={title} objectTitle={keyName} title={title} pickerItems={pickerItems} selectedValue={defaultValue} watch={watch} setValue={setValue} errors={errors} register={register} />
  } else {
    return <FormPickerComponent key={title} objectTitle={keyName} title={title} pickerItems={pickerItems} selectedValue={pickerItems[0].props.value} watch={watch} setValue={setValue} errors={errors} register={register} />
  }
}

const createArray = (title: string, objectTitle: string, parentObjectTitle: string, type: string, defaultValue: string, watch: Function, setValue: Function, unregister: Function, errors: Object, register: Function) => {
  const key = title + ' ' + uuid.v4()

  let elementDict: { [key: string]: any } = {}

  const callbackFunction = (childValue) => {
    elementDict[childValue.title] = childValue.value
  }

  // Adds empty array to register
  if (parentObjectTitle !== '') {
    register({ name: parentObjectTitle })
    setValue(parentObjectTitle, [])
  }
  const inputElements = [createInputElement(key, callbackFunction, objectTitle, parentObjectTitle, type, defaultValue, watch, setValue, unregister, errors, register, true)]
  return <FormArrayComponent callbackFunction={callbackFunction} elementDict={elementDict} parentObjectTitle={parentObjectTitle} objectTitle={objectTitle} key={title} title={title} inputType={type} inputElements={inputElements} watch={watch} setValue={setValue} unregister={unregister} errors={errors} register={register} />
}

const createInputElement = (title: string, callbackFunction: Function, objectTitle: string, parentObjectTitle: string, type: string, defaultValue: string, watch: Function, setValue: Function, unregister: Function, errors: Object, register: Function, isArrayItem: boolean) => {
  if (type === 'string') {
    return <FormInputComponent key={title} parentCallback={callbackFunction} parentObjectTitle={parentObjectTitle} objectTitle={objectTitle} title={title} defaultValue={defaultValue} keyboardType='default' watch={watch} setValue={setValue} unregister={unregister} errors={errors} register={register} isArrayItem={isArrayItem} />
  } else if (type === 'integer') {
    return <FormInputComponent key={title} parentCallback={callbackFunction} parentObjectTitle={parentObjectTitle} objectTitle={objectTitle} title={title} defaultValue={defaultValue} keyboardType='numeric' watch={watch} setValue={setValue} unregister={unregister} errors={errors} register={register} isArrayItem={isArrayItem} />    
  }
} 