import React from 'react'
import { Text, Button, View, StyleSheet, AsyncStorage } from 'react-native'
import Colors from '../constants/colors'

const UserInfoComponent = (props) => {

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
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.loggedIn}>Kirjautuneena: Tähän Tulee Nimi</Text>
      </View>
      <Button
        color={Colors.negativeColor}
        title="Kirjaudu ulos"
        onPress={logout}
      />
    </View>
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