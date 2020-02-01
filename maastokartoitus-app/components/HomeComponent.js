import React from 'react'
import { View, Text, Button, Picker } from 'react-native'
import UserInfoComponent from './UserInfoComponent'
import { useTranslation } from 'react-i18next'
import Cs from '../styles/ContainerStyles'
import Bs from '../styles/ButtonStyles'
import Ts from '../styles/TextStyles'

const HomeComponent = (props) => {
  const { t } = useTranslation()
  return (
    <View>
      <UserInfoComponent onLogout={props.onLogout} />
      <View style={Cs.homeContainer}>
        <View style={Cs.observationContainer}>
          <Text style={Ts.observationTitle}>{t('observation event')}</Text>
          <View style={Cs.pickerContainer}>
            <Text>{t('observation zone')}</Text>
            <Picker>
              <Picker.Item label = 'Kumpulan metsä'   value = '1'/>
              <Picker.Item label = 'Suurmetsän metsä' value = '2'/>
              <Picker.Item label = 'Puistolan metsä'  value = '3'/>
              <Picker.Item label = 'Keskuspuisto'     value = '4'/>
            </Picker>
          </View>
          <View style={Cs.buttonContainer}>
            <Button onPress = { props.onPressMap } style = { Bs.homeButton } title = 'Kartta'></Button>
          </View>
        </View>
      </View>
    </View>
  )
}

export default HomeComponent