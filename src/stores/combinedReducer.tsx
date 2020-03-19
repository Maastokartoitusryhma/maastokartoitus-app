import { combineReducers } from 'redux'
import { positionReducer, pathReducer } from './position/reducers'
import { observationReducer, observationLocationsReducer, observingReducer, observationEventsReducer, schemaReducer } from './observation/reducers'
import { regionReducer, zoneReducer, centeringReducer, maptypeReducer} from './map/reducers'

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
  schema: schemaReducer
})