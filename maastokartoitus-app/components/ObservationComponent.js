import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'
import Colors from '../constants/colors'
import DAO from '../dao/DAO'

const ObservationComponent = (props) => {
  const [key, setKey] = useState('')
  const { control, handleSubmit, errors } = useForm()

  const onSave = async data => {
    DAO.save((data.date + '/' + data.time + '/' + data.species), JSON.stringify(data))
    setKey(data.date + '/' + data.time + '/' + data.species)
  }
  const onFetch = async () => {
    DAO.fetch(key)
  }

  const onReset = async () => DAO.clear()

  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    }
  }
  let today = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()
  let now = new Date().getHours() + ':' + (new Date().getMinutes()) + ':' + new Date().getSeconds()
  const observationLocation = props.location ? `${ props.location.coords.latitude } lat, ${ props.location.coords.longitude } long` : ''

  return (
    <View style = { styles.container }>
      <View style={ styles.inputContainer }>
        <Text style= { styles.text }>Laji</Text>
        <Controller as = { <TextInput style = { styles.input }/> }
          control = { control }
          name = 'species'
          onChange = { onChange }
          rules = {{ required: true }}
          defaultValue = 'Liito-orava'
          placeholder = 'Laji'
        />
      </View>
      { errors.species && <Text style={styles.validationText}>Pakollinen kenttä.</Text> }
      <View style={ styles.inputContainer }>
        <Text style= { styles.text }>Sijainti</Text>
        <Controller as = { <TextInput style = { styles.input }/> }
          control = { control }
          onChange = { onChange }
          name = 'location'
          rules = {{ required: true }}
          defaultValue = { observationLocation }
        />
      </View>
      { errors.location && <Text style={styles.validationText}>Pakollinen kenttä.</Text> }
      <View style={styles.inputContainer}>
        <Text style= { styles.text }>Päivä</Text>
        <Controller as = { <TextInput style = { styles.input }/> }
          control = { control }
          onChange = { onChange }
          name = 'date'
          rules = {{ required: true }}
          defaultValue = { today }
        />
      </View>
      { errors.date && <Text style={styles.validationText}>Pakollinen kenttä.</Text> }
      <View style={styles.inputContainer}>
        <Text style={ styles.text }>Aika</Text>
        <Controller as = { <TextInput style = { styles.input }/> }
          control = { control }
          onChange = { onChange }
          name = 'time'
          rules = {{ required: true }}
          defaultValue = {now}
        />
      </View>
      { errors.time && <Text style={styles.validationText}>Pakollinen kenttä.</Text> }

      <View style={styles.inputContainer}>
        <Text style={ styles.text }>Lisätietoja</Text>
        <Controller as = { <TextInput style = { styles.input }/> }
          control = { control }
          onChange = { onChange }
          name = 'info'
          defaultValue = ''
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress = { handleSubmit(onSave) } title = 'Tallenna'></Button>
        <Button onPress = { handleSubmit(onFetch) } title = 'Hae'></Button>
        <Button onPress = { handleSubmit(onReset) } title = 'Nollaa'></Button>
      </View>
      
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  input: {
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    textAlign: 'justify'
  },
  text: {
    fontWeight: 'bold'
  },
  buttonContainer: {
    flex: 3,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  validationText: {
    padding: 10,
    color: Colors.negativeColor
  }
})

const mapStateToProps = (state) => {
  const { location } = state
  return { location }
}

export default connect(mapStateToProps)(ObservationComponent)