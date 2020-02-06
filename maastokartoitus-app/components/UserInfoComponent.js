import React from 'react'
import { Text, Button, View, StyleSheet, AsyncStorage } from 'react-native'
import Colors from '../constants/colors'
import { useTranslation } from 'react-i18next'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'

const UserInfoComponent = (props) => {

  const { t, i18n } = useTranslation()

  const logout = () => {
    clearUserData()
    props.onLogout()
  }

  // Remove user data from storage
  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData')
    } catch (e) {
      console.log('Error removing user data from storage: ', e)
    }
  }

  return (
    <>
      <View style={Cs.userInfoContainer}>
        <Text>{t('select language')}</Text>
        <Button title={t('finnish')} onPress={() => {i18n.changeLanguage('fi')}}/>
        <Button title={t('swedish')}  onPress={() => { i18n.changeLanguage('sv')}} />
        <Button title={t('english')} onPress={() => {i18n.changeLanguage('en')}}/>
      </View>
      <View style={Cs.userInfoContainer}>
        <View style={Ts.userInfoTitle}>
          <Text style={Ts.loggedIn}>{t('loggedin')}Tähän Tulee Nimi</Text>
        </View>
        <Button
          color={Colors.negativeColor}
          title={t('logout')}
          onPress={logout}
        />
      </View>
    </>
  )
}

export default UserInfoComponent