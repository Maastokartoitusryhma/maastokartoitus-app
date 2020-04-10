import { SET_USER, REMOVE_USER, userActionTypes } from './types'

type UserObject = {
  id: string
  fullName: string
  emailAddress: string
  defaultLanguage: string
}

export const setUser = (user: UserObject ) : userActionTypes => ({
  type: SET_USER,
  payload: user
})

export const removeUser = () : userActionTypes => ({
  type: REMOVE_USER
})