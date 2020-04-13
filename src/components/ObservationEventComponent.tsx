import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import { connect, ConnectedProps } from 'react-redux'
import { allObservationEvents, setObservationId } from '../stores/observation/actions'
import { getPersonToken } from '../stores/user/actions'
import { setMessageVisibilityTrue, setMessageContent } from '../stores/other/actions'
import { useTranslation } from 'react-i18next'
import ObservationInfoComponent from './ObservationInfoComponent'
import { postObservationEvent } from '../controllers/documentController'
import MessageComponent from './MessageComponent' 
import Colors from '../styles/Colors'
import { parseDateForUI } from '../utilities/dateHelper'

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
  setMessageContent
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

  const event: BasicObject = props.observationEvent.find(e => e.id === props.id)
  const observations: BasicObject[] = event.schema.gatherings[0].units

  if (event === null || observations === []) {
    return (
      <View>
        <Text>ladataan</Text>
      </View>
    )
  } else {
    return (
      <View style={Cs.singleObservationEventContainer}>
        <ScrollView>
          <Text>{t('dateBegin')}: {parseDateForUI(event.schema.gatheringEvent.dateBegin)}</Text>
          <Text>{t('dateEnd')}: {parseDateForUI(event.schema.gatheringEvent.dateEnd)}</Text>
          <Text>{t('Zone')}: {event.schema.gatherings[0].locality}</Text>
          <Button
            title={'Muokkaa havaintotapahtumaa'}
            color={Colors.neutralButton}
            onPress={() => {
              const id = {
                eventId: event.id,
                unitId: ''
              }
            props.setObservationId(id)
            props.onPressObservationEvent()
            }}
          />
          <View style={{padding: 5}}></View>
          <Button
            title={'Lähetä palvelimelle'}
            color={Colors.neutralButton}
            onPress={() => {
              postObservationEvent(event, props.token, props.setMessageVisibilityTrue, props.setMessageContent)
            }}
          />
          <View style={{padding: 5}}></View>
          <Text style={Ts.observationText}>{t('Observations')}:</Text>
          {observations.map(observation =>
            <View key={observation.id}>
              <ObservationInfoComponent
                observation={observation}
                button={
                  <Button
                    title={t('edit observation')}
                    color={Colors.neutralButton}
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
              />
              <View style={{padding: 5}}></View>
            </View>
          )}
          <MessageComponent onPress={null}/>
        </ScrollView>
      </View>
    )
  }
}

export default connector(ObservationEventComponent)

