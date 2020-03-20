import React, { useState } from 'react'
import { Text, View, Button } from 'react-native'
import FormInputComponent from './FormInputComponent'
import uuid from 'uuid'
import Cs from '../styles/ContainerStyles'
import Colors from '../styles/Colors'

interface Props {
  title: string
  objectTitle: string
  parentObjectTitle: string
  inputType: string
  register: Function
  setValue: Function
  watch: Function
  errors: Object
  unregister: Function
  inputElements: Array<Object | undefined>
  elementDictionary: any
  callbackFunction: Function | undefined
}

const FormArrayComponent = (props: Props) => {

  const [inputElements, setInputElements] = useState(props.inputElements)

  const addInputElement = () => {
    const elements = [...inputElements]
    elements.push(createInputElement(
      props.title, props.objectTitle, props.parentObjectTitle,
      props.inputType, '', props.register, props.setValue,
      props.watch, props.errors, props.unregister
    ))
    setInputElements(elements)
  }
  
  // Removes the last input element from form
  const removeInputElement = () => {
    const elements = [...inputElements]
    const elementToRemove = elements.pop()
    const elementKey = elementToRemove.key
    const valueToRemove = props.elementDictionary[elementKey] // Dictionary stores key-value pairs, where key is key/title of input and value is crrent value of input
    removeValueFromRegister(valueToRemove)
    delete props.elementDictionary[elementKey]
    setInputElements(elements)
  }

  // Gets values stored in register, removes the value to remove and replaces register entry with modified array
  const removeValueFromRegister = (value: string) => {
    const values = props.watch(props.parentObjectTitle)
    const index = values.indexOf(value)
    if (index > -1) {
      values.splice(index, 1)
    }
    props.unregister(props.parentObjectTitle)
    props.register({ name: props.parentObjectTitle })
    props.setValue(props.parentObjectTitle, values)
  }

  const createInputElement = (
    title: string, objectTitle: string, parentObjectTitle: string,
    type: string, defaultValue: string, register: Function,
    setValue: Function, watch: Function, errors: Object, unregister: Function
    ) => {
    const key = title + ' ' + uuid.v4()
    if (type === 'string') {
      return <FormInputComponent
        key={key} title={key} objectTitle={objectTitle}
        parentObjectTitle={parentObjectTitle} keyboardType='default'
        defaultValue={defaultValue} register={register} setValue={setValue}
        watch={watch} errors={errors} unregister={unregister} 
        isArrayItem={true} parentCallback={props.callbackFunction}
      />
    } else if (type === 'integer') {
      return <FormInputComponent 
        key={key} title={key} objectTitle={objectTitle}
        parentObjectTitle={parentObjectTitle} keyboardType='numeric'
        defaultValue={defaultValue} register={register} setValue={setValue}
        watch={watch} errors={errors} unregister={unregister} 
        isArrayItem={true} parentCallback={props.callbackFunction}
      />
    }
  }

  return (
    <View style={Cs.containerWithJustPadding}>
      <Text>{props.title}</Text>
      <View style={Cs.formAllInputsContainer}>
        {inputElements}
        <View style={Cs.formArrayButtonContainer}>
          <Button onPress={() => addInputElement()} title='ADD' color={Colors.neutralButton} />
          {inputElements.length > 1
            ? <Button onPress={() => removeInputElement()} title='REMOVE' color={Colors.negativeButton} />
            : null
          }
        </View>
      </View>
    </View>
  )
}

export default FormArrayComponent