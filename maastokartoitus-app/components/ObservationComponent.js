import React from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'
import Colors from '../constants/colors'
import Form from 'react-native-jsonschema-form'
import { getSchema, getUISchema } from '../controllers/formController'
import { save, fetch, clear } from '../dao/DAO'

const ObservationComponent = (props) => {
  const { control, handleSubmit, errors } = useForm()
  //const onSubmit1 = data => save(data)
  //const onSubmit2 = () => fetch()
  //const onSubmit3 = () => clear()
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    }
  }
  let today = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()
  let now = new Date().getHours() + ':' + (new Date().getMinutes()) + ':' + new Date().getSeconds()
  const observationLocation = props.location ? `${props.location.coords.latitude} lat, ${props.location.coords.longitude} long` : ''

  const fetchedSchema = getSchema()
  const fetchedUISchema = getUISchema()

  // const transformErrors = (errors) => {
  //   let returnErrors = _.filter(errors, error => {
  //     console.log('error', error.property)
  //     return (error.message === 'is a required property')
  //   })
  //   return returnErrors
  // }

  return (
    <View style={styles.container}>
      <View style={styles.notch}></View>
      <Form
        schema={fetchedSchema}
        uiSchema={fetchedUISchema}
        //transformErrors={transformErrors}
        onSubmit={(submited) => {
          Alert.alert(
            'Submitted',
            JSON.stringify(submited.formData))
        }}
        noValidate={false}
        liveValidate={true}
        showErrorList={false}
      />
    </View>
  )
}

//<Button onPress = { handleSubmit(onSubmit1) } title = 'Tallenna' style = { styles.button }></Button>
//<Button onPress = { handleSubmit(onSubmit2) } title = 'Hae'      style = { styles.button }></Button>
//<Button onPress = { handleSubmit(onSubmit3) } title = 'Nollaa'   style = { styles.button }></Button>

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
  button: {
    width: '50%',
    padding: 10,
  },
  notch: {
    width: '100%',
    height: 15
  }
})

const mapStateToProps = (state) => {
  const { location } = state
  return { location }
}

export default connect(mapStateToProps)(ObservationComponent)

// <View style = { styles.container }>
    //   <View style={ styles.inputContainer }>
    //     <Text style= { styles.text }>Laji</Text>
    //     <Controller as = { <TextInput style = { styles.input }/> }
    //       control = { control }
    //       name = 'species'
    //       onChange = { onChange }
    //       rules = {{ required: true }}
    //       defaultValue = 'Liito-orava'
    //       placeholder = 'Laji'
    //     />
    //   </View>
    //   { errors.species && <Text>Pakollinen kenttä.</Text> }
    //   <View style={ styles.inputContainer }>
    //     <Text style= { styles.text }>Sijainti</Text>
    //     <Controller as = { <TextInput style = { styles.input }/> }
    //       control = { control }
    //       onChange = { onChange }
    //       name = 'location'
    //       rules = {{ required: true }}
    //       defaultValue = { observationLocation }
    //     />
    //   </View>
    //   { errors.location && <Text>Pakollinen kenttä.</Text> }
    //   <View style={styles.inputContainer}>
    //     <Text style= { styles.text }>Päivä</Text>
    //     <Controller as = { <TextInput style = { styles.input }/> }
    //       control = { control }
    //       onChange = { onChange }
    //       name = 'date'
    //       rules = {{ required: true }}
    //       defaultValue = { today }
    //     />
    //     { errors.date && <Text>Pakollinen kenttä.</Text> }
    //   </View>

    //   <View style={styles.inputContainer}>
    //     <Text style={ styles.text }>Aika</Text>
    //     <Controller as = { <TextInput style = { styles.input }/> }
    //       control = { control }
    //       onChange = { onChange }
    //       name = 'time'
    //       rules = {{ required: true }}
    //       defaultValue = {now}
    //     />
    //     { errors.time && <Text>Pakollinen kenttä.</Text> }
    //   </View>

    //   <View style={styles.inputContainer}>
    //     <Text style={ styles.text }>Lisätietoja</Text>
    //     <Controller as = { <TextInput style = { styles.input }/> }
    //       control = { control }
    //       onChange = { onChange }
    //       name = 'info'
    //       defaultValue = ''
    //     />
    //   </View>
    // </View>