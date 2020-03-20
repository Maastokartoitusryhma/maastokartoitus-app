import React, { useState, useEffect } from 'react'
import { View, Text, Button, Picker, ScrollView } from 'react-native'
import UserInfoComponent from './UserInfoComponent'
import ObservationEventListComponent from './ObservationEventListElementComponent'
import { useTranslation } from 'react-i18next'
import regionController from '../controllers/regionController'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import Color from '../styles/Colors'
import { LocationData } from 'expo-location'
import { LatLng } from 'react-native-maps'
import { 
  toggleObserving, 
  newObservationEvent, 
  allObservationEvents,
  clearObservationLocation,
  clearObservationLocations
  } from '../stores/observation/actions'
import {
  setObservationZone,
  clearObservationZone
} from '../stores/map/actions'
import { updateLocation, appendPath } from '../stores/position/actions'
import { connect, ConnectedProps } from 'react-redux'
import { watchLocationAsync, stopLocationAsync } from '../geolocation/geolocation'
import { GeometryCollection } from 'geojson'
import testForm from '../../temporaryForm.json'
import { getObservationEventSchema } from '../controllers/formController'
import { parseSchemaToJSONObject } from '../parsers/SchemaToJSONObject'
import uuid from 'react-native-uuid'

interface RootState {
  position: LocationData
  path: LocationData[]
  observing: boolean
  observation: LatLng
  zone: GeometryCollection
  observationEvent: any[]
}

interface MyObject {
  [key: string]: any
}

const mapStateToProps = (state: RootState) => {
  const { position, path, observing, observation, zone, observationEvent } = state
  return { position, path, observing, observation, zone, observationEvent }
}

const mapDispatchToProps = {
  updateLocation,
  appendPath,
  setObservationZone,
  clearObservationZone,
  toggleObserving,
  newObservationEvent,
  allObservationEvents,
  clearObservationLocation,
  clearObservationLocations
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {   
  onLogout: () => void
  onPressMap: () => void 
  onPressObservationEvent: (id: string) => void
}

interface RegionObject {
  name: string
  id: string
  geometry: GeometryCollection
}

const HomeComponent = (props: Props) => {

  const [selectedRegion, setSelectedRegion] = useState('')
  const [regions, setRegions] = useState<RegionObject[]>([])
  const [observationEvents, setObservationEvents] = useState<Element[]>([])

  useEffect(() => {
    loadRegions()
    loadObservationEvents()
  }, [])

  const loadObservationEvents =  async () => {
    props.allObservationEvents()
    if (props.observationEvent !== null) {
      const events: Array<Element> = []
      props.observationEvent.forEach(event => {
        const id = event.id
        const dateBegin = event.schema.gatheringEvent.dateBegin
        const dateEnd = event.schema.gatheringEvent.dateEnd
        const observationCount = event.schema.gatherings[0].units.length
        events.push(<ObservationEventListComponent key={id} id={id} dateBegin={dateBegin} dateEnd={dateEnd} observationCount={observationCount} onPress={() => props.onPressObservationEvent(id)} />)
      })
      setObservationEvents(events)
    }
  }

  const loadRegions = async () => {
    const response = await regionController.getRegions()
    if (response !== null) {
      setRegions(response.results)
      setSelectedRegion(response.results[0].name)
      setSelectedObservationZone(response.results[0].id)
    }
  }
  
  const loadSchemaAndSetForm = async () => {
    const fetchedSchema = await getObservationEventSchema(t('language')) 
    if (fetchedSchema !== null) {
      //parse schema object and make a deep copy
      const schemaObject: MyObject = {} = JSON.parse(JSON.stringify(parseSchemaToJSONObject(fetchedSchema.properties)))
      //parse gatherings object and make a deep copy
      const gatheringsObject: MyObject = {} = JSON.parse(JSON.stringify(parseSchemaToJSONObject(fetchedSchema.properties.gatherings.items.properties)))
      console.log(gatheringsObject)
      schemaObject.gatherings.push(gatheringsObject)
      console.log('PARSED SCHEMA: ' + JSON.stringify(schemaObject))
      return schemaObject
    }
    return null
  }

  const createRegionsList = () => {
    return regions.map(region => 
      <Picker.Item key={region.id} label={region.name} value={region.id}/>)
  }

  const { t } = useTranslation()

  const beginObservationEvent = async () => {
    
    const observationForm = await loadSchemaAndSetForm()
    if (observationForm !== null) {
      console.log('OBSERVATION FORM: ' + JSON.stringify(observationForm))
      observationForm.gatheringEvent.dateBegin = new Date(Date.now()).toISOString()
    }
    
    const observationEventObject = {
      id: 'observationEvent_' + uuid.v4(),
      sentToServer: false,
      schema: observationForm
    }
    props.newObservationEvent(observationEventObject)
    props.toggleObserving()
    watchLocationAsync(props.updateLocation, props.appendPath)
    props.onPressMap()
  }

  const finishObservationEvent = () => {
    props.toggleObserving()
    props.clearObservationLocation()
    props.clearObservationLocations()
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
      <ScrollView>
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
          <View style={{ height: 10 }}></View>
          <View style={Cs.observationEventListContainer}>
            <Text style={Ts.previousObservationsTitle}>{t('previous observation events')}</Text>
            {observationEvents}
          </View>
          <View style={{ height: 10 }}></View>
        </View>
      </ScrollView>
    </View>
  )
}

export default connector(HomeComponent)