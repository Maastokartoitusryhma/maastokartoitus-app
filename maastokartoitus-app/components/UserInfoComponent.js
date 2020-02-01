import React from 'react'
import { Text, Button, View, StyleSheet, AsyncStorage, Picker } from 'react-native'
import Colors from '../constants/colors'
import { useTranslation } from 'react-i18next'

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
    <View style={styles.container}>
      <Text>{t('select language')}</Text>
      <Button title={t('finnish')} onPress={() => {i18n.changeLanguage('fi')}}/>
      <Button title={t('english')} onPress={() => {i18n.changeLanguage('en')}}/>
    </View>
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.loggedIn}>{t('loggedin')}Tähän Tulee Nimi</Text>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    padding: 10
  },
  title: {
    padding: 10
  },
})

export default UserInfoComponent