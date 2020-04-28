import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import Modal from 'react-native-modal'
import { connect, ConnectedProps } from 'react-redux'
import { clearObservationEvents } from '../stores/observation/actions'
import { useTranslation } from 'react-i18next'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import Bs from '../styles/ButtonStyles'
import { removeUser, clearPersonToken } from '../stores/user/actions'
import storageController from '../controllers/storageController'
import MessageComponent from './MessageComponent'
import { setMessageVisibilityTrue, updateMessageContent } from '../stores/other/actions'

type UserObject = {
  id: string
  fullName: string
  emailAddress: string
  defaultLanguage: string
}

interface RootState {
  user: UserObject
}

const mapStateToProps = (state: RootState) => {
  const { user } = state
  return { user }
}

const mapDispatchToProps = {
  clearObservationEvents,
  removeUser,
  clearPersonToken,
  updateMessageContent,
  setMessageVisibilityTrue
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  onLogout: () => void   
}

const UserInfoComponent = (props: Props) => {

  const { t } = useTranslation()
  const [showModal, setShowModal] = useState<boolean>(false)

  const logout = () => {
    clearUserData()
    props.clearObservationEvents()
    props.onLogout()
  }

  // Remove user data from storage and reducer
  const clearUserData = async () => {
    try {
      await storageController.remove('userData')
      await storageController.remove('personToken')
      props.removeUser()
      props.clearPersonToken()
    } catch (e) {
      console.log('Error removing user data from storage or reducer: ', e)
    }
  }

  return (
    <View>
      <View style={Cs.userInfoContainer}>
        <View style={Cs.loggedInContainer}>
          <Text>
            {props.user != null ? t('loggedin') + props.user.fullName : null}
          </Text>
        </View>
        <View style={Cs.logoutButtonContainer}>
          <Button
            buttonStyle={Bs.logoutButton}
            icon={<Icon name='logout' type='material-community' color='white' size={22} />}
            onPress={() => setShowModal(true)}
          />
        </View>
      </View>
      <Modal isVisible={showModal}>
          <View style={Cs.observationAddModal}>
            <Text style={Cs.containerWithJustPadding}>{t('logout?')}</Text>
            <View style={Cs.editObservationButtonContainer}>
              <View style={Cs.singleButton}>
                <Button
                  title={t('yes')}
                  buttonStyle={Bs.basicNeutralButton}
                  onPress={() => {
                    logout()
                    setShowModal(false)
                  }}
                />
              </View>
              <View style={Cs.singleButton}>
                <Button
                  title={t('no')}
                  buttonStyle={Bs.basicNegativeButton}
                  onPress={() => {
                    setShowModal(false)
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
    </View>
  )
}

export default connector(UserInfoComponent)