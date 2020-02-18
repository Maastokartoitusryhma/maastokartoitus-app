import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Button, Alert, FlatList, ScrollView } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Colors from '../styles/Colors'
import { getSchema, getUISchema } from '../controllers/formController'
import storageController from '../controllers/storageController'
import { parse } from '../../parser'
import tempSchema from '../../temporaryschema.json'

const ObservationComponent = (props) => {
  //For react-hook-form
  const { control, handleSubmit, errors, register } = useForm()
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    }
  }

  const { t } = useTranslation()

  const [schema, setSchema] = useState(null)
  const [UISchema, setUISchema] = useState(null)

  // Fetch schemas
  useEffect(() => {
    const loadSchema = async () => {
      const fetchedSchema = await getSchema()
      if (fetchedSchema !== null) {
        setSchema(fetchedSchema)
      }
    }
    const loadUISchema = async () => {
      const fetchedUISchema = await getUISchema()
      if (fetchedUISchema !== null) {
        setUISchema(fetchedUISchema)
      }
    }
    loadSchema()
    loadUISchema()
  }, [])

  const validate = (formData, errors) => {
    if (formData.count === undefined) {
      errors.count.addError(t('required field'))
    }
    return errors
  }
/*
  const handleOnChange = (formData) => {
    //console.log('data here', formData)
  }

  const handleSubmit = ({formData}) => {
    console.log('submit data', formData)
  }

  const handleError = (errors) => {
    console.log("I have", errors.length, "errors to fix")
  }
  */
  
  // Check if schemas have been fetched
  if (schema == null || UISchema == null) {
    return <View><Text>Ladataan...</Text></View>
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          {parse(schema)}
        </ScrollView>
      </View>
    )
  }
  /*

return (
      <View style={styles.container}>
        <ScrollView>
        <Text style={styles.text}>{t('species')}: {t('flying squirrel')}</Text>
        <Form
          schema={schema}
          onChange={handleOnChange}
          onSubmit={handleSubmit}
          submitTitle='Submit'
          validate={validate}
          showErrorList={false}
        >
        </Form>
        </ScrollView>
        
        
      </View>
    )




  schema={schema.properties.gatherings.items.properties.units.items}

  const [key, setKey] = useState('')
  const { control, handleSubmit, errors } = useForm()

  const onSave = async data => {
    storageController.save((data.date + '/' + data.time + '/' + data.species), JSON.stringify(data))
    setKey(data.date + '/' + data.time + '/' + data.species)
  }
  const onFetch = async () => {
    storageController.fetch(key)
  }

  const onReset = async () => storageController.clear()

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
import console = require('console');
    <View style={styles.container}>
      <View style={styles.notch}></View>
      <Form
        schema={fetchedSchema}
        //transformErrors={transformErrors}
        onSubmit={(submitted) => {
          Alert.alert(
            'Submitted',
            JSON.stringify(submitted.formData))
        }}
        noValidate={false}
        liveValidate={true}
        showErrorList={false}
      />
    </View>
  )
  */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
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
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonContainer: {
    flex: 3,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  notch: {
    width: '100%',
    height: 15
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
