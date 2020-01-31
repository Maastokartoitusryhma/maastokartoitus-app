import React from 'react'
import { View, Text, Button, StyleSheet, Picker } from 'react-native'
import UserInfoComponent from './UserInfoComponent'
import Colors from '../constants/colors'
import { useTranslation } from 'react-i18next'

const HomeComponent = (props) => {
  const { t, i18n } = useTranslation()
  return (
    <View>
      <UserInfoComponent onLogout={props.onLogout} />
      <View style={styles.container}>
        <View style={styles.havaintoContainer}>
          <Text style={styles.havaintoTitle}>{t('havaintotapahtuma')}</Text>
          <View style={styles.pickerContainer}>
            <Text>{t('havainnointialue')}</Text>
            <Picker>
              <Picker.Item label = 'Kumpulan metsä'   value = '1'/>
              <Picker.Item label = 'Suurmetsän metsä' value = '2'/>
              <Picker.Item label = 'Puistolan metsä'  value = '3'/>
              <Picker.Item label = 'Keskuspuisto'     value = '4'/>
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress = { props.onPressMap } style = { styles.button } title = 'Kartta'></Button>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  buttonContainer: {
    padding: 10
  },
  button: {
    width: '20%',
    padding: 10,
  },
  loggedIn: {
    padding: 10,
  },
  havaintoContainer: {
    width: '90%',
    backgroundColor: Colors.blueBackground
  },
  havaintoTitle: {
    fontWeight: 'bold',
    padding: 10
  },
  pickerContainer: {
    paddingLeft: 20
  }
})

export default HomeComponent