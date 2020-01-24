import React from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

const ObservationComponent = () => {
  const { control, handleSubmit, errors } = useForm()
  const onSubmit = data => Alert.alert('Form data', JSON.stringify(data))
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    }
  }
  let today = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()

  return (
    <View>
      <Text>Laji:</Text>
      <Controller
        as={<TextInput />}
        control={control}
        name='laji'
        onChange={onChange}
        rules={{ required: true}}
        defaultValue='liito-orava' 
      />
      {errors.firstName && <Text>Vaaditaan</Text>}

      <Text>Sijainti:</Text>
      <Controller
        as={<TextInput />}
        control={control}
        onChange={onChange}
        name='location'
        defaultValue='' 
      />

      <Text>Aika:</Text>
      <Controller
        as={<TextInput />}
        control={control}
        onChange={onChange}
        name='date'
        defaultValue={today} 
      />

      <Button onPress={handleSubmit(onSubmit)} title='Lähetä'></Button>
    </View>
  )
}

export default ObservationComponent