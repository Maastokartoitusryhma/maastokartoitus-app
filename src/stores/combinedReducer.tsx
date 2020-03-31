import { combineReducers } from 'redux'
import { positionReducer, pathReducer } from './position/reducers'
import { observationReducer, observationLocationsReducer, observingReducer,
  observationEventsReducer, schemaFiReducer, schemaEnReducer, schemaSvReducer, observationIdReducer } from './observation/reducers'
import { regionReducer, zoneReducer, centeringReducer, maptypeReducer, editingReducer} from './map/reducers'

export default combineReducers({
  region: regionReducer,
  position: positionReducer,
  path: pathReducer,
  observing: observingReducer,
  observation: observationReducer,
  observationLocations: observationLocationsReducer,
  zone: zoneReducer,
  centered: centeringReducer,
  maptype: maptypeReducer,
  observationEvent: observationEventsReducer,
  schemaFi: schemaFiReducer,
  schemaEn: schemaEnReducer,
  schemaSv: schemaSvReducer,
  observationId: observationIdReducer,
  editing: editingReducer,
})