import { combineReducers } from 'redux'
import { positionReducer, pathReducer } from './position/reducers'
import { regionReducer, observationReducer, zoneReducer, observingReducer, centeringReducer, maptypeReducer, observationEventsReducer, schemaReducer } from './observation/reducers'

export default combineReducers({
  region: regionReducer,
  position: positionReducer,
  path: pathReducer,
  observing: observingReducer,
  observation: observationReducer,
  zone: zoneReducer,
  centered: centeringReducer,
  maptype: maptypeReducer,
  observationEvent: observationEventsReducer,
  schema: schemaReducer
})