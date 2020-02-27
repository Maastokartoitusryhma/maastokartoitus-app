import React, { useState, useEffect } from 'react'
import { View, Text, Button, Picker } from 'react-native'
import UserInfoComponent from './UserInfoComponent'
import { useTranslation } from 'react-i18next'
import regionController from '../controllers/regionController'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import Color from '../styles/Colors'
import { LocationData } from 'expo-location'
import { LatLng } from 'react-native-maps'
import { toggleObserving, setObservationZone, clearObservationZone, newObservationEvent } from '../stores/observation/actions'
import { updateLocation, appendPath } from '../stores/position/actions'
import { connect, ConnectedProps } from 'react-redux'
import { watchLocationAsync, stopLocationAsync } from '../geolocation/geolocation'
import { GeometryCollection } from 'geojson'
import testForm from '../../temporaryForm.json'
import uuid from 'react-native-uuid'

interface RootState {
  position: LocationData
  path: LocationData[]
  observing: boolean
  observation: LatLng
  zone: GeometryCollection
}

const mapStateToProps = (state: RootState) => {
  const { position, path, observing, observation, zone } = state
  return { position, path, observing, observation, zone }
}

const mapDispatchToProps = {
  updateLocation,
  appendPath,
  setObservationZone,
  clearObservationZone,
  toggleObserving,
  newObservationEvent
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {   
  onLogout: () => void
  onPressMap: () => void 
}

interface RegionObject {
  name: string
  id: string
  geometry: GeometryCollection
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
        setSelectedObservationZone(response.results[0].id)
      }
    }

    loadRegions()
  }, [])

  const createRegionsList = () => {
    return regions.map(region => 
      <Picker.Item key={region.id} label={region.name} value={region.id}/>)
  }

  const { t } = useTranslation()

  const beginObservationEvent = () => {
    const observationForm = testForm
    observationForm.id = 'observationEvent_'// + uuid.v4
    props.newObservationEvent(observationForm)
    props.toggleObserving()
    watchLocationAsync(props.updateLocation, props.appendPath)
    props.onPressMap()
  }

  const finishObservationEvent = () => {
    props.toggleObserving()
    stopLocationAsync()
  }

  const setSelectedObservationZone = (id: string) => {
    const region: RegionObject | undefined = regions.find(region => region.id === id)              
    
    if (region) {
      props.setObservationZone(region.geometry)
    }
  }

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
              onValueChange={itemValue => {
                setSelectedRegion(itemValue)
                setSelectedObservationZone(itemValue) 
              }}>
              {createRegionsList()}
            </Picker>
          </View>
          <View style={Cs.buttonContainer}>
            { props.observing ?
              <>
                <Button onPress = {() => props.onPressMap() } title = {t('map')}></Button>
                <Button onPress = {() => finishObservationEvent()} title = {t('cancelObservation')} color = {Color.negativeButton}></Button>
              </>
            :
              <Button onPress = {() => beginObservationEvent()}  title = {t('beginObservation')}></Button>
            }
          </View>
        </View>
        <View style={Cs.previousObservationsContainer}>
          <Text style={Ts.previousObservationsTitle}>{t('previous observation events')}</Text>
        </View>
      </View>
    </View>
  )
}

export default connector(HomeComponent)