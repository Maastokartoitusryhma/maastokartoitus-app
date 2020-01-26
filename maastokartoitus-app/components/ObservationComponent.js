import React from 'react'
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'
import Colors from '../constants/colors'

const ObservationComponent = (props) => {
  const { control, handleSubmit, errors } = useForm()
  const onSubmit = data => Alert.alert('Form data', JSON.stringify(data))
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    }
  }
  let today = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()
  let now = new Date().getHours() + ':' + (new Date().getMinutes()) + ':' + new Date().getSeconds()
  const observationLocation =  props.location ? `${props.location.coords.latitude} lat, ${props.location.coords.longitude} long` : ''

  return (
    <View style={styles.container}>
      <Text>Laji:</Text>
      <Controller
        as={<TextInput style={styles.input}/>}
        control={control}
        name='species'
        onChange={onChange}
        rules={{ required: true }}
        defaultValue='liito-orava'
      />
      {errors.species && <Text>Pakollinen kenttä.</Text>}

      <Text>Sijainti:</Text>
      <Controller
        as={<TextInput style={styles.input}/>}
        control={control}
        onChange={onChange}
        name='location'
        rules={{ required: true }}
        defaultValue={observationLocation}
      />
      {errors.location && <Text>Pakollinen kenttä.</Text>}

      <Text>Päivä:</Text>
      <Controller
        as={<TextInput style={styles.input}/>}
        control={control}
        onChange={onChange}
        name='date'
        rules={{ required: true }}
        defaultValue={today}
      />
      {errors.date && <Text>Pakollinen kenttä.</Text>}

      <Text>Aika:</Text>
      <Controller
        as={<TextInput style={styles.input}/>}
        control={control}
        onChange={onChange}
        name='time'
        rules={{ required: true }}
        defaultValue={now}
      />
      {errors.time && <Text>Pakollinen kenttä.</Text>}

      <Text>Lisätietoja:</Text>
      <Controller
        as={<TextInput style={styles.input}/>}
        control={control}
        onChange={onChange}
        name='info'
        defaultValue=''
      />

      <Button onPress={handleSubmit(onSubmit)} title='Lähetä' style={styles.button}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '45%'
  },
  button: {
    width: '50%',
    padding: 10,
  },
  inputContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    height: 40,
    width: '80%',
    padding: 10
  },
  text: {
    textAlign: 'center',
    padding: 10
  }
})

const mapStateToProps = (state) => {
  const { location } = state
  return { location }
}

export default connect(mapStateToProps)(ObservationComponent)