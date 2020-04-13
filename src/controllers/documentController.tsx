import ApolloClient, { gql } from 'apollo-boost'
import { Alert } from 'react-native'
import axios from 'axios'
import temporaryForm from '../../temporaryForm.json'

interface BasicObject {
  [key: string]: any
}

const setClient = (language: string) => {
  return new ApolloClient({
    uri: 'https://apitest.laji.fi/v0/graphql',
    request: (operation) => {
      operation.setContext({
        headers: {
          'Authorization': 'R7uWGymPsmJ2ItzJphThYBcqLc6dBVDBfdUEGSRYq8aChwRvi34zvfJyrXTTUHFB',
          'Accept-Language': language
        }
      })
    }
  })
}

export const getObservationEventSchema = async (language: string) => {
  const client = setClient(language)
  const query = gql`
    query {
      form(id: "MHL.45") {
        id
        schema
      }
    }
  `
  try {
    const response = await client.query({ query })
    return response.data.form.schema
  } catch (error) {
    Alert.alert(error)
    return null
  }
}

export const getSingleObservationSchema = async (language: string) => {
  const client = setClient(language)
  const query = gql`
    query {
      form(id: "MHL.45") {
        id
        schema
      }
    }
  `
  try {
    const response = await client.query({ query })
    return response.data.form.schema.properties.gatherings.items.properties.units.items.properties
  } catch (error) {
    Alert.alert(error)
    return null
  }
}

export const postObservationEvent = async (observationEvent: BasicObject, token: string) => {
  const event = observationEvent.schema
  const units = observationEvent.schema.gatherings[0].units

  // remove unnecessary fields
  units.forEach((observation: BasicObject) => {
    delete observation.id
    delete observation.type
  })

  event.gatherings[0].units = units

  const accessToken = 'R7uWGymPsmJ2ItzJphThYBcqLc6dBVDBfdUEGSRYq8aChwRvi34zvfJyrXTTUHFB'
  let url = `https://apitest.laji.fi/v0/documents?personToken=${token}&access_token=${accessToken}&validationErrorFormat=remote`
  
  try {
    //console.log('URL: ' + url)
    let response = await axios.post(url, event)
    console.log(response)
  } catch (error) {
    console.log('ERROR: ' + error)
  }
}