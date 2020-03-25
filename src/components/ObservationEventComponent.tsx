import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import { connect, ConnectedProps } from 'react-redux'
import { allObservationEvents } from '../stores/observation/actions'
import { useTranslation } from 'react-i18next'
import ObservationInfoComponent from './ObservationInfoComponent'
import Colors from '../styles/Colors'

interface RootState {
  observationEvent: any[]
}

const mapStateToProps = (state: RootState) => {
  const { observationEvent } = state
  return { observationEvent }
}

const mapDispatchToProps = {
  allObservationEvents
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  id: string
  onPressObservation: (eventID: string, observationID: string, type: string) => void
}

const ObservationEventComponent = (props: Props) => {

  const [event, setEvent] = useState(null)
  const [observations, setObservations] = useState([])
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
          <Text>ID: {event.id}</Text>
          <Text>{t('dateBegin')}: {event.schema.gatheringEvent.dateBegin}</Text>
          <Text>{t('dateEnd')}: {event.schema.gatheringEvent.dateEnd}</Text>
          <Text>{t('Zone')}: </Text>
          <Text style={Ts.observationText}>{t('Observations')}:</Text>
          {observations.map(observation =>
            <View>
              <ObservationInfoComponent key={observation.id} observation={observation} />
              <Button title={'Muokkaa havaintoa'} onPress={() => props.onPressObservation(event.id, observation.id, observation.type)} color={Colors.positiveButton}/>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
  
}

export default connector(ObservationEventComponent)