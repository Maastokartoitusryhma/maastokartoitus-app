import React, { useState, useEffect } from 'react'
import { View, Text, Button, Picker, ScrollView } from 'react-native'
import UserInfoComponent from './UserInfoComponent'
import ObservationEventListComponent from './ObservationEventListElementComponent'
import { useTranslation } from 'react-i18next'
import regionController from '../controllers/regionController'
import storageController from '../controllers/storageController'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import Color from '../styles/Colors'
import { LocationData } from 'expo-location'
import { LatLng } from 'react-native-maps'
import { 
  toggleObserving, 
  newObservationEvent,
  allObservationEvents,
  replaceObservationEvents, 
  clearObservationLocation,
  } from '../stores/observation/actions'
import {
  setObservationZone,
  clearObservationZone
} from '../stores/map/actions'
import { updateLocation, appendPath } from '../stores/position/actions'
import { connect, ConnectedProps } from 'react-redux'
import { watchLocationAsync, stopLocationAsync } from '../geolocation/geolocation'
import { GeometryCollection } from 'geojson'
import { parseSchemaToJSONObject } from '../parsers/SchemaToJSONObject'
import uuid from 'react-native-uuid'
import _ from 'lodash'
import i18n from '../language/i18n'
import MessageComponent from './MessageComponent'
import { setDateForDocument } from '../utilities/dateHelper'

interface RootState {
  position: LocationData
  path: LocationData[]
  observing: boolean
  observation: LatLng
  zone: GeometryCollection
  observationEvent: any[]
  schemaFi: object
  schemaEn: object
  schemaSv: object
}

interface MyObject {
  [key: string]: any
}

const mapStateToProps = (state: RootState) => {
  const { position, path, observing, observation, zone, observationEvent, schemaFi, schemaEn, schemaSv } = state
  return { position, path, observing, observation, zone, observationEvent, schemaFi, schemaEn, schemaSv }
}

const mapDispatchToProps = {
  updateLocation,
  appendPath,
  setObservationZone,
  clearObservationZone,
  toggleObserving,
  newObservationEvent,
  allObservationEvents,
  replaceObservationEvents,
  clearObservationLocation,
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
  }, [props.observationEvent])

  const loadRegions = async () => {
    const response = await regionController.getRegions()
    if (response !== null) {
      setRegions(response.results)
      setSelectedRegion(response.results[0].id)
      setSelectedObservationZone(response.results[0].id)
    }
  }

  const loadObservationEvents = () => {
    props.allObservationEvents()
    if (props.observationEvent !== null) {
      const events: Array<Element> = []
      props.observationEvent.forEach(event => {
        events.push(<ObservationEventListComponent key={event.id} observationEvent={event} onPress={() => props.onPressObservationEvent(event.id)} />)
      })
      setObservationEvents(events)
    }
  }

  const parseObservationEventObject = () => {
    let schema: object
    if (i18n.language === 'fi') {
      schema = props.schemaFi
    } else if (i18n.language === 'en') {
      schema = props.schemaEn
    } else {
      schema = props.schemaSv
    }
    const fetchedSchema: MyObject = _.cloneDeep(schema)
    if (fetchedSchema !== null) {
      //parse schema object
      const schemaObject: MyObject = {} = (parseSchemaToJSONObject(fetchedSchema.properties))
      //parse gatherings object
      const gatheringsObject: MyObject = {} = (parseSchemaToJSONObject(fetchedSchema.properties.gatherings.items.properties))
      schemaObject.gatherings.push(gatheringsObject)
      return schemaObject
    }
    return null
  }

  const createRegionsList = () => {
    return regions.map(region => 
      <Picker.Item key={region.id} label={region.name} value={region.id}/>)
  }

  const { t } = useTranslation()

  const beginObservationEvent = () => {
    
    const observationForm = parseObservationEventObject()
    if (observationForm !== null) {
      observationForm.gatheringEvent.dateBegin = setDateForDocument()
      observationForm.formID = 'MHL.45'
      const region: RegionObject | undefined = regions.find(region => region.id === selectedRegion)
      if (region) {
        observationForm.gatherings[0].geometry = region.geometry.geometries[0]
        observationForm.gatherings[0].locality = region.name
      }  
    }
    
    const observationEventObject = {
      id: 'observationEvent_' + uuid.v4(),
      schema: observationForm
    }

    props.newObservationEvent(observationEventObject)
    props.toggleObserving()
    watchLocationAsync(props.updateLocation, props.appendPath)
    props.onPressMap()
  }

  const finishObservationEvent = () => {
    const events = _.cloneDeep(props.observationEvent)
    const event = events.pop()
    event.schema.gatheringEvent.dateEnd = setDateForDocument()
    events.push(event)

    //replace events with modified list
    props.replaceObservationEvents(events)

    storageController.save('observationEvents', events)
    props.toggleObserving()
    props.clearObservationLocation()
    stopLocationAsync()
    props.allObservationEvents
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
        <MessageComponent onPress={null}/>
      </ScrollView>
    </View>
  )
}

export default connector(HomeComponent)