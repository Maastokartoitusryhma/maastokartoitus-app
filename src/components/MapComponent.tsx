import React, { useEffect } from 'react'
import MapView, { Marker, Polyline, UrlTile, Region, LatLng, Callout } from 'react-native-maps'
import { connect, ConnectedProps } from 'react-redux'
import { Button, View, TouchableHighlight, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { LocationData } from 'expo-location'
import { GeometryCollection, Point } from 'geojson'
import { convertGC2FC, convertLatLngToPoint, convertPointToLatLng } from '../converters/geoJSONConverters'
import Geojson from 'react-native-typescript-geojson'
import { 
  setObservationLocation,
  replaceLocationById, 
  clearObservationLocation,
  setObservationId
} from '../stores/observation/actions' 
import {
  setRegion,
  toggleCentered,
  toggleMaptype,
  setEditing,
} from '../stores/map/actions'
import Colors from '../styles/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import Cs from '../styles/ContainerStyles'
import Os from '../styles/OtherStyles'
import uuid from 'react-native-uuid'

const urlTemplate: string = 'https://proxy.laji.fi/mml_wmts/maasto/wmts/1.0.0/maastokartta/default/WGS84_Pseudo-Mercator/{z}/{y}/{x}.png'

interface RootState {
  position: LocationData
  path: LocationData[]
  region: Region
  observation: Point
  observationEvent: Object[]
  zone: GeometryCollection
  centered: boolean
  maptype: 'topographic' | 'satellite'
  editing: boolean[]
}

const mapStateToProps = (state: RootState) => {
  const { position, path, region, observation, observationEvent, zone, centered, maptype, editing } = state
  return { position, path, region, observation, observationEvent, zone, centered, maptype, editing }
}

const mapDispatchToProps = {
  setRegion,
  setObservationLocation,
  replaceLocationById,
  clearObservationLocation,
  toggleCentered,
  toggleMaptype,
  setEditing,
  setObservationId
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & { 
  onPressObservation: () => void, 
  onPressTrackObservation: () => void, 
  onPressFecesObservation: () => void, 
  onPressNestObservation: () => void,
  onPressEditing: (fromMap?: boolean) => void,
} 

const MapComponent = (props: Props) => {
  const { t } = useTranslation()

  //if centering is true keeps recentering the map on renders
  useEffect(() => {
    if (props.centered && props.position) {
      followUser()
    }
  })

  //ensures that if user stops editing old point with cancel-button or 
  //navigators back-button rditing-flags are reset to false, and observation
  //location is cleared 
  useEffect(() => {
  },[])

  //reference for mapView
  let mapView: MapView | null = null

  //animates map to given region
  const moveToRegion = (region: Region | null) => {
    if (region && mapView) {
      mapView.animateToRegion(region, 500)
    }
  }

  //gets user region and moves map to themr
  const followUser = () => {
    const region = getRegionFromCoords()
    moveToRegion(region)
  }

  //extracts user coordinates from geolocationdata, and converts to region-type
  //for map view
  const getRegionFromCoords = () => {
    if (props.position) {
      const coords : LatLng = { ...props.position.coords }

      const region : Region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: props.region.latitudeDelta,
        longitudeDelta: props.region.longitudeDelta,
      }

      return region
    }

    return null
  }

  //centers the map on user and sets the centering flag to true
  const centerMapAnim = () => {
    props.centered ? null : props.toggleCentered()

    followUser()
  }

  //releases mapcenter from userlocation on moving the map or tapping one of the 
  //markers
  const stopCentering = () => {
    props.centered ? props.toggleCentered() : null
  }

  //updates region reducer one map has stopped moving
  const onRegionChangeComplete = (region: Region) => {
    props.setRegion(region)
  }

  //on long press on map converts selected location to point and places in observation location reducer 
  const markObservation = (coordinate: LatLng) => {
    const point = convertLatLngToPoint(coordinate)
    props.setObservationLocation(point)
  }

  //clears observation location from its reducer, and removes it from the list
  //of locations in observationEvent
  const cancelObservation = () => {
    props.clearObservationLocation()
  }

  //redirects navigator back to edit page of single observation with flags telling
  //it that coordinate has been changed
  const submitEdit = () => {
    props.setEditing([true, true])
    props.onPressEditing()
  }

  //redirects navigator back to edit page and set editing-flags to false
  const cancelEdit = () => {
    props.setEditing([false, false])
    props.onPressEditing()
  }

  //sets observation ids and shifts screen to observation edit page, parameter
  //in onPressEditing will tell edit page that observation is being modified 
  //from map, enabling return to correct screen when editing is finished
  const shiftToEditPage = (eventId: string, unitId: string) => {
    props.setObservationId({
      eventId,
      unitId
    })
    props.onPressEditing(true)
  }

  //will eventually be used to update location for old observation in the 
  //observationEvent as a result of dragging observation marker
  const updateObservationLocation = (coordinates: LatLng, eventId: string, unitId: string) => {
    console.log(JSON.stringify(coordinates) + ' ' + eventId + ' ' + unitId)
    props.replaceLocationById(convertLatLngToPoint(coordinates), eventId, unitId)
  }

  //draws user position to map
  const locationOverlay = () => (props.position !== null ? (
    <Marker
      onPress={(event) => markObservation(event.nativeEvent.coordinate)}
      coordinate = {{
        latitude: props.position.coords.latitude,
        longitude: props.position.coords.longitude
      }}
      zIndex = {3}>
      <MaterialIcons 
        name='directions-walk' 
        size={50}
      />
    </Marker>
    )
    : null
  )

  //draws user path to map
  const pathOverlay = () => (props.path.length !== 1 ?
    <Polyline
      coordinates = { props.path.map((location: LocationData) => ({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }))}
      strokeWidth = {5}
      strokeColor = {Colors.red}
      zIndex = {1}
    />
    : null
  )

  //draws currently selected point to map & enables dragabilty to finetune its
  //position
  const targetOverlay  = () => (props.observation ?
    <Marker 
      draggable = {true}
      coordinate = {convertPointToLatLng(props.observation)}
      onDragEnd = {(event) => markObservation(event.nativeEvent.coordinate)}
      zIndex = {2}
    />
    : null
  )

  //draws observation zone to map
  const zoneOverlay = () => (props.zone ?
    <Geojson 
      geojson = {convertGC2FC(props.zone)}
      fillColor = "#f002"
      pinColor = "#f00"
      strokeColor = "#f00"
      strokeWidth = {4}
    />
    : null
  )

  //if topomap is selected draws its tiles on map
  const tileOverlay = () => (props.maptype === 'topographic' ?
      <UrlTile
        urlTemplate = {urlTemplate}
        zIndex = {-1}
      />
    : null
  )

  //draws past observations in same gatheringevent to map, markers are draggable 
  const observationLocationsOverlay = () => {
    if (
      props.editing[0] ||
      props.observationEvent.length <= 0 || 
      props.observationEvent[props.observationEvent.length - 1]
      .schema.gatherings[0].units.length <= 0
    ) {
      return null
    }

    const eventId = props.observationEvent[props.observationEvent.length - 1].id
    const units = props.observationEvent[props.observationEvent.length - 1]
                  .schema.gatherings[0].units

    return units.map((unit: Object) => {
      const coordinate = convertPointToLatLng(unit.unitGathering.geometry)
      const unitId = unit.id
      let color

      switch (unit.type) {
        case 'observation':
          color = Colors.obsColor
          break
        case 'trackObservation':
          color = Colors.trackColor
          break
        case 'fecesObservation':
          color = Colors.fecesColor
          break
        case 'nestObservation':
          color = Colors.nestColor
          break
        default:
          color = '#000000'
      }

      return(
        <Marker 
          key={uuid.v4()}
          draggable = {true} 
          coordinate = {coordinate}
          pinColor = {color}
          onDragEnd = {(event) => updateObservationLocation(event.nativeEvent.coordinate, eventId, unitId)}
          zIndex = {-1}
          onPress = {() => stopCentering()}
        >
          <Callout tooltip onPress={() => shiftToEditPage(eventId, unitId)}>
              <Button title={t('edit observation')} onPress={() => null}/>
          </Callout>
        </Marker>
      )
    })
  }

  const observationButtonsOverlay = () => (        
    <View style = {Cs.observationTypeButtonsContainer}>
      <View
        style={Cs.observationTypeButtonsColumn}>
          {props.editing[0] ?
            <>
              <View style={Cs.observationTypeButton}>
                <Button title = {t('save')} onPress = {() => submitEdit()}/>
              </View>
              <View style={Cs.observationTypeButton}>
                <Button title = {t('cancel')} onPress = {() => cancelEdit()}/>
              </View>
            </> :
            <>
              <View style={Cs.observationTypeButton}>
                <Button title = {t('observation')} onPress = {props.onPressObservation}/>
              </View>
              <View style={Cs.observationTypeButton}>
                <Button title = {t('trace')} onPress = {props.onPressTrackObservation}/>
              </View>
              <View style={Cs.observationTypeButton}>
              <Button title = {t('feces')} onPress = {props.onPressFecesObservation}/>
              </View>
              <View style={Cs.observationTypeButton}>
                <Button title = {t('nest')} onPress = {props.onPressNestObservation}/>
              </View>
              <View style={Cs.observationTypeButton}>
                <Button title = {t('remove')} onPress = {() => cancelObservation()} color = {Colors.negativeButton}/>
              </View>
            </>
          }
      </View>
    </View>
  )

  return (
    <>
      <MapView
        ref = {map => {mapView = map}}
        provider = {'google'}
        initialRegion = { props.region }
        onPanDrag = {() => stopCentering()}
        onLongPress = {(event) => markObservation(event.nativeEvent.coordinate)}
        onRegionChangeComplete = {(region) => onRegionChangeComplete(region)}
        maxZoomLevel = {18.9}
        minZoomLevel = {5}
        mapType = {props.maptype === 'topographic' ? 'none' : props.maptype}
        rotateEnabled = {false}
        style = {Cs.mapViewStyle}
      >
        {locationOverlay()}
        {targetOverlay()}
        {pathOverlay()}
        {tileOverlay()}
        {zoneOverlay()}
        {observationLocationsOverlay()}
      </MapView>
      <View
        style = {Cs.mapTypeContainer}>
        <TouchableHighlight onPress = {() => props.toggleMaptype()} style = {Os.touchableHiglightStyle}>
          <MaterialIcons
            name='layers'
            size={50}
            color='white'
          />
        </TouchableHighlight>
      </View>
      <View
        style = {Cs.userLocationContainer}>
        <TouchableHighlight onPress = {() => centerMapAnim()} style = {Os.touchableHiglightStyle}>
          <MaterialIcons
            name='my-location'
            size={50}
            color='white'
          />
        </TouchableHighlight>
      </View>
      { props.observation ?
        observationButtonsOverlay()
        : null
      }
      
    </>
  )
}

export default connector(MapComponent)
