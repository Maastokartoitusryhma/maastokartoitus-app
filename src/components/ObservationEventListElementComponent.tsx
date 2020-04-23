import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Ts from '../styles/TextStyles'
import { useTranslation } from 'react-i18next'
import { parseDateForUI } from '../utilities/dateHelper'

interface BasicObject {
  [key: string]: any
}

interface Props {
  observationEvent: BasicObject
  onPress: () => void
}

const ObservationEventListElementComponent = (props: Props) => {

  const { t } = useTranslation()
  const dateBegin = props.observationEvent.schema.gatheringEvent.dateBegin
  const dateEnd = props.observationEvent.schema.gatheringEvent.dateEnd
  const observationCount = props.observationEvent.schema.gatherings[0].units.length
  const observationZone = props.observationEvent.schema.gatherings[0].locality

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={Ts.observationEventListElement}>
        <Text>{parseDateForUI(dateBegin)} - {parseDateForUI(dateEnd)}</Text>
        <Text style={Ts.indentedText}>
          {t('zoneInList') + ": " + observationZone}
        </Text>
        <Text style={Ts.indentedText}>
          {t('observationsInList') + ": " + observationCount + " " + (observationCount === 1 ? t('piece') : t('pieces'))}
        </Text>
      </View>
    </TouchableOpacity>
  )
} 

export default ObservationEventListElementComponent