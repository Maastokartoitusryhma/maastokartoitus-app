import React, { useState } from 'react'
import { View, Text, Button, Picker } from 'react-native'
import UserInfoComponent from './UserInfoComponent'
import { useTranslation } from 'react-i18next'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import { KumpulanKampus, KumpulanPuutarha } from '../constants/namedPlaces'

interface Props {
  onLogout: () => void
  onPressMap: () => void   
}

const HomeComponent = (props: Props) => {

  const [selectedZone, setSelectedZone] = useState({KumpulanKampus})

  const { t } = useTranslation()

  return (
    <View>
      <UserInfoComponent onLogout={props.onLogout} />
      <View style={Cs.homeContainer}>
        <View style={Cs.observationEventContainer}>
          <Text style={Ts.observationEventTitle}>{t('observation event')}</Text>
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
            <Button onPress = { props.onPressMap }  title = {t('map')}></Button>
          </View>
        </View>
        <View style={Cs.previousObservationsContainer}>
          <Text style={Ts.previousObservationsTitle}>{t('previous observation events')}</Text>
        </View>
      </View>
    </View>
  )
}

export default HomeComponent