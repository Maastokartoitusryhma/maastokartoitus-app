import ApolloClient, { gql } from 'apollo-boost'
import { Alert } from 'react-native'
import axios from 'axios'

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

export const postObservationEvent = async (observationEvent: BasicObject) => {
  const event = observationEvent.schema
  const units = observationEvent.schema.gatherings[0].units

  // remove unnecessary fields
  units.forEach((observation: BasicObject) => {
    delete observation.id
    delete observation.type
  })
  console.log('UNITS TO SEND: ', units)

  event.gatherings[0].units = units
  console.log('EVENT TO SEND: ', event)

  try {
    const response = await axios.post(`https://apitest.laji.fi/v0/documents/validate?formID=MHL.45`, event)
    //Alert.alert('RESPONSE: ', JSON.stringify(response))
    console.log(response)
  } catch (error) {
    //Alert.alert(error)
    console.log(error)
  }

  //Check that response is 200
  //Set sentToServer true
  //Use the method that checks that there's not over 5 sent events stored in async
}