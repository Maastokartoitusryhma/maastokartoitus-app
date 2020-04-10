import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import { useForm } from 'react-hook-form'
import { connect, ConnectedProps } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Point } from 'geojson'
import storageController from '../controllers/storageController'
import { replaceObservationEvents, clearObservationId } from '../stores/observation/actions'
import { setEditing } from '../stores/map/actions'
import { setObservationLocation, clearObservationLocation } from '../stores/observation/actions'
import ObservationForm from '../forms/ObservationForm'
import TrackObservationForm from '../forms/TrackObservationForm'
import FecesObservationForm from '../forms/FecesObservationForm'
import NestObservationForm from '../forms/NestObservationForm'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import Colors from '../styles/Colors'
import Modal from 'react-native-modal'
import _ from 'lodash'
import ImagePickerComponent from './ImagePickerComponent'


interface BasicObject {
  [key: string]: any
}

interface RootState {
  observation: Point
  observationEvent: any[]
  observationId: BasicObject
  editing: boolean[]
}

const mapStateToProps = (state: RootState) => {
  const { observation, observationEvent, observationId, editing } = state
  return { observation, observationEvent, observationId, editing }
}

const mapDispatchToProps = {
  replaceObservationEvents,
  clearObservationId,
  setEditing,
  setObservationLocation,
  clearObservationLocation,
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  onPress: (id: string) => void,
  onEditLocation: () => void
}


const EditObservationComponent = (props: Props) => {
  const [ indexOfEditedEvent, setIndexOfEditedEvent ] = useState<number>(-1)
  const [ indexOfEditedObservation, setIndexOfEditedObservation ] = useState<number>(-1)
  const [ showModal, setShowModal ] = useState<boolean>(false)
  const [ form, setForm ] = useState<any | null>(null)
  const [ observation, setObservation ] = useState<BasicObject | null>(null)
  const [ events, setEvents ] = useState<any[]>([])
  const [ image, setImage ] = useState<string>('')
  const [ eventId, setEventId ] = useState<string>('')

  const { handleSubmit, setValue, unregister, errors, watch, register } = useForm()
  const { t } = useTranslation()

  useEffect(() => {
    init()
    // Cleanup when component unmounts, ensures that if navigator back-button
    // is used observationLocation and editing-flags are returned to defaults
    return () => {
      props.clearObservationLocation()
      props.setEditing([false, false])
      console.log("CLEANUP FIRED")
    }
  }, [])

  const init = () => {
    // clone events from reducer for modification
    const eventsClone: any[] = _.cloneDeep(props.observationEvent)
    setEvents(eventsClone)
    // find the correct event by id
    const eventIndex: number = eventsClone.findIndex((event: BasicObject) => event.id === props.observationId.eventId)
    setIndexOfEditedEvent(eventIndex)
    const searchedEvent: BasicObject = eventsClone[eventIndex]
    // find the correct observation by id
    const observationsClone = searchedEvent.schema.gatherings[0].units
    const observationIndex: number = observationsClone.findIndex((observation: BasicObject) => observation.id === props.observationId.unitId)
    setIndexOfEditedObservation(observationIndex)
    const observationClone = observationsClone[observationIndex]
    setObservation(observationClone)
    const imageClone = observationsClone[observationIndex].image
    setImage(imageClone)
    setEventId(props.observationId.eventId)
  }


  const onSubmit = (data: { [key: string]: any }) => {
    if (observation !== null) {
      if (!('taxonConfidence' in data)) {
        data['taxonConfidence'] = 'MY.taxonConfidenceSure'
      }
      if (!('identifications' in data)) {
        data['identifications'] = [{'taxonID': 'MX.48243'}]
      }
      if (!('recordBasis' in data)) {
        data['recordBasis'] = 'MY.recordBasisHumanObservationIndirect'
      }
      if (observation.type === 'fecesObservation') {
        data['indirectObservationType'] = 'MY.indirectObservationTypeFeces'
      }

      // console.log('REGISTER DATA:', JSON.stringify(data))
      // console.log('EVENT BEFORE:', props.observationEvent)
  
      // replace the data of the unit that's being edited while keeping its id, unitGathering and type values
      const editedUnit = observation.type === 'fecesObservation' ? {
        id: observation.id,
        type: observation.type,
        identifications: data.identifications,
        indirectObservationType: data.indirectObservationType,
        recordBasis: data.recordBasis,
        taxonConfidence: data.taxonConfidence,
        notes: data.notes,
        unitGathering: observation.unitGathering,
        unitFact: {
          lolifeDroppingsQuality: data.lolifeDroppingsQuality,
          lolifeDroppingsType: data.lolifeDroppingsType,
          lolifeDroppingsCount: data.lolifeDroppingsCount,
        },
        image: image
      } : {
        id: observation.id,
        type: observation.type,
        ...data,
        unitGathering: observation.unitGathering,
        image: image
      }

      // if editing-flag 1st and 2nd elements are true replace location with new location, and clear editing-flag
      if (props.editing[0] && props.editing[1]) {
        props.observation ? editedUnit.unitGathering.geometry = props.observation : null
        props.clearObservationLocation()
        props.setEditing([false, false])
        console.log('LOC MODIFIED')
      }
      events[indexOfEditedEvent].schema.gatherings[0].units[indexOfEditedObservation] = editedUnit
  
      // replace events with modified list
      props.replaceObservationEvents(events)
      
      // console.log('EVENT AFTER:', props.observationEvent)
  
      storageController.save('observationEvents', events)
      props.clearObservationId()
      setShowModal(true)
    }
    
  }

  

  const loadSchemaAndSetForm = async () => {
    if (observation !== null) {
      if (observation.type === 'observation') {
        setForm(ObservationForm(register, setValue, watch, errors, unregister, observation, t))
      } else if (observation.type === 'trackObservation') {
        setForm(TrackObservationForm(register, setValue, watch, errors, unregister, observation, t))
      } else if (observation.type === 'fecesObservation') {
        setForm(FecesObservationForm(register, setValue, watch, errors, unregister, observation, t))
      } else if (observation.type === 'nestObservation') {
        setForm(NestObservationForm(register, setValue, watch, errors, unregister, observation, t))
      }
    }
  }

  // redirects navigator to map for selection of new observation location
  const handleChangeToMap = () => {
    if (observation !== null) {
      props.setObservationLocation(observation.unitGathering.geometry)
      props.setEditing([true, false])
      props.onEditLocation()
    }
  }

  if (form === null) {
    loadSchemaAndSetForm()
    return <View><Text>Ladataan...</Text></View>
  } else {
    return (
      <View style={Cs.observationContainer}>
        <ScrollView>
          <ImagePickerComponent image={image} setImage={setImage} />
          <Text style={Ts.speciesText}>{t('species')}: {t('flying squirrel')}</Text>
          <View style={Cs.buttonContainer}>
            <Button title={t('edit location')} onPress={() => handleChangeToMap()}></Button>
          </View>
          <View style={Cs.formContainer}>
            {form}
          </View>
          <View style={Cs.formSaveButtonContainer}>
            <Button title={t('save')} onPress={handleSubmit(onSubmit)} color={Colors.positiveButton}/>
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
                  props.onPress(eventId)
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