import { combineReducers } from 'redux'
import { positionReducer, pathReducer } from './position/reducers'
import { observationReducer, zoneReducer, observingReducer } from './observation/reducers'

export default combineReducers({
  position: positionReducer,
  path: pathReducer,
  observing: observingReducer,
  observation: observationReducer,
  zone: zoneReducer
})