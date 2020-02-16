import React, { useState, useEffect } from 'react'
import { View, Text, Button, Picker } from 'react-native'
import UserInfoComponent from './UserInfoComponent'
import { useTranslation } from 'react-i18next'
import regionController from '../controllers/regionController'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'

interface Props {
  onLogout: () => void
  onPressMap: () => void   
}

interface RegionObject {
  name: string
  id: string
}

const HomeComponent = (props: Props) => {

  const [selectedRegion, setSelectedRegion] = useState('')
  const [regions, setRegions] = useState<RegionObject[]>([])

  useEffect(() => {
    const loadRegions = async () => {
      const response = await regionController.getRegions()
      if (response !== null) {
        setRegions(response.results)
        setSelectedRegion(response.results[0].name)
      }
    }

    loadRegions()
  }, [])

  const createRegionsList = () => {
    return regions.map(region => 
      <Picker.Item key={region.id} label={region.name} value={region.id}/>)
  }

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
              selectedValue={selectedRegion}
              onValueChange={itemValue => setSelectedRegion(itemValue)}>
                {createRegionsList()}
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