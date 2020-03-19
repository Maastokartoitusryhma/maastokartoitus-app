import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import { useForm } from 'react-hook-form'
import { connect, ConnectedProps } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Point } from 'geojson'
import { getSingleObservationSchema } from '../controllers/formController'
import storageController from '../controllers/storageController'
import { newObservationEvent, clearObservationLocation } from '../stores/observation/actions'
import { parseSchemaToForm } from '../parsers/SchemaToFormParser'
import ObservationForm from '../forms/ObservationForm'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import Colors from '../styles/Colors'

interface RootState {
  observation: Point
  observationEvent: any[]
}

const mapStateToProps = (state: RootState) => {
  const { observation, observationEvent } = state
  return { observation, observationEvent }
}

const mapDispatchToProps = {
  newObservationEvent,
  clearObservationLocation
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>

const ObservationComponent = (props: PropsFromRedux) => {

  //For react-hook-form
  const { handleSubmit, setValue, unregister, errors, watch, register } = useForm()
  const { t } = useTranslation()
  const [form, setForm] = useState()

  const onSubmit = (data: Object) => {
    console.log('REGISTER DATA:', JSON.stringify(data))
    console.log('EVENT BEFORE:', props.observationEvent)
    const events = props.observationEvent
    const event = events.pop()
    console.log('EVENT OBJECT BEFORE: ', event)
    event.schema.gatherings[0].units.push(data)
    //event.gatherings[0].units.unitGathering.geometry.push(props.observation)
    console.log('EVENT OBJECT AFTER: ', event)
    events.push(event)
    props.newObservationEvent(event)
    console.log('EVENT AFTER:', props.observationEvent)

    props.clearObservationLocation()

    //AsyncStorage
    storageController.save('observationEvents', events)
  }

  // Fetch schemas
  useEffect(() => {
    loadSchemaAndSetForm()
  }, [])

  const loadSchemaAndSetForm = async () => {
    const fetchedSchema = await getSingleObservationSchema(t('language')) 
    if (fetchedSchema !== null) {
      //setForm(parseSchemaToForm(fetchedSchema, register, setValue, watch, errors, unregister))
      setForm(ObservationForm(register, setValue, watch, errors, unregister))
    }
  }

  if (form === undefined) {
    return <View><Text>Ladataan...</Text></View>
  } else {
    return (
      <View style={Cs.observationContainer}>
        <ScrollView>
          <Text style={Ts.speciesText}>{t('species')}: {t('flying squirrel')}</Text>
          <View style={Cs.formContainer}>
            {form}
          </View>
          <View style={Cs.formSaveButtonContainer}>
            <Button title={t('save observation')} onPress={handleSubmit(onSubmit)} color={Colors.positiveButton}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default connector(ObservationComponent)
