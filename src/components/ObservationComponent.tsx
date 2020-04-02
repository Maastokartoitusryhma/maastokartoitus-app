import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button, Alert, Image } from 'react-native'
import { useForm } from 'react-hook-form'
import { connect, ConnectedProps } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Point } from 'geojson'
import storageController from '../controllers/storageController'
import { replaceObservationEvents, clearObservationLocation, removeFromObservationLocations } from '../stores/observation/actions'
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
import * as ImagePicker from 'expo-image-picker'

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
    initForm()
  }, [])

  //For react-hook-form
  const { handleSubmit, setValue, unregister, errors, watch, register } = useForm()
  const { t } = useTranslation()
  const [form, setForm] = useState()
  const [showModal, setShowModal] = useState(false)
  const [image, setImage] = useState('')

  const attachImage = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()
    if (permissionResult.granted === false) {
      return false
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync()
    let succeeded : boolean = !pickerResult.cancelled
    if (succeeded) {
      setImage(pickerResult.uri)
      console.log("image: " + image)
    }
    return succeeded
  }

  const useCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (permissionResult.granted === false) {
      return false
    }

    let pickerResult = await ImagePicker.launchCameraAsync()
    let succeeded : boolean = !pickerResult.cancelled
    if (succeeded) {
      setImage(pickerResult.uri)
      console.log("image: " + image)
    }
    return succeeded
  }

  const onSubmit = (data: { [key: string]: any }) => {
    //all observations must have taxon confidence field so it is added here if it's missing
    if (!('taxonConfidence' in data)) {
      data['taxonConfidence'] = 'MY.taxonConfidenceSure'
    }
    //all observations must have the flying squirrel taxon id so it is added here if it's missing
    if (!('identifications' in data)) {
      data['identifications'] = [{'taxonID': 'MX.48243'}]
    }
    //record basis is indirect observation by default
    if (!('recordBasis' in data)) {
      data['recordBasis'] = 'MY.recordBasisHumanObservationIndirect'
    }
    //indirect observation type is feces by default if the observation type is feces
    if (props.type === 'fecesObservation') {
      data['indirectObservationType'] = 'MY.indirectObservationTypeFeces'
    }
    
    console.log('POINT:', props.observation)
    console.log('REGISTER DATA:', data)
    console.log('EVENT BEFORE:', props.observationEvent)
    console.log('LOCATIONS', props.observationLocations)
    console.log('IMAGE:', image)

    //clone events from reducer for modification
    const events = _.cloneDeep(props.observationEvent)
    const event = events.pop()

    //Add observation location and selected image to rest of observation parameters
    const newUnit = props.type === 'fecesObservation' ? {
      id: 'observation_' + uuid.v4(),
      type: props.type,
      identifications: data.identifications,
      indirectObservationType: data.indirectObservationType,
      recordBasis: data.recordBasis,
      taxonConfidence: data.taxonConfidence,
      unitGathering: {
        geometry: props.observation
      },
      unitFact: {
        lolifeDroppingsQuality: data.lolifeDroppingsQuality,
        lolifeDroppingsType: data.lolifeDroppingsType,
        lolifeDroppingsCount: data.lolifeDroppingsCount,
      },
      image: image
    } : {
      id: 'observation_' + uuid.v4(),
      type: props.type,
      ...data,
      unitGathering: {
        geometry: props.observation
      },
      image: image
    }

    console.log('NEW UNIT:', newUnit)
    event.schema.gatherings[0].units.push(newUnit)
    events.push(event)

    //replace events with the modified copy
    props.replaceObservationEvents(events)

    console.log('EVENT AFTER:', props.observationEvent)

    storageController.save('observationEvents', events)
    props.clearObservationLocation()
    setShowModal(true)
  }

  const initForm = async () => {
    if(props.type === 'observation') {
      setForm(ObservationForm(register, setValue, watch, errors, unregister, undefined, t))
    } else if(props.type === 'trackObservation') {
      setForm(TrackObservationForm(register, setValue, watch, errors, unregister, undefined, t))
    } else if(props.type === 'fecesObservation') {
      setForm(FecesObservationForm(register, setValue, watch, errors, unregister, undefined, t))
    } else if(props.type === 'nestObservation') {
      setForm(NestObservationForm(register, setValue, watch, errors, unregister, undefined, t))
    }
  }

  if (form === undefined) {
    return <View><Text>Ladataan...</Text></View>
  } else {
    return (
      <View style={Cs.observationContainer}>
        <ScrollView>

          <View style={Cs.formSaveButtonContainer}>
            <Button title={t('attach image')} onPress={attachImage} color={Colors.positiveButton} />
            <Button title={t('use camera')} onPress={useCamera} color={Colors.positiveButton} />
            { image !== ''
              ?
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100 }}
                />
              :
                null
            }
          </View>

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
