import React from 'react'
import FormInputComponent from '../components/FormInputComponent'
import FormArrayComponent from '../components/FormArrayComponent'
import FormPickerItemComponent from '../components/FormPickerItemComponent'
import FormPickerComponent from '../components/FormPickerComponent'
import FormDatePickerComponent from '../components/FormDatePickerComponent'
import uuid from 'react-native-uuid'

// Creates a Picker component with PickerItems. Takes JSON schema item label as parameter.
export const createPicker = (
  title: string, objectTitle: string, defaultValue: string,
  register: Function, setValue: Function, watch: Function,
  errors: Object, unregister: Function, dictionary: { [key: string]: any }
  ) => {
  const pickerItems = []

  // Create PickerItem for each key in dictionary object
  for (const key in dictionary) {
    pickerItems.push(<FormPickerItemComponent key={key} label={dictionary[key]} value={key} />)
  }

  // Create picker component with created PickerItems as parameter.
  return <FormPickerComponent
    key={title} title={title} objectTitle={objectTitle} pickerItems={pickerItems}
    selectedValue={defaultValue !== '' ? defaultValue : pickerItems[0].props.value} // If default value exists, set that as selected value. Otherwise, set the value of first picker item.
    register={register} setValue={setValue} watch={watch} errors={errors} unregister={unregister}
  />
}

export const createArray = (
  title: string, objectTitle: string, parentObjectTitle: string, type: string,
  defaultValue: (Array<string>) | undefined, register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function
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

  //if there are default values for the array, we iterate them, create the according input elements and pass the elements to FormArrayComponent 
  let inputElements: Array<Element | undefined> = []
  if(defaultValue) {
    defaultValue.forEach((value) => inputElements.push(createInputElement(
      key, objectTitle, parentObjectTitle, type, value,
      register, setValue, watch, errors, unregister, true, callbackFunction)))
  }

  return <FormArrayComponent
    key={title} title={title} objectTitle={objectTitle} parentObjectTitle={parentObjectTitle}
    inputType={type} register={register} setValue={setValue} watch={watch} errors={errors}
    unregister={unregister} inputElements={inputElements} elementDictionary={elementDictionary}
    callbackFunction={callbackFunction} />
}

export const createInputElement = (
  title: string, objectTitle: string, parentObjectTitle: string,
  type: string, defaultValue: string, register: Function,
  setValue: Function, watch: Function, errors: Object,
  unregister: Function, isArrayItem: boolean, callbackFunction: Function|undefined
  ) => {

  if (objectTitle === 'dateBegin' || objectTitle === 'dateEnd') {
    return <FormDatePickerComponent
      key={title} title={title} objectTitle={objectTitle}
      parentObjectTitle={parentObjectTitle} defaultValue={defaultValue}
      keyboardType='default' register={register} setValue={setValue}
      watch={watch} errors={errors} unregister={unregister}
      isArrayItem={isArrayItem} parentCallback={callbackFunction}
    />
  } else if (type === 'string') {
    return <FormInputComponent
      key={title} title={title} objectTitle={objectTitle}
      parentObjectTitle={parentObjectTitle} defaultValue={defaultValue}
      keyboardType='default' register={register} setValue={setValue}
      watch={watch} errors={errors} unregister={unregister}
      isArrayItem={isArrayItem} parentCallback={callbackFunction}
    />
  } else if (type === 'integer') {
    return <FormInputComponent
      key={title} title={title} objectTitle={objectTitle}
      parentObjectTitle={parentObjectTitle} defaultValue={defaultValue}
      keyboardType='numeric' register={register} setValue={setValue}
      watch={watch} errors={errors} unregister={unregister}
      isArrayItem={isArrayItem} parentCallback={callbackFunction}
    />    
  }
}
