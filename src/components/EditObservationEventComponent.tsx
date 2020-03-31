import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { connect, ConnectedProps } from 'react-redux'
import { useTranslation } from 'react-i18next'
import storageController from '../controllers/storageController'
import { replaceObservationEvents, clearObservationId } from '../stores/observation/actions'
import ObservationEventForm from '../forms/ObservationEventForm'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import Colors from '../styles/Colors'
import Modal from 'react-native-modal'
import _ from 'lodash'

interface RootState {
  observationEvent: any[]
  observationId: object
}

const mapStateToProps = (state: RootState) => {
  const { observationEvent, observationId } = state
  return { observationEvent, observationId }
}

const mapDispatchToProps = {
  replaceObservationEvents,
  clearObservationId
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  onPress: () => void
}

const EditObservationEventComponent = (props: Props) => {
  const [ events, setEvents ] = useState(null)
  const [ indexOfEditedEvent, setIndexOfEditedEvent ] = useState(null)
  const [ event, setEvent ] = useState(null)
  //For react-hook-form
  const { handleSubmit, setValue, unregister, errors, watch, register } = useForm()
  const { t } = useTranslation()
  const [form, setForm] = useState()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    //clone events from reducer for modification
    const eventsClone = _.cloneDeep(props.observationEvent)
    setEvents(eventsClone)
    //find the correct event by id
    const eventIndex = eventsClone.findIndex(event => event.id === props.observationId.eventId)
    setIndexOfEditedEvent(eventIndex)
    const searchedEvent = eventsClone[eventIndex]
    setEvent(searchedEvent)

    //set the form
    setForm(ObservationEventForm(register, setValue, watch, errors, unregister, searchedEvent.schema))
  }

  const onSubmit = (data: { [key: string]: any }) => {
    console.log('REGISTER DATA:', JSON.stringify(data))
    console.log('EVENT BEFORE:', props.observationEvent)

    let legPublic = data.legPublic
    if(data.legPublic === 'true') {
      legPublic = true
    } else {
      legPublic = false
    }

    const editedSchema = {
      editors: data.editors,
      secureLevel: data.secureLevel,
      gatheringEvent: {
        leg: data.leg,
        legPublic: legPublic,
        dateBegin: data.dateBegin,
        dateEnd: data.dateEnd
      },
      keywords: data.keywords,
      gatherings: event.schema.gatherings
    }

    const editedEvent = {
      id: event.id,
      sentToServer: event.sentToServer,
      schema: editedSchema
    }

    events[indexOfEditedEvent] = editedEvent

    //replace events with modified list
    props.replaceObservationEvents(events)

    storageController.save('observationEvents', events)
    props.clearObservationId()
    setShowModal(true)
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
            <Button title={t('edit observation event')} onPress={handleSubmit(onSubmit)} color={Colors.positiveButton}/>
          </View>
          <Modal isVisible={showModal}>
            <View style={Cs.observationAddModal}>
              <Text style={Cs.containerWithJustPadding}>{t('observation event saved')}</Text>
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

export default connector(EditObservationEventComponent)