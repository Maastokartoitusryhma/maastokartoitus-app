import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import { connect, ConnectedProps } from 'react-redux'
import { allObservationEvents, setObservationId } from '../stores/observation/actions'
import { useTranslation } from 'react-i18next'
import ObservationInfoComponent from './ObservationInfoComponent'
import Colors from '../styles/Colors'

interface RootState {
  observationEvent: any[]
  observationId: object
}

interface BasicObject {
  [key: string]: any
}

const mapStateToProps = (state: RootState) => {
  const { observationEvent, observationId } = state
  return { observationEvent, observationId }
}

const mapDispatchToProps = {
  allObservationEvents,
  setObservationId
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

  const [event, setEvent] = useState<BasicObject | null>(null)
  const [observations, setObservations] = useState<BasicObject[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    props.allObservationEvents()
    props.observationEvent.forEach(e => {
      if (e.id === props.id) {
        setEvent(e)
        setObservations(e.schema.gatherings[0].units)
      }
    })
  }, [])

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
          <Text>{t('dateBegin')}: {event.schema.gatheringEvent.dateBegin}</Text>
          <Text>{t('dateEnd')}: {event.schema.gatheringEvent.dateEnd}</Text>
          <Text>{t('Zone')}: </Text>
          <Button title={'Muokkaa havaintotapahtumaa'} onPress={() => {
            const id = {
              eventId: event.id,
              unitId: ''
            }
            props.setObservationId(id)
            props.onPressObservationEvent()
          }} color={Colors.positiveButton}/>
          <Text style={Ts.observationText}>{t('Observations')}:</Text>
          {observations.map(observation =>
            <View key={observation.id}>
              <ObservationInfoComponent key={observation.id} observation={observation} />
              <Button title={t('edit observation')} onPress={() => {
                const id = {
                  eventId: event.id,
                  unitId: observation.id
                }
                props.setObservationId(id)
                props.onPressObservation()
              }} color={Colors.positiveButton}/>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
  
}

export default connector(ObservationEventComponent)