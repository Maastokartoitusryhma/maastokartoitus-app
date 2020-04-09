import { combineReducers } from 'redux'
import { positionReducer, pathReducer } from './position/reducers'
import {
  observationReducer, 
  observingReducer,
  observationEventsReducer,
  schemaFiReducer, 
  schemaEnReducer,
  schemaSvReducer,
  observationIdReducer
} from './observation/reducers'
import {
  regionReducer,
  zoneReducer,
  centeringReducer,
  maptypeReducer,
  editingReducer
} from './map/reducers'
import { userReducer } from './user/reducers'

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
  schemaFi: schemaFiReducer,
  schemaEn: schemaEnReducer,
  schemaSv: schemaSvReducer,
  observationId: observationIdReducer,
  editing: editingReducer,
  user: userReducer
})
