import React, { useState } from 'react'
import { Text, View, Button } from 'react-native'
import FormInputComponent from './FormInputComponent'
import uuid from 'react-native-uuid'
import Cs from '../styles/ContainerStyles'
import Colors from '../styles/Colors'

interface Props {
  callbackFunction: Function
  elementDict: any
  parentObjectTitle: string
  objectTitle: string
  key: string
  title: string
  inputType: string
  inputElements: Array<Object | undefined>
  watch: Function
  setValue: Function
  unregister: Function
  errors: Object
  register: Function
}

const FormArrayComponent = (props: Props) => {

  const [inputElements, setInputElements] = useState(props.inputElements)

  const addInputElement = () => {
    const elements = [...inputElements]
    elements.push(createInputElement(props.parentObjectTitle, props.objectTitle, props.title, props.inputType, '', props.watch, props.setValue, props.unregister, props.errors, props.register))
    setInputElements(elements)
  }
  
  // Removes the last input element from form
  const removeInputElement = () => {
    const elements = [...inputElements]
    const elementToRemove = elements.pop()
    const elementKey = elementToRemove.key
    const valueToRemove = props.elementDict[elementKey] // Dictionary stores key-value pairs, where key is inputs key/title and value is inputs current value
    removeValueFromRegister(valueToRemove)
    delete props.elementDict[elementKey]
    setInputElements(elements)
  }

  // Gets values stored in register, removes the value to remove and replaces register entry with modified array
  const removeValueFromRegister = (value) => {
    const values = props.watch(props.parentObjectTitle)
    const index = values.indexOf(value)
    if (index > -1) {
      values.splice(index, 1)
    }
    props.unregister(props.parentObjectTitle)
    props.register({ name: props.parentObjectTitle })
    props.setValue(props.parentObjectTitle, values)
  }

  const createInputElement = (parentObjectTitle: string, objectTitle: string, title: string, type: string, defaultValue: string, watch: Function, setValue: Function, unregister: Function, errors: Object, register: Function) => {
    const key = title + ' ' + uuid.v4()
    if (type === 'string') {
      return <FormInputComponent key={key} parentCallback={props.callbackFunction} parentObjectTitle={parentObjectTitle} objectTitle={objectTitle} title={key} defaultValue={defaultValue} keyboardType='default' watch={watch} setValue={setValue} unregister={unregister} errors={errors} register={register} isArrayItem={true} />
    } else if (type === 'integer') {
      return <FormInputComponent key={key} parentCallback={props.callbackFunction} parentObjectTitle={parentObjectTitle} objectTitle={objectTitle} title={key} defaultValue={defaultValue} keyboardType='numeric' watch={watch} setValue={setValue} unregister={unregister} errors={errors} register={register} isArrayItem={true} />    
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