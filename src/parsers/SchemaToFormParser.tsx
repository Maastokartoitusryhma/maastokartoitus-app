import React from 'react'
import FormInputComponent from '../components/FormInputComponent'
import FormArrayComponent from '../components/FormArrayComponent'
import FormPickerItemComponent from '../components/FormPickerItemComponent'
import FormPickerComponent from '../components/FormPickerComponent'
import uuid from 'react-native-uuid'

interface MyObject{
  [key: string]: any
}

let dictionary: { [key: string]: any } = {}

export const parseSchemaToForm = (
  data: MyObject = {}, register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function
  ) => {
  const toReturn: Array<any> = []
  Object.keys(data).forEach((key: string) => {
    if (typeof(data[key]) === 'object') { // Check if key has other keys nested inside, aka is of type object
      toReturn.push(parseNested(data[key], key, '', false, register, setValue, watch, errors, unregister))
    }
  })
  return toReturn
} 

const parseNested = (
  data: MyObject = {}, objectTitle: string, parentObjectTitle: string,
  arrayBoolean: boolean, register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function
  ) => {
    let toReturn = []
    let type: string = ''
    let title: string = ''
    let defaultValue: string = ''
    let includesEnum = false
    let isArray = arrayBoolean

    Object.keys(data).forEach(key => {
      if (key === 'enum') {
        includesEnum = true
        if (data['enumNames']) {
          addEnumsAndEnumNames(data[key], data['enumNames'], objectTitle)
        } else {
          //if data['enumNames'] does not exist or is empty enums and enumNames are same
          addEnumsAndEnumNames(data[key], data[key], objectTitle)
        }
        
      } else if (key === 'enumNames') {
        //this is already handled

      } else if (typeof(data[key]) === 'object') { // If key has other keys nested inside - aka is of type object - then do recursion
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
    if (includesEnum) { // Go to create Picker element
      toReturn.push(createPicker(
        title, objectTitle, defaultValue, register,
        setValue, watch, errors, unregister
      ))
    } else if (title !== '' && type !== '' && isArray) { // Go to create Array element
      toReturn.push(createArray(
        title, objectTitle, parentObjectTitle, type,
        defaultValue, register, setValue, watch, errors, unregister, true
      ))
    } else if (title !== '' && type !== '') { // Go to create Input element
      toReturn.push(createInputElement(
        title, objectTitle, parentObjectTitle, type, defaultValue,
        register, setValue, watch, errors, unregister, false, undefined, true
      ))
    }

    return toReturn
}

const addEnumsAndEnumNames = (enums: Array<string>, enumNames: Array<string>, name: string) => {
  dictionary[name] = {}
  const arrayLength = Math.min(enums.length, enumNames.length) //if the arrays are not same length use the length of the shorter array to avoid error
  for (let i = 0; i < arrayLength; i++) {
      dictionary[name][enums[i]] = enumNames[i]
  }
}

// Creates a Picker component with PickerItems. Takes JSON schema item label as parameter.
const createPicker = (
  title: string, keyName: string, defaultValue: string,
  register: Function, setValue: Function, watch: Function,
  errors: Object, unregister: Function
  ) => {
  const dictionaryObject = dictionary[keyName]
  const pickerItems = []

  // Create PickerItem for each key in dictionary object
  for (const key in dictionaryObject) {
    pickerItems.push(<FormPickerItemComponent key={key} label={dictionaryObject[key]} value={key} />)
  }

  // Create picker component with created PickerItems as parameter.
  return <FormPickerComponent
    key={title} title={title} objectTitle={keyName} pickerItems={pickerItems}
    selectedValue={defaultValue !== '' ? defaultValue : pickerItems[0].props.value} // If default value exists, set that as selected value. Otherwise, set the value of first picker item.
    register={register} setValue={setValue} watch={watch} errors={errors} unregister={unregister}
  />
}

const createArray = (
  title: string, objectTitle: string, parentObjectTitle: string, type: string,
  defaultValue: string, register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function, editable: boolean
  ) => {
  const key = title + ' ' + uuid.v4()
  let elementDictionary: { [key: string]: any } = {} // Create dictionary for handling removal of inputs

  const callbackFunction = (childValue: any) => { // Create callback function for fetching values from inputs
    elementDictionary[childValue.title] = childValue.value
  }
  
  if (parentObjectTitle !== '') {
    register({ name: parentObjectTitle }) 
    setValue(parentObjectTitle, []) // Adds empty array to register
  }
  const inputElements = [createInputElement(
    key, objectTitle, parentObjectTitle, type, defaultValue,
    register, setValue, watch, errors, unregister, true, callbackFunction, true
  )]
  return <FormArrayComponent
    key={title} title={title} objectTitle={objectTitle} parentObjectTitle={parentObjectTitle}
    inputType={type} register={register} setValue={setValue} watch={watch} errors={errors}
    unregister={unregister} inputElements={inputElements} elementDictionary={elementDictionary}
    callbackFunction={callbackFunction} editable={editable}  />
}

const createInputElement = (
  title: string, objectTitle: string, parentObjectTitle: string,
  type: string, defaultValue: string, register: Function,
  setValue: Function, watch: Function, errors: Object,
  unregister: Function, isArrayItem: boolean, callbackFunction: Function|undefined, editable: boolean
  ) => {
  if (type === 'string') {
    return <FormInputComponent
      key={title} title={title} objectTitle={objectTitle}
      parentObjectTitle={parentObjectTitle} defaultValue={defaultValue}
      keyboardType='default' register={register} setValue={setValue}
      watch={watch} errors={errors} unregister={unregister}
      isArrayItem={isArrayItem} parentCallback={callbackFunction} editable={editable}
    />
  } else if (type === 'integer') {
    return <FormInputComponent
      key={title} title={title} objectTitle={objectTitle}
      parentObjectTitle={parentObjectTitle} defaultValue={defaultValue}
      keyboardType='numeric' register={register} setValue={setValue}
      watch={watch} errors={errors} unregister={unregister}
      isArrayItem={isArrayItem} parentCallback={callbackFunction} editable={editable}
    />    
  }
} 