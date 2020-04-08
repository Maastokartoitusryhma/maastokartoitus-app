export const GET_PERSON_TOKEN = 'GET_PERSON_TOKEN'
export const SET_PERSON_TOKEN = 'SET_PERSON_TOKEN'
export const CLEAR_PERSON_TOKEN = 'CLEAR_PERSON_TOKEN'

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

export type userActionTypes =
  getPersonToken |
  setPersonToken |
  clearPersonToken