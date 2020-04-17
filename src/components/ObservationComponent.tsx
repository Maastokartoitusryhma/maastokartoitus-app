import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button, Alert, Image } from 'react-native'
import { useForm } from 'react-hook-form'
import { connect, ConnectedProps } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Point } from 'geojson'
import storageController from '../controllers/storageController'
import { replaceObservationEvents, clearObservationLocation } from '../stores/observation/actions'
import { setMessageContent, setMessageVisibilityTrue } from '../stores/other/actions'
import ObservationForm from '../forms/ObservationForm'
import TrackObservationForm from '../forms/TrackObservationForm'
import FecesObservationForm from '../forms/FecesObservationForm'
import NestObservationForm from '../forms/NestObservationForm'
import MessageComponent from './MessageComponent'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import Colors from '../styles/Colors'
import _ from 'lodash'
import uuid from 'react-native-uuid'
import ImagePickerComponent from './ImagePickerComponent'


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
  setMessageContent,
  setMessageVisibilityTrue
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
  const [images, setImages] = useState<string[]>([])

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
    //if observation type is nest, change nestCount to integer
    if(props.type === 'nestObservation') {
      data['nestCount'] = parseInt(data['nestCount'])
    }
    
    //console.log('POINT:', props.observation)
    //console.log('REGISTER DATA:', data)
    //console.log('EVENT BEFORE:', props.observationEvent)
    //console.log('LOCATIONS', props.observationLocations)
    //console.log('IMAGE:', image)

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
      notes: data.notes,
      unitGathering: {
        geometry: props.observation
      },
      unitFact: {
        lolifeDroppingsQuality: data.lolifeDroppingsQuality,
        lolifeDroppingsType: data.lolifeDroppingsType,
        lolifeDroppingsCount: data.lolifeDroppingsCount,
      },
      localImages: images
    } : {
      id: 'observation_' + uuid.v4(),
      type: props.type,
      ...data,
      unitGathering: {
        geometry: props.observation
      },
      localImages: images
    }

    //console.log('NEW UNIT:', newUnit)
    event.schema.gatherings[0].units.push(newUnit)
    events.push(event)

    //replace events with the modified copy
    props.replaceObservationEvents(events)

    //console.log('EVENT AFTER:', props.observationEvent)

    storageController.save('observationEvents', events)
    props.clearObservationLocation()
    props.setMessageContent(t('observation saved'))
    props.setMessageVisibilityTrue()  
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

          <Text style={Ts.speciesText}>{t('species')}: {t('flying squirrel')}</Text>

          <View style={Cs.formContainer}>
            {form}
          </View>

          <ImagePickerComponent images={images} setImages={setImages} />

          <View style={Cs.formSaveButtonContainer}>
            <Button title={t('save observation')} onPress={handleSubmit(onSubmit)} color={Colors.positiveButton}/>
          </View>
          <MessageComponent onPress={props.onPress}/>
        </ScrollView>
      </View>
    )
  }
}

export default connector(ObservationComponent)
