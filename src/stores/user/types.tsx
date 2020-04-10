export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'

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

export type userActionTypes = setUser | removeUser