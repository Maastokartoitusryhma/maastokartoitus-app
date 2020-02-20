import React, { useState } from 'react'
import { Text, View, Button } from 'react-native'
import FormInputComponent from './FormInputComponent'

interface Props {
  title: string
  inputType: string
  inputElements: Array<Object | undefined>
}

const FormArrayComponent = (props: Props) => {

  const [inputElements, setInputElements] = useState(props.inputElements)

  const addInputElement = () => {
    const elements = [...inputElements]
    elements.push(createInputElement('', props.inputType, '', props.setValue, props.errors, props.register))
    setInputElements(elements)
  }

  const removeInputElement = () => {
    const elements = [...inputElements]
    elements.pop()
    setInputElements(elements)
  }

  return (
    <View>
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

const createInputElement = (title: string, type: string, defaultValue: string, setValue, errors, register) => {
  if (type === 'string') {
    return <FormInputComponent title={title} defaultValue={defaultValue} keyboardType='default' setValue={setValue} errors={errors} register={register} />
  } else if (type === 'integer') {
    return <FormInputComponent title={title} defaultValue={defaultValue} keyboardType='numeric' setValue={setValue} errors={errors} register={register}/>    
  }
} 

export default FormArrayComponent