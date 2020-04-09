export const SET_CONTENT = 'SET_CONTENT'
export const CLEAR_CONTENT = 'CLEAR_CONTENT'
export const SET_VISIBILITY_TRUE = 'SET_VISIBILITY_TRUE'
export const SET_VISIBILITY_FALSE = 'SET_VISIBILITY_FALSE'
export const SET_TYPE = 'SET_TYPE'

interface setMessageContent {
  type: typeof SET_CONTENT
  payload: string
}

interface clearMessageContent {
  type: typeof CLEAR_CONTENT
}

interface setMessageVisibilityTrue {
  type: typeof SET_VISIBILITY_TRUE
}

interface setMessageVisibilityFalse {
  type: typeof SET_VISIBILITY_FALSE
}

interface setMessageType {
  type: typeof SET_TYPE
  payload: string
}

export type otherActionTypes =
  setMessageContent |
  clearMessageContent |
  setMessageVisibilityTrue |
  setMessageVisibilityFalse |
  setMessageType
  
  