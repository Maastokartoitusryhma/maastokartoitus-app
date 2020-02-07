import { combineReducers } from 'redux'
import { positionReducer, pathReducer } from './position/reducers'
import { observationReducer, zoneReducer } from './observation/reducers'

export default combineReducers({
  position: positionReducer,
  path: pathReducer,
  observation: observationReducer,
  zone: zoneReducer
})