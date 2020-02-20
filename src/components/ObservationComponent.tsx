import React, { useState, useEffect } from 'react'
import { View, Button, Text, ScrollView } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Colors from '../styles/Colors'
import { getSingleObservationSchema, getUISchema } from '../controllers/formController'
import storageController from '../controllers/storageController'
import { parseSchemaToForm } from '../../SchemaToFormParser'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'

const ObservationComponent = (props) => {

  //For react-hook-form
  const { control, handleSubmit, errors, register } = useForm()
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text, 
    }
  }

  const { t } = useTranslation()

  const [singleObservationSchema, setSingleObservationSchema] = useState(null)
  const [UISchema, setUISchema] = useState(null)

  // Fetch schemas
  useEffect(() => {
    loadSingleObservationSchema()
    //loadUISchema()
  }, [])

  const loadSingleObservationSchema = async () => {
    const fetchedSchema = await getSingleObservationSchema() 
    if (fetchedSchema !== null) {
      setSingleObservationSchema(fetchedSchema) 
    }
  }
  /*
    const loadUISchema = async () => {
      const fetchedUISchema = await getUISchema()
      if (fetchedUISchema !== null) {
        setUISchema(fetchedUISchema)
      }
    }*/

  const validate = (formData, errors) => {
    if (formData.count === undefined) {
      errors.count.addError(t('required field'))
    }
    return errors
  }

  // Check if schemas have been fetched
  if (singleObservationSchema == null) {
    return <View><Text>Ladataan...</Text></View>
  } else {
    return (
      <View style={Cs.observationContainer}>
        <ScrollView>
          <Text style={Ts.speciesText}>{t('species')}: {t('flying squirrel')}</Text>
          <View>
            {parseSchemaToForm(singleObservationSchema)}
            <Button onPress={() => console.log('ADD NEW OBSERVATION')} title='ADD'></Button>
          </View>
        </ScrollView>
      </View>
    )
  }
  /*


  const onSave = async data => {
    storageController.save((data.date + '/' + data.time + '/' + data.species), JSON.stringify(data))
    setKey(data.date + '/' + data.time + '/' + data.species)
  }
  const onFetch = async () => {
    storageController.fetch(key)
  }

  const onReset = async () => storageController.clear()

  let today = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()
  let now = new Date().getHours() + ':' + (new Date().getMinutes()) + ':' + new Date().getSeconds()
  const observationLocation = props.location ? `${props.location.coords.latitude} lat, ${props.location.coords.longitude} long` : ''

  
  */
}

const mapStateToProps = (state) => {
  const { location } = state
  return { location }
}

export default connect(mapStateToProps)(ObservationComponent)
