import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import FormInputComponent from './FormInputComponent'
import uuid from 'react-native-uuid'
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
  inputElements: Array<Element | undefined>
  elementDictionary: any
  callbackFunction: Function | undefined
  editable: boolean
}

const FormArrayComponent = (props: Props) => {

  const [inputElements, setInputElements] = useState(props.inputElements)

  const addInputElement = () => {
    const elements = [...inputElements]
    elements.push(createInputElement(
      props.title, props.objectTitle, props.parentObjectTitle,
      props.inputType, '', props.register, props.setValue,
      props.watch, props.errors, props.unregister, props.editable
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
    setValue: Function, watch: Function, errors: Object, unregister: Function, editable: boolean
    ) => {
    const key = title + ' ' + uuid.v4()
    if (type === 'string') {
      return <FormInputComponent
        key={key} title={key} objectTitle={objectTitle}
        parentObjectTitle={parentObjectTitle} keyboardType='default'
        defaultValue={defaultValue} register={register} setValue={setValue}
        watch={watch} errors={errors} unregister={unregister} 
        isArrayItem={true} parentCallback={props.callbackFunction} editable={editable}
      />
    } else if (type === 'integer') {
      return <FormInputComponent 
        key={key} title={key} objectTitle={objectTitle}
        parentObjectTitle={parentObjectTitle} keyboardType='numeric'
        defaultValue={defaultValue} register={register} setValue={setValue}
        watch={watch} errors={errors} unregister={unregister} 
        isArrayItem={true} parentCallback={props.callbackFunction} editable={editable}
      />
    }
  }

  return (
    <View style={Cs.containerWithJustPadding}>
      <Text>{props.title}</Text>
      <View style={Cs.formAllInputsContainer}>
        {inputElements}
        <View style={Cs.formArrayButtonContainer}>
          <Button
            buttonStyle={{ backgroundColor: Colors.positiveButton}}
            icon={<Icon name={'add'} color='white' size={22} />}
            onPress={() => addInputElement()} 
          />
          {inputElements.length > 1
            ? <Button
                icon={<Icon name={'remove'} color='white' size={22} />}
                buttonStyle={{ backgroundColor: Colors.negativeButton}}
                onPress={() => removeInputElement()}
              />
            : null
          }
        </View>
      </View>
    </View>
  )
}

export default FormArrayComponent