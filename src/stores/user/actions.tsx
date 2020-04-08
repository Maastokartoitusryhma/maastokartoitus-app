import { userActionTypes,
  GET_PERSON_TOKEN,
  SET_PERSON_TOKEN,
  CLEAR_PERSON_TOKEN
} from './types'

export const getPersonToken = () : userActionTypes => ({
  type: GET_PERSON_TOKEN
})

export const setPersonToken = (personToken : string) : userActionTypes => ({
  type: SET_PERSON_TOKEN,
  payload: personToken,
})

export const clearPersonToken = () : userActionTypes => ({
  type: CLEAR_PERSON_TOKEN
})
