import React from 'react'
import { View, Image } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { createSchemaObjectComponents } from '../parsers/SchemaObjectParser'
import i18n from '../language/i18n'
import Cs from '../styles/ContainerStyles'

interface BasicObject {
  [key: string]: any
}

interface RootState {
  schemaFi: BasicObject
  schemaEn: BasicObject
  schemaSv: BasicObject
}

const mapStateToProps = (state: RootState) => {
  const { schemaFi, schemaEn, schemaSv } = state
  return { schemaFi, schemaEn, schemaSv }
}

const connector = connect(
  mapStateToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  observation: BasicObject
  button: any
}

const ObservationInfoComponent = (props: Props) => {

  let schema: BasicObject
  if (i18n.language === 'fi') {
    schema = props.schemaFi
  } else if (i18n.language === 'en') {
    schema = props.schemaEn
  } else {
    schema = props.schemaSv
  }

  return (
    <View style={Cs.observationInfoContainer}>
      {createSchemaObjectComponents(props.observation, schema.properties.gatherings.items.properties.units.items.properties)}
      {props.observation.image !== ''
        ? <Image
            source={{ uri: props.observation.image }}
            style={{ width:100, height: 100}}
          />
        : null
      }
      <View style={Cs.editObservationButtonContainer}>
        {props.button}
      </View>
    </View>
  )
}

export default connector(ObservationInfoComponent)