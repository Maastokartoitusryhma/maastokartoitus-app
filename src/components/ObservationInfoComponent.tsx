import React from 'react'
import { View, Text, Image } from 'react-native'
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
              ? <Text key={key}>{key}: {JSON.stringify(props.observation[key])}</Text>
              : null
            }
          </View>
        )
      })}
      {props.observation.image !== ''
        ? <Image
            source={{ uri: props.observation.image }}
            style={{ width:100, height: 100}}
          />
        : null
      }
    </View>
  )
}

export default ObservationInfoComponent