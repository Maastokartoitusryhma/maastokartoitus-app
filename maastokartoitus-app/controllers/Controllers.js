import axios from 'axios'

export const getForm = async () => {
  const response = await axios.get('https://apitest.laji.fi/v0/forms/MHL.1?lang=fi&format=schema&access_token=R7uWGymPsmJ2ItzJphThYBcqLc6dBVDBfdUEGSRYq8aChwRvi34zvfJyrXTTUHFB')
  console.log(response.data)
  return null
}