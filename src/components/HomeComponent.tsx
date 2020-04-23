import React, { useState, useEffect } from 'react'
import { View, Text, Picker, ScrollView } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import UserInfoComponent from './UserInfoComponent'
import ObservationEventListComponent from './ObservationEventListElementComponent'
import { useTranslation } from 'react-i18next'
import storageController from '../controllers/storageController'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import Bs from '../styles/ButtonStyles'
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
  setCurrentObservationZone,
  clearCurrentObservationZone
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
import Colors from '../styles/Colors'

interface BasicObject {
  [key: string]: any
}

type UserObject = {
  id: string
  fullName: string
  emailAddress: string
  defaultLanguage: string
}

interface ZoneObject {
  name: string
  id: string
  geometry: GeometryCollection
}

interface RootState {
  position: LocationData
  path: LocationData[]
  observing: boolean
  observation: LatLng
  observationEvent: BasicObject[]
  schemaFi: object
  schemaEn: object
  schemaSv: object
  user: UserObject
  observationZone: {currentZoneId: string, zones: ZoneObject[]}
}

const mapStateToProps = (state: RootState) => {
  const { position, path, observing, observation, observationEvent, schemaFi, schemaEn, schemaSv, user, observationZone } = state
  return { position, path, observing, observation, observationEvent, schemaFi, schemaEn, schemaSv, user, observationZone }
}

const mapDispatchToProps = { 
  updateLocation,
  appendPath,
  setCurrentObservationZone,
  clearCurrentObservationZone,
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

const HomeComponent = (props: Props) => {

  const [observationEvents, setObservationEvents] = useState<Element[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    // Set first zone in array as selected zone to avoid undefined values
    props.setCurrentObservationZone(props.observationZone.zones[0].id) 
  }, [])

  useEffect(() => {
    loadObservationEvents()
  }, [props.observationEvent]) 

  const loadObservationEvents = () => {
    props.allObservationEvents()
    if (props.observationEvent !== null) {
      const events: Array<Element> = []
      props.observationEvent.forEach((event: BasicObject) => {
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
    const fetchedSchema: BasicObject = _.cloneDeep(schema)
    if (fetchedSchema !== null) {
      // parse schema object
      const schemaObject: BasicObject = parseSchemaToJSONObject(fetchedSchema.properties)
      // parse gatherings object
      const gatheringsObject: BasicObject = parseSchemaToJSONObject(fetchedSchema.properties.gatherings.items.properties)
      schemaObject.gatherings.push(gatheringsObject)
      return schemaObject
    }
    return null
  }

  const createZonesList = () => {
    return props.observationZone.zones.map((region: BasicObject) => 
      <Picker.Item key={region.id} label={region.name} value={region.id}/>)
  }

  const beginObservationEvent = () => {
    
    const observationForm = parseObservationEventObject()
    if (observationForm !== null) {
      observationForm.gatheringEvent.dateBegin = setDateForDocument()
      observationForm.formID = 'MHL.45'
      observationForm.editors.push(props.user.id)
      observationForm.gatheringEvent.leg.push(props.user.fullName)
      const region: ZoneObject | undefined = props.observationZone.zones.find((region: BasicObject) => region.id === props.observationZone.currentZoneId)
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
    if (event) {
      event.schema.gatheringEvent.dateEnd = setDateForDocument()
      events.push(event)
    }    

    // replace events with modified list
    props.replaceObservationEvents(events)

    storageController.save('observationEvents', events)
    props.toggleObserving()
    props.clearObservationLocation()
    stopLocationAsync()
    props.allObservationEvents
  }

  

  return (
    <View>
      <ScrollView>
        <UserInfoComponent onLogout={props.onLogout} />
        <View style={Cs.homeContainer}>
          <View style={Cs.observationEventContainer}>
            <Text style={Ts.observationEventTitle}>{t('observation event')}</Text>
            {props.observing
              ? 
              <Text style={Ts.zoneText}>
                {t('observation zone')}: {props.observationZone.zones.map((zone: BasicObject) => {
                  if (zone.id === props.observationZone.currentZoneId) {
                    return zone.name
                  }
                })}
              </Text>
              : 
              <View>
                <Text style={Ts.zoneText}>{t('observation zone')}</Text>
                <View style={Cs.pickerContainer}>
                  <Picker
                    selectedValue={props.observationZone.currentZoneId}
                    onValueChange={(itemValue: string) => {
                      props.setCurrentObservationZone(itemValue) 
                    }}>
                    {createZonesList()}
                  </Picker>
                </View>
              </View>
            }
            {props.observing
              ?
              <View style={Cs.buttonContainer}>
                <Button
                  containerStyle={Cs.continueButtonContainer}
                  buttonStyle={Bs.continueButton}
                  title={t('continue')}
                  iconRight={true}
                  icon={<Icon name='map-outline' type='material-community' color='white' size={22} />}
                  onPress={() => props.onPressMap()}
                />
                <Button
                  containerStyle={Cs.endButtonContainer}
                  buttonStyle={Bs.endButton}
                  title={t('cancelObservation')}
                  iconRight={true}
                  icon={<Icon name='stop' type='material-icons' color='white' size={22} />}
                  onPress={() => finishObservationEvent()}
                />
              </View>
              :
              <View style={Cs.buttonContainer}>
                <Button
                  containerStyle={Cs.beginButtonContainer}
                  buttonStyle={{ backgroundColor: Colors.positiveColor}}
                  title={t('beginObservation')}
                  iconRight={true}
                  icon={<Icon name='play-arrow' type='material-icons' color='white' size={22} />}
                  onPress={() => beginObservationEvent()}
                />
              </View>
            }
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
      {console.log(props.observationZone.zones[0].id)}
    </View>
  )
}

export default connector(HomeComponent)