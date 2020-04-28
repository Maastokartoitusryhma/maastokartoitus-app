import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import Modal from 'react-native-modal'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import Bs from '../styles/ButtonStyles'
import { connect, ConnectedProps } from 'react-redux'
import { 
  allObservationEvents,
  replaceObservationEvents, 
  setObservationId
} from '../stores/observation/actions'
import { getPersonToken } from '../stores/user/actions'
import { setMessageVisibilityTrue, setMessageContent } from '../stores/other/actions'
import { useTranslation } from 'react-i18next'
import ObservationInfoComponent from './ObservationInfoComponent'
import { postObservationEvent } from '../controllers/documentController'
import storageController from '../controllers/storageController'
import MessageComponent from './MessageComponent' 
import { parseDateForUI } from '../utilities/dateHelper'
import _ from 'lodash'
import Colors from '../styles/Colors'

type UserObject = {
  id: string
  fullName: string
  emailAddress: string
  defaultLanguage: string
}

interface BasicObject {
  [key: string]: any
}

interface RootState {
  observationEvent: any[]
  observationId: BasicObject
  user: UserObject
  token: string
  message: BasicObject
}

const mapStateToProps = (state: RootState) => {
  const { observationEvent, observationId, user, token, message } = state
  return { observationEvent, observationId, user, token, message }
}

const mapDispatchToProps = {
  allObservationEvents,
  setObservationId,
  getPersonToken,
  setMessageVisibilityTrue,
  setMessageContent,
  replaceObservationEvents 
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  id: string
  onPressObservation: () => void
  onPressObservationEvent: () => void
}

const ObservationEventComponent = (props: Props) => {

  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState({
    eventId: null,
    unitId: null
  })
  const event: BasicObject = props.observationEvent.find(e => e.id === props.id)
  const observations: BasicObject[] = event.schema.gatherings[0].units

  //delete observation from correct event, replace reducer and asyncStorage
  //events with new modified list
  const deleteObservation = () => {
    let events = _.cloneDeep(props.observationEvent)
    events.forEach(event => {
      if(event.id === id.eventId) {
        const units = _.cloneDeep(event.schema.gatherings[0].units)
        event.schema.gatherings[0].units = units.filter((unit: any) => 
          unit.id !== id.unitId
        )
      }
    })
    props.replaceObservationEvents(events)
    storageController.save('observationEvents', events)
  }

  if (event === null || observations === []) {
    return (
      <View>
        <Text>{t('loading')}</Text>
      </View>
    )
  } else {
    return (
      <View style={Cs.singleObservationEventContainer}>
        <ScrollView>
          <View style={Cs.eventTopContainer}>
            <View style={Cs.eventTextContainer}>
              <Text>{t('dateBegin')}: {parseDateForUI(event.schema.gatheringEvent.dateBegin)}</Text>
              <Text>{t('dateEnd')}: {parseDateForUI(event.schema.gatheringEvent.dateEnd)}</Text>
              <Text>{t('Zone')}: {event.schema.gatherings[0].locality}</Text>
            </View>
            <View style={Cs.eventButtonsContainer}>
              <Button
                buttonStyle={Bs.editEventButton}
                containerStyle={Cs.padding5Container}
                icon={<Icon name='edit' type='material-icons' color='white' size={22} />}
                onPress={() => {
                  const id = {
                    eventId: event.id,
                    unitId: ''
                  }
                  props.setObservationId(id)
                  props.onPressObservationEvent()
                }}
              />
              <Button
                buttonStyle={Bs.sendEventButton}
                icon={<Icon name='send' type='material-icons' color='white' size={22} />}
                onPress={() => {
                  postObservationEvent(event, props.token, props.setMessageVisibilityTrue, props.setMessageContent)
                }}
              />
            </View>
          </View>
          <Text style={Ts.observationText}>{t('Observations')}:</Text>
          {observations.map(observation =>
            <View key={observation.id}>
              <ObservationInfoComponent
                event={event}
                observation={observation}
                editButton={
                  <Button
                    buttonStyle={Bs.editObservationButton}
                    title={t('edit button')}
                    iconRight={true}
                    icon={<Icon name='edit' type='material-icons' color='white' size={22} />}
                    onPress={() => {
                      const id = {
                        eventId: event.id,
                        unitId: observation.id
                      }
                      props.setObservationId(id)
                      props.onPressObservation()
                    }}
                  />
                }
                removeButton={
                  <Button
                    buttonStyle={Bs.basicNegativeButton}
                    title={t('remove button')}
                    iconRight={true}
                    icon={<Icon name='delete' type='material-icons' color='white' size={22} />}
                    onPress={() => {
                      setShowModal(!showModal)
                      setId({
                        eventId: event.id, 
                        unitId: observation.id
                      })
                    }}
                  />
                }
              />
              <View style={{padding: 5}}></View>
            </View>
          )}
          <Modal isVisible={showModal}>
            <View style={Cs.observationAddModal}>
              <Text style={Cs.containerWithJustPadding}>{t('remove observation')}</Text>
              <View style={Cs.editObservationButtonContainer}>
                <View style={Cs.singleButton}>
                  <Button
                    title='OK'
                    buttonStyle={Bs.basicNeutralButton}
                    onPress={() => {
                      deleteObservation()
                      setShowModal(!showModal)
                      setId({
                        eventId: null,
                        unitId: null
                      })
                    }}
                  />
                </View>
                <View style={Cs.singleButton}>
                  <Button
                    title='Cancel'
                    buttonStyle={Bs.basicNegativeButton}
                    onPress={() => {
                      setShowModal(!showModal)
                      setId({
                        eventId: null,
                        unitId: null
                      })
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
          <MessageComponent onPress={null}/>
        </ScrollView>
      </View>
    )
  }
}

export default connector(ObservationEventComponent)

