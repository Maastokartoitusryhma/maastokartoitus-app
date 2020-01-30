import axios from 'axios'

export const getForm = () => {
  const promise = axios.get('https://apitest.laji.fi/v0/forms/MHL.15?lang=fi&format=schema&access_token=R7uWGymPsmJ2ItzJphThYBcqLc6dBVDBfdUEGSRYq8aChwRvi34zvfJyrXTTUHFB')
  return promise
}