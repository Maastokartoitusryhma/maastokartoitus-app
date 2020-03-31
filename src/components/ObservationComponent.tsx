import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { connect, ConnectedProps } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Point } from 'geojson'
import storageController from '../controllers/storageController'
import { replaceObservationEvents, clearObservationLocation, addToObservationLocations, removeFromObservationLocations } from '../stores/observation/actions'
import ObservationForm from '../forms/ObservationForm'
import TrackObservationForm from '../forms/TrackObservationForm'
import FecesObservationForm from '../forms/FecesObservationForm'
import NestObservationForm from '../forms/NestObservationForm'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import Colors from '../styles/Colors'
import Modal from 'react-native-modal'
import _ from 'lodash'
import uuid from 'react-native-uuid'

interface RootState {
  observation: Point
  observationEvent: any[]
  observationLocations: Point[]
}

const mapStateToProps = (state: RootState) => {
  const { observation, observationEvent, observationLocations } = state
  return { observation, observationEvent, observationLocations }
}

const mapDispatchToProps = {
  replaceObservationEvents,
  clearObservationLocation,
  addToObservationLocations,
  removeFromObservationLocations
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  onPress: () => void
  type: string
}

const ObservationComponent = (props: Props) => {

  useEffect(() => {
    props.addToObservationLocations(props.observation)
    initForm()
  }, [])

  //For react-hook-form
  const { handleSubmit, setValue, unregister, errors, watch, register } = useForm()
  const { t } = useTranslation()
  const [form, setForm] = useState()
  const [showModal, setShowModal] = useState(false)

  const onSubmit = (data: { [key: string]: any }) => {
    if(!('taxonConfidence' in data)) {
      data['taxonConfidence'] = 'MY.taxonConfidenceSure'
    }
    if(!('identifications' in data)) {
      data['identifications'] = [{'taxonID': 'MX.48243'}]
    }
    if(!('recordBasis' in data)) {
      data['recordBasis'] = 'MY.recordBasisHumanObservationIndirect'
    }
    if(props.type === 'fecesObservation') {
      data['indirectObservationType'] = 'MY.indirectObservationTypeFeces'
    }
    
    console.log('POINT:', props.observation)
    console.log('REGISTER DATA:', JSON.stringify(data))
    console.log('EVENT BEFORE:', props.observationEvent)
    console.log('LOCATIONS', props.observationLocations)

    //clone events from reducer for modification
    const events = _.cloneDeep(props.observationEvent)
    const event = events.pop()

    //Add observation location to rest of observation parameters
    const newUnit = {
      id: 'observation_' + uuid.v4(),
      ...data,
      unitGathering: {
        geometry: props.observation
      },
      type: props.type 
    }
    event.schema.gatherings[0].units.push(newUnit)
    events.push(event)

    //replace events with modified list
    props.replaceObservationEvents(events)
    console.log('EVENT AFTER:', props.observationEvent)

    props.clearObservationLocation()

    //AsyncStorage
    storageController.save('observationEvents', events)
    setShowModal(true)
  }

  const initForm = async () => {
    if(props.type === 'observation') {
      setForm(ObservationForm(register, setValue, watch, errors, unregister, undefined))
    } else if(props.type === 'trackObservation') {
      setForm(TrackObservationForm(register, setValue, watch, errors, unregister, undefined))
    } else if(props.type === 'fecesObservation') {
      setForm(FecesObservationForm(register, setValue, watch, errors, unregister, undefined))
    } else if(props.type === 'nestObservation') {
      setForm(NestObservationForm(register, setValue, watch, errors, unregister, undefined))
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
          <Modal isVisible={showModal}>
            <View style={Cs.observationAddModal}>
              <Text style={Cs.containerWithJustPadding}>{t('observation saved')}</Text>
              <View style={{ width: '20%'}}>
                <Button
                  title='OK'
                  color={Colors.neutralColor}
                  onPress={() => {
                  setShowModal(!showModal)
                  props.onPress()
                }} />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    )
  }
}

export default connector(ObservationComponent)
