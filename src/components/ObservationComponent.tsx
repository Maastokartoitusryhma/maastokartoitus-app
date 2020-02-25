import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { getSingleObservationSchema, getUISchema } from '../controllers/formController'
import storageController from '../controllers/storageController'
import { newObservationEvent } from '../stores/observation/actions'
import { parseSchemaToForm } from '../../SchemaToFormParser'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'

const ObservationComponent = (props) => {

  //For react-hook-form
  const { handleSubmit, setValue, errors, register, control } = useForm()
  const { t } = useTranslation()
  const [form, setForm] = useState()

  const onSubmit = data => {
    console.log('EVENT BEFORE:', props.observationEvent)
    const event = props.observationEvent.pop()
    console.log('EVENT OBJECT BEFORE: ', event)
    const changedEvent = {
      ...event
    }
    event.gatherings[0].units.push(data)
    console.log('EVENT OBJECT AFTER: ', event)
    props.newObservationEvent(event)

    console.log('REGISTER DATA:', data)
    console.log('EVENT AFTER:', props.observationEvent)
  }

  // Fetch schemas
  useEffect(() => {
    loadSchemaAndSetForm()
  }, [])

  const loadSchemaAndSetForm = async () => {
    const fetchedSchema = await getSingleObservationSchema() 
    if (fetchedSchema !== null) {
      setForm(parseSchemaToForm(fetchedSchema, setValue, errors, register))
    }
  }

  // Check if schemas have been fetched
  if (form === null) {
    return <View><Text>Ladataan...</Text></View>
  } else {
    return (
      <View style={Cs.observationContainer}>
        <ScrollView>
          <Text style={Ts.speciesText}>{t('species')}: {t('flying squirrel')}</Text>
          <View>
            {form}
            <Button onPress={() => console.log('ADD NEW OBSERVATION')} title='ADD'></Button>
          </View>
          <Button title='testi!' onPress={handleSubmit(onSubmit)} />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { location, observationEvent } = state
  return { location, observationEvent }
}

const mapDispatchToProps = {
  newObservationEvent
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default connector(ObservationComponent)
