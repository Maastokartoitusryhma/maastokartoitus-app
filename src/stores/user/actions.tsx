import {
  userActionTypes,
  SET_USER,
  REMOVE_USER,
  GET_PERSON_TOKEN,
  SET_PERSON_TOKEN,
  CLEAR_PERSON_TOKEN
} from './types'

type UserObject = {
  id: string
  fullName: string
  emailAddress: string
  defaultLanguage: string
}

export const setUser = (user: UserObject) : userActionTypes => ({
  type: SET_USER,
  payload: user
})

export const removeUser = () : userActionTypes => ({
  type: REMOVE_USER
})

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
