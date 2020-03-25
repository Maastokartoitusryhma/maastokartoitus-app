import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { connect, ConnectedProps } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Point } from 'geojson'
import storageController from '../controllers/storageController'
import { replaceObservationEvents } from '../stores/observation/actions'
import ObservationForm from '../forms/ObservationForm'
import TrackObservationForm from '../forms/TrackObservationForm'
import FecesObservationForm from '../forms/FecesObservationForm'
import NestObservationForm from '../forms/NestObservationForm'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import Colors from '../styles/Colors'
import Modal from 'react-native-modal'
import _ from 'lodash'

interface RootState {
  observation: Point
  observationEvent: any[]
}

const mapStateToProps = (state: RootState) => {
  const { observation, observationEvent } = state
  return { observation, observationEvent }
}

const mapDispatchToProps = {
  replaceObservationEvents
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  onPress: () => void
  eventID: string
  observationID: string
  type: string
}


const EditObservationComponent = (props: Props) => {
  const [ events, setEvents ] = useState(null)
  const [ indexOfEditedEvent, setIndexOfEditedEvent ] = useState(null)
  const [ event, setEvent ] = useState(null)
  const [ observations, setObservations ] = useState(null)
  const [ indexOfEditedObservation, setIndexOfEditedObservation ] = useState(null)
  const [ observation, setObservation ] = useState(null)

  useEffect(() => {
    initVariables()
    loadSchemaAndSetForm()
  }, [])

  const initVariables = () => {
    //clone events from reducer for modification
    const eventClone = _.cloneDeep(props.observationEvent)
    setEvents(eventClone)
    //find the correct event by id
    const eventIndex = eventClone.findIndex(event => event.id === props.eventID)
    setIndexOfEditedEvent(eventIndex)
    const searchedEvent = eventClone[eventIndex]
    setEvent(searchedEvent)
    //find the correct observation by id
    const observationsClone = searchedEvent.schema.gatherings[0].units
    setObservations(observationsClone)
    const observationIndex = observationsClone.findIndex(observation => observation.id === props.observationID)
    setIndexOfEditedObservation(observationIndex)
    const observationClone = observationsClone[observationIndex]
    setObservation(observationClone)

    console.log('EVENT: ', event)
    console.log('OBS: ', observation)
  }

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

    console.log('REGISTER DATA:', JSON.stringify(data))
    console.log('EVENT BEFORE:', props.observationEvent)

    //replace the data of the unit that's being edited while keeping its id, unitGathering and type values
    const editedUnit = {
      id: props.observationID,
      ...data,
      unitGathering: observation.unitGathering,
      type: props.type
    }

    events[indexOfEditedEvent].schema.gatherings[0].units[indexOfEditedObservation] = editedUnit

    //replace events with modified list
    props.replaceObservationEvents(events)
    
    console.log('EVENT AFTER:', props.observationEvent)

    storageController.save('observationEvents', events)
    
    setShowModal(true)
  }

  const loadSchemaAndSetForm = async () => {
    console.log('load: ', observation)
    if(props.type === 'observation') {
      setForm(ObservationForm(register, setValue, watch, errors, unregister, observation))
    } else if(props.type === 'trackObservation') {
      setForm(TrackObservationForm(register, setValue, watch, errors, unregister, observation))
    } else if(props.type === 'fecesObservation') {
      setForm(FecesObservationForm(register, setValue, watch, errors, unregister, observation))
    } else if(props.type === 'nestObservation') {
      setForm(NestObservationForm(register, setValue, watch, errors, unregister, observation))
    }
  }

  if (form === undefined) {
    loadSchemaAndSetForm()
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
            <Button title={t('edit observation')} onPress={handleSubmit(onSubmit)} color={Colors.positiveButton}/>
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

export default connector(EditObservationComponent)