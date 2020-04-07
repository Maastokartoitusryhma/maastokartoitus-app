import { GeometryCollection, FeatureCollection, Feature, Geometry, Point, LineString, Polygon } from 'geojson'
import { LatLng } from 'react-native-maps'

const geometryCollectionConstructor = (geometries: Geometry[]) => {
  const geometryCollection: GeometryCollection = {
    type: 'GeometryCollection',
    geometries: geometries
  }

  return geometryCollection
}

const featureCollectionConstructor = (features: Feature[]) => {
  const featureCollection: FeatureCollection = {
    type: 'FeatureCollection',
    features: features
  }

  return featureCollection
}

const featureConstructor = (geometry: Geometry) => {
  const feature: Feature = {
    type: 'Feature',
    properties: {},
    geometry: geometry,
  }

  return feature
}

const pointConstructor = (lng: number, lat: number) => {
  const point: Point = {
    type: 'Point',
    coordinates: [
      lng,
      lat
    ]
  }

  return point
}

const latLngConstructor = (lng: number, lat: number) => {
  const latlng: LatLng = {
    latitude: lat,
    longitude: lng
  }

  return latlng
}

const lineStringConstructor = (points: any[]) => {
  const lineString: LineString = {
    type: 'LineString',
    coordinates: points
  }
  
  return lineString
}

const polygonConstructor = (points: any[], holes: any[]) => {
  const polygon: Polygon = {
    type:'Polygon',
    coordinates: []
  }

  polygon.coordinates.push(points)

  if (holes.length !== 0) {
    polygon.coordinates.push(points)    
  }

  return polygon
}

const wrapGeometryInFC = (geometry: Geometry) => {
  const feature = featureConstructor(geometry)

  return featureCollectionConstructor([feature])
}

const convertGC2FC = (geometryCollection: GeometryCollection) => {
  const features = geometryCollection.geometries.map((geometry) => featureConstructor(geometry))
  const featureCollection = featureCollectionConstructor(features)

  return featureCollection
}

const convertFC2GC = (featureCollection: FeatureCollection) => {
  const geometries = featureCollection.features.map((feature) => feature.geometry)
  const geometryCollection = geometryCollectionConstructor(geometries)

  return geometryCollection
}

const convertLatLngToPoint = (coord: LatLng) => {
  const point = pointConstructor(coord.longitude, coord.latitude)

  return point
}

const convertPointToLatLng = (point: Point) => {
  const latlng = latLngConstructor(point.coordinates[0], point.coordinates[1])

  return latlng
}

const convertLatLngArrToLineString = (coords: LatLng[]) => {
  const points: any[] = []

  coords.forEach(coord => points.push([coord.longitude, coord.latitude]))

  const lineString = lineStringConstructor(points)

  return lineString
}

const convertLatLngArrToPolygon = (coords: LatLng[]) => {
  const points: any[] = []

  coords.forEach(coord => points.push([coord.longitude, coord.latitude]))

  const polygon = polygonConstructor(points, [])
}

export {wrapGeometryInFC, convertFC2GC, convertGC2FC, convertLatLngToPoint, convertPointToLatLng }