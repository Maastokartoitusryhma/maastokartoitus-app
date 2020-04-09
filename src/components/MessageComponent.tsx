import React from 'react'
import { View, Text, Button } from 'react-native'
import Modal from 'react-native-modal'
import { connect, ConnectedProps } from 'react-redux'
import { setMessageVisibilityFalse } from '../stores/other/actions'
import Cs from '../styles/ContainerStyles'
import Colors from '../styles/Colors'

interface BasicObject {
  [key: string]: any
}

interface RootState {
  message: BasicObject
}

const mapStateToProps = (state: RootState) => {
  const { message } = state
  return { message }
}

const mapDispatchToProps = {
  setMessageVisibilityFalse
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  onPress: () => void
}

const MessageComponent = (props: Props) => {

  return (
    <Modal isVisible={props.message.visibility}>
      <View style={Cs.observationAddModal}>
        <Text style={Cs.containerWithJustPadding}>{props.message.content}</Text>
        <View style={{ width: '20%'}}>
          <Button
            title='OK'
            color={Colors.neutralColor}
            onPress={() => {
              props.setMessageVisibilityFalse()
              props.onPress()
            }} />
        </View>
      </View>
    </Modal>
  )
}

export default connector(MessageComponent)