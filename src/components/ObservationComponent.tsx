import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Colors from '../styles/Colors'
import { getSchema, getUISchema } from '../controllers/formController'
import storageController from '../controllers/storageController'
import { parse } from '../../SchemaToFormParser'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'



const ObservationComponent = (props) => {

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

  // Check if schemas have been fetched
  if (schema == null || UISchema == null) {
    return <View><Text>Ladataan...</Text></View>
  } else {
    return (
      <View style={Cs.observationContainer}>
        <ScrollView>
          <Text style={Ts.speciesText}>{t('species')}: {t('flying squirrel')}</Text>
          <View>
            {parse(schema)}
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
