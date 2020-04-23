import React from 'react'
import { View, Image, Text, ScrollView } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { createSchemaObjectComponents } from '../parsers/SchemaObjectParser'
import { convertGC2FC, convertPointToLatLng } from '../converters/geoJSONConverters'
import { useTranslation } from 'react-i18next'
import MapView, { Marker, Region, UrlTile } from 'react-native-maps'
import Geojson from 'react-native-typescript-geojson'
import i18n from '../language/i18n'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'

interface BasicObject {
  [key: string]: any
}

interface RootState {
  schemaFi: BasicObject
  schemaEn: BasicObject
  schemaSv: BasicObject
}

const mapStateToProps = (state: RootState) => {
  const { schemaFi, schemaEn, schemaSv } = state
  return { schemaFi, schemaEn, schemaSv }
}

const connector = connect(
  mapStateToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  event: BasicObject
  observation: BasicObject
  editButton: any
  removeButton: any
}

const ObservationInfoComponent = (props: Props) => {

  const { t } = useTranslation()
  const urlTemplate: string = 'https://proxy.laji.fi/mml_wmts/maasto/wmts/1.0.0/maastokartta/default/WGS84_Pseudo-Mercator/{z}/{y}/{x}.png'

  let schema: BasicObject
  if (i18n.language === 'fi') {
    schema = props.schemaFi
  } else if (i18n.language === 'en') {
    schema = props.schemaEn
  } else {
    schema = props.schemaSv
  }

  const tileOverlay = () => (
    <UrlTile
      urlTemplate = {urlTemplate}
      zIndex = {-1}
    />
  )

  const observationLocationOverlay = () => {
    const coordinate = convertPointToLatLng(props.observation.unitGathering.geometry)
    return(
      <Marker
        coordinate = {coordinate}
        pinColor = {'#000000'}
        zIndex = {-1}
      >
      </Marker>
    )
  }

  const zoneOverlay = () => {
    if (props.event.schema.gatherings[0].geometry.coordinates !== undefined) {
      let zone = {
        "geometry": {
          "geometries": [
            {
              "coordinates": props.event.schema.gatherings[0].geometry.coordinates,
              "type": "Polygon"
            }
          ],
          "type": "GeometryCollection",
        }
      }
      
      return (
        <Geojson 
          geojson = {convertGC2FC(zone.geometry)}
          fillColor = "#f002"
          pinColor = "#f00"
          strokeColor = "#f00"
          strokeWidth = {4}
        />
      )
    } else {
      return null
    } 
    
  }

  const region: Region = {
    "latitude": props.observation.unitGathering.geometry.coordinates[1],
    "latitudeDelta": 0.00300000000000000,
    "longitude": props.observation.unitGathering.geometry.coordinates[0],
    "longitudeDelta": 0.00300000000000000,
  }

  return (
    <View style={Cs.observationInfoContainer}>
      <MapView
        provider = {'google'}
        initialRegion={region}
        rotateEnabled = {false}
        scrollEnabled={false}
        style = {Cs.observationInfoMapContainer}
      >
        {tileOverlay()}
        {zoneOverlay()}
        {observationLocationOverlay()}
      </MapView>
      {createSchemaObjectComponents(props.observation, schema.properties.gatherings.items.properties.units.items.properties)}
      {props.observation.localImages !== undefined && props.observation.localImages.length > 0
        ? (<View>
            <View style={Cs.observationListLine}>
              <View style={Cs.observationPropertyTitle}>
                <Text style={Ts.boldText}>{t('images')}</Text>
              </View>
            </View>
            <ScrollView horizontal={true} style={Cs.observationInfoImageContainer}>
              {props.observation.localImages.map((uri: string) => (
                <View style={{ paddingRight: 5 }} key={uri}>
                  <Image
                    source={{ uri: uri }}
                    style={{ width: 100, height: 100}}
                  />
                </View>
                
              ))}
            </ScrollView>
          </View>
        )
        : null
      }
      
      <View style={Cs.editObservationButtonContainer}>
        <View style={Cs.singleButton}>
          {props.editButton}
        </View>
        <View style={Cs.singleButton}>
          {props.removeButton}
        </View>
      </View>
    </View>
  )
}

export default connector(ObservationInfoComponent)