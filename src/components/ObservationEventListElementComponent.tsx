import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Ts from '../styles/TextStyles'
import { useTranslation } from 'react-i18next'
import { parseDate } from '../utilities/dateHelper'

interface Props {
  id: string
  dateBegin: string
  dateEnd: string
  observationCount: number
  onPress: () => void
}

const ObservationEventListElementComponent = (props: Props) => {

  const { t } = useTranslation()

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={Ts.observationEventListElement}>
        <Text>{parseDate(props.dateBegin)} - {parseDate(props.dateEnd)}</Text>
        <Text style={Ts.indentedText}>
          {props.observationCount} {props.observationCount === 1 ? t('singleObservation') : t('observations')}
        </Text>
      </View>
    </TouchableOpacity>
  )
} 

export default ObservationEventListElementComponent