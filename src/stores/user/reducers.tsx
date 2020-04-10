import {
  userActionTypes,
  GET_PERSON_TOKEN,
  SET_PERSON_TOKEN,
  CLEAR_PERSON_TOKEN
} from './types'

export const userReducer = (state = {}, action: userActionTypes) => {
  switch (action.type) {
    
    case GET_PERSON_TOKEN:
      return state.personToken

    case SET_PERSON_TOKEN:
      return { ...state, personToken: action.payload }

    case CLEAR_PERSON_TOKEN:
      return { ...state, personToken: null }

    default:
      return state
  }
}
