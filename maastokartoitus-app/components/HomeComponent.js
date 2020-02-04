import React, { useState } from 'react'
import { View, Text, Button, Picker } from 'react-native'
import UserInfoComponent from './UserInfoComponent'
import { useTranslation } from 'react-i18next'
import Cs from '../styles/ContainerStyles'
import Bs from '../styles/ButtonStyles'
import Ts from '../styles/TextStyles'
import { KumpulanKampus, KumpulanPuutarha } from '../constants/namedPlaces'

const HomeComponent = (props) => {

  const [selectedZone, setSelectedZone] = useState({KumpulanKampus})

  const { t } = useTranslation()

  return (
    <View>
      <UserInfoComponent onLogout={props.onLogout} />
      <View style={Cs.homeContainer}>
        <View style={Cs.observationContainer}>
          <Text style={Ts.observationTitle}>{t('observation event')}</Text>
          <View style={Cs.pickerContainer}>
            <Text>{t('observation zone')}</Text>
            <Picker 
              selectedValue={selectedZone}
              onValueChange={itemValue => setSelectedZone(itemValue)}>
              <Picker.Item label={KumpulanKampus.name} value={KumpulanKampus} />
              <Picker.Item label={KumpulanPuutarha.name} value={KumpulanPuutarha} />
            </Picker>
          </View>
          <View style={Cs.buttonContainer}>
            <Button onPress = { props.onPressMap } style = { Bs.homeButton } title = {t('map')}></Button>
          </View>
        </View>
      </View>
    </View>
  )
}

export default HomeComponent