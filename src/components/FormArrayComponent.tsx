import React, { useState } from 'react'
import { Text, View, Button } from 'react-native'
import FormInputComponent from './FormInputComponent'
import uuid from 'react-native-uuid'
import Cs from '../styles/ContainerStyles'
import Colors from '../styles/Colors'

interface Props {
  key: string
  title: string
  inputType: string
  inputElements: Array<Object | undefined>
  setValue: Function
  unregister: Function
  errors: Object
  register: Function
}

const FormArrayComponent = (props: Props) => {

  const [inputElements, setInputElements] = useState(props.inputElements)

  const addInputElement = () => {
    const elements = [...inputElements]
    elements.push(createInputElement(props.title, props.inputType, '', props.setValue, props.unregister, props.errors, props.register))
    setInputElements(elements)
  }

  const removeInputElement = () => {
    const elements = [...inputElements]
    const element = elements.pop()
    props.unregister(element.props.title)
    setInputElements(elements)
  }

  return (
    <View key={props.key} style={Cs.containerWithJustPadding}>
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

const createInputElement = (title: string, type: string, defaultValue: string, setValue: Function, unregister: Function, errors: Object, register: Function) => {
  const key = title + ' ' + uuid.v4()
  if (type === 'string') {
    return <FormInputComponent key={key} title={key} defaultValue={defaultValue} keyboardType='default' setValue={setValue} unregister={unregister} errors={errors} register={register} isArrayItem={true} />
  } else if (type === 'integer') {
    return <FormInputComponent key={key} title={key} defaultValue={defaultValue} keyboardType='numeric' setValue={setValue} unregister={unregister} errors={errors} register={register} isArrayItem={true} />    
  }
}

export default FormArrayComponent