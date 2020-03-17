import React from 'react'
import { View, Text } from 'react-native'
import Cs from '../styles/ContainerStyles'

type Props = {
  observation: Object
}

const ObservationInfoComponent = (props: Props) => {

  return (
    <View style={Cs.containerWithJustPadding}>
      {Object.keys(props.observation).map((key) => {
        return (
          <View>
           {props.observation[key] !== ''
              ? <Text key={key}>{key}: {props.observation[key]}</Text>
              : null
            }
          </View>
        )
      })}
    </View>
  )
}

export default ObservationInfoComponent