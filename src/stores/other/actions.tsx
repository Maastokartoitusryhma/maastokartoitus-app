import { otherActionTypes,
  SET_CONTENT,
  UPDATE_CONTENT,
  CLEAR_CONTENT,
  SET_VISIBILITY_TRUE,
  SET_VISIBILITY_FALSE,
  SET_TYPE
} from './types'

export const setMessageContent = (content: string) : otherActionTypes => ({
  type: SET_CONTENT,
  payload: content
})

export const updateMessageContent = (content: string) : otherActionTypes => ({
  type: UPDATE_CONTENT,
  payload: content
})

export const clearMessageContent = () : otherActionTypes => ({
  type: CLEAR_CONTENT
})

export const setMessageVisibilityTrue = () : otherActionTypes => ({
  type: SET_VISIBILITY_TRUE
})

export const setMessageVisibilityFalse = () : otherActionTypes => ({
  type: SET_VISIBILITY_FALSE
})

export const setMessageType = (messageType: string) : otherActionTypes => ({
  type: SET_TYPE,
  payload: messageType
})

