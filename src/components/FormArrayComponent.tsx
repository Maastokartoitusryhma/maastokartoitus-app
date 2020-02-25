import React, { useState } from 'react'
import { Text, View, Button } from 'react-native'
import FormInputComponent from './FormInputComponent'
import uuid from 'react-native-uuid'

interface Props {
  key: string
  title: string
  inputType: string
  inputElements: Array<Object | undefined>
  setValue: Function
  errors: Object
  register: Function
}

const FormArrayComponent = (props: Props) => {

  const [inputElements, setInputElements] = useState(props.inputElements)

  const addInputElement = () => {
    const elements = [...inputElements]
    elements.push(createInputElement(props.title, props.inputType, '', props.setValue, props.errors, props.register))
    setInputElements(elements)
  }

  const removeInputElement = () => {
    const elements = [...inputElements]
    elements.pop()
    setInputElements(elements)
  }

  return (
    <View key={props.key}>
      <Text>{props.title}</Text>
      {inputElements}
      <Button onPress={() => addInputElement()} title='Add another' />
      {inputElements.length > 1
        ? <Button onPress={() => removeInputElement()} title='Remove one' />
        : null
      }
    </View>
  )
}

const createInputElement = (title: string, type: string, defaultValue: string, setValue: Function, errors: Object, register: Function) => {
  const key = title + ' ' + uuid.v4()
  if (type === 'string') {
    return <FormInputComponent key={key} title={key} defaultValue={defaultValue} keyboardType='default' setValue={setValue} errors={errors} register={register} isArrayItem={true} />
  } else if (type === 'integer') {
    return <FormInputComponent key={key} title={key} defaultValue={defaultValue} keyboardType='numeric' setValue={setValue} errors={errors} register={register} isArrayItem={true} />    
  }
}

export default FormArrayComponent