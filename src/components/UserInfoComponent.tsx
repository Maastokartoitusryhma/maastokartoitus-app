import React, { useState, useEffect } from 'react'
import { Text, Button, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { clearObservationEvents } from '../stores/observation/actions'
import Colors from '../styles/Colors'
import { useTranslation } from 'react-i18next'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import { removeUser } from '../stores/user/actions'
import storageController from '../controllers/storageController'

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
  removeUser
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

  const logout = () => {
    clearUserData()
    props.clearObservationEvents()
    props.onLogout()
  }

  // Remove user data from storage and reducer
  const clearUserData = async () => {
    try {
      await storageController.remove('userData')
      props.removeUser()
    } catch (e) {
      console.log('Error removing user data from storage or reducer: ', e)
    }
  }

  return (
    <View>
      <View style={Cs.userInfoContainer}>
        <View style={Ts.userInfoTitle}>
          <Text style={Ts.loggedIn}>
            {props.user != null ? t('loggedin') + props.user.fullName : null}
          </Text>
        </View>
        <View style={Cs.logoutButtonContainer}>
          <Button
            color={Colors.negativeColor}
            title={t('logout')}
            onPress={logout}
          />
        </View>
      </View>
    </View>
  )
}

export default connector(UserInfoComponent)