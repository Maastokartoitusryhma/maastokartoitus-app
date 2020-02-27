import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import { useForm } from 'react-hook-form'
import { connect, ConnectedProps } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Point } from 'geojson'
import { getSingleObservationSchema, getUISchema } from '../controllers/formController'
import storageController from '../controllers/storageController'
import { newObservationEvent, clearObservationLocation } from '../stores/observation/actions'
import { parseSchemaToForm } from '../parsers/SchemaToFormParser'
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
  const { handleSubmit, setValue, unregister, errors, register, control } = useForm()
  const { t } = useTranslation()
  const [form, setForm] = useState()

  const onSubmit = (data: Object) => {
    console.log('EVENT BEFORE:', props.observationEvent)
    
    const event = props.observationEvent.pop()
    console.log('EVENT OBJECT BEFORE: ', event)
    event.gatherings[0].units.push(data)
    //event.gatherings[0].units.unitGathering.geometry.push(props.observation)
    console.log('EVENT OBJECT AFTER: ', event)
    props.newObservationEvent(event)
    console.log('EVENT AFTER:', props.observationEvent)

    props.clearObservationLocation()

    //AsyncStorage testing with placeholder key.
    storageController.save('item1', event)
    storageController.fetch('item1')
  }

  // Fetch schemas
  useEffect(() => {
    loadSchemaAndSetForm()
  }, [])

  const loadSchemaAndSetForm = async () => {
    const fetchedSchema = await getSingleObservationSchema() 
    if (fetchedSchema !== null) {
      setForm(parseSchemaToForm(fetchedSchema, setValue, unregister, errors, register))
    }
  }

  // Check if schemas have been fetched
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
            <Button onPress={() => console.log('ADD NEW OBSERVATION')} title='SAVE NEW OBSERVATION' color={Colors.positiveButton}></Button>
            <Button title='testi!' onPress={handleSubmit(onSubmit)} />
          </View>
          
        </ScrollView>
      </View>
    )
  }
}

export default connector(ObservationComponent)
