import React from 'react'
import { View, Button } from 'react-native'
import { Button as ButtonElement, Icon } from 'react-native-elements'
import Cs from '../styles/ContainerStyles'
import Bs from '../styles/ButtonStyles'
import { connect, ConnectedProps } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Colors from '../styles/Colors'

interface RootState {
  editing: boolean[]
}

const mapStateToProps = (state: RootState) => {
  const { editing } = state
  return { editing }
}

const connector = connect(
  mapStateToProps
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & { 
  onPressObservation: (type: string) => void,
  cancelObservation: () => void,
  cancelEdit: () => void,
  submitEdit: () => void
} 


const ObservationButtonsComponent = (props: Props) => {

  const { t } = useTranslation()

  return (
    <View style = {Cs.observationTypeButtonsContainer}>
      {props.editing[0]
        ?
        <View style={Cs.observationTypeButtonsColumn}>
          <View style={Cs.observationTypeButton}>
            <ButtonElement
              buttonStyle={Bs.observationButton}
              title={t('save')}
              onPress={() => props.submitEdit()}
            />
          </View>
          <View style={Cs.observationTypeButton}>
            <ButtonElement
              buttonStyle={Bs.observationButton}
              title={t('cancel')}
              onPress={() => props.cancelEdit()}
            />
          </View>
        </View>
        :
        <View style={Cs.observationTypeButtonsColumn}>
          <View style={Cs.observationTypeButton}>
            <ButtonElement
              buttonStyle={Bs.observationButton}
              title={t('observation')}
              onPress={() => props.onPressObservation('observation')}
            />
          </View>
          <View style={Cs.observationTypeButton}>
            <ButtonElement
              buttonStyle={Bs.observationButton}
              title={t('trace')}
              onPress={() => props.onPressObservation('trackObservation')}
            />
          </View>
          <View style={Cs.observationTypeButton}>
            <ButtonElement
              buttonStyle={Bs.observationButton}
              title={t('feces')}
              onPress={() => props.onPressObservation('fecesObservation')}
            />
          </View>
          <View style={Cs.observationTypeButton}>
            <ButtonElement
              buttonStyle={Bs.observationButton}
              title={t('nest')}
              onPress={() => props.onPressObservation('nestObservation')}
            />
          </View>
          <View style={Cs.observationTypeButton}>
            <ButtonElement
              buttonStyle={{ backgroundColor: Colors.negativeButton}}
              title={t('cancel')}
              onPress={() => props.cancelObservation()}
            />
          </View>
        </View>
      }
    </View>
  )

}

export default connector(ObservationButtonsComponent)