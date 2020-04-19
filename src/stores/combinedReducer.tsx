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
  observationZoneReducer,
  centeringReducer,
  maptypeReducer,
  editingReducer
} from './map/reducers'
import { userReducer, tokenReducer } from './user/reducers'
import { messageReducer } from './other/reducers'

export default combineReducers({
  region: regionReducer,
  position: positionReducer,
  path: pathReducer,
  observing: observingReducer,
  observation: observationReducer,
  centered: centeringReducer,
  maptype: maptypeReducer,
  observationEvent: observationEventsReducer,
  schemaFi: schemaFiReducer,
  schemaEn: schemaEnReducer,
  schemaSv: schemaSvReducer,
  observationId: observationIdReducer,
  editing: editingReducer,
  user: userReducer,
  token: tokenReducer,
  message: messageReducer,
  observationZone: observationZoneReducer
})
