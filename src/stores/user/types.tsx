export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const GET_PERSON_TOKEN = 'GET_PERSON_TOKEN'
export const SET_PERSON_TOKEN = 'SET_PERSON_TOKEN'
export const CLEAR_PERSON_TOKEN = 'CLEAR_PERSON_TOKEN'

type UserObject = {
  id: string
  fullName: string
  emailAddress: string
  defaultLanguage: string
}

interface setUser {
  type: typeof SET_USER
  payload: UserObject
}

interface removeUser {
  type: typeof REMOVE_USER
}

interface getPersonToken {
  type: typeof GET_PERSON_TOKEN
}

interface setPersonToken {
  type: typeof SET_PERSON_TOKEN
  payload: string
}

interface clearPersonToken {
  type: typeof CLEAR_PERSON_TOKEN
}

export type userActionTypes = setUser | removeUser | getPersonToken | setPersonToken | clearPersonToken