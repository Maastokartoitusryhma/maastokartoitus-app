import {
  otherActionTypes,
  SET_CONTENT,
  UPDATE_CONTENT,
  CLEAR_CONTENT,
  SET_VISIBILITY_TRUE,
  SET_VISIBILITY_FALSE,
  SET_TYPE  
} from './types'

export const messageReducer = (state = {content: '', visibility: false, type: 'message'}, action: otherActionTypes) => {
  switch (action.type) {
    case SET_CONTENT:
      return {...state, content: action.payload}
    case UPDATE_CONTENT:
      const newContent = state.content.concat(action.payload, ' ')
      return {...state, content: newContent}
    case CLEAR_CONTENT:
      return {...state, content: ''}
    case SET_VISIBILITY_TRUE:
      return {...state, visibility: true}
    case SET_VISIBILITY_FALSE:
      return {...state, visibility: false}
    case SET_TYPE:
      return {...state, type: action.payload}   
    default:
      return state
  }
}