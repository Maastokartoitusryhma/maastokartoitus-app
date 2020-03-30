import React from 'react'
import { View, Text, Image } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { createSchemaObjectComponents } from '../parsers/SchemaObjectParser'
import Cs from '../styles/ContainerStyles'

interface RootState {
  schema: object
}

const mapStateToProps = (state: RootState) => {
  const { schema } = state
  return { schema }
}

const connector = connect(
  mapStateToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  observation: Object
}

const ObservationInfoComponent = (props: Props) => {
  return (
    <View style={Cs.containerWithJustPadding}>
      {createSchemaObjectComponents(props.observation, props.schema.properties.gatherings.items.properties.units.items.properties)}
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

export default connector(ObservationInfoComponent)