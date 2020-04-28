import ApolloClient, { gql } from 'apollo-boost'
import axios from 'axios'
import { otherActionTypes } from '../stores/other/types'
import i18n from '../language/i18n'
import * as FileSystem from 'expo-file-system'
import _ from 'lodash'

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
    console.log('Error:', error)
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
    console.log('Error:', error)
    return null
  }
}

export const postObservationEvent = async (observationEvent: BasicObject, token: string, setMessageVisibilityTrue: () => otherActionTypes, setMessageContent: (content: string) => otherActionTypes) => {

  const event = _.cloneDeep(observationEvent.schema)
  const units = _.cloneDeep(observationEvent.schema.gatherings[0].units)

  // remove unnecessary fields
  units.forEach((observation: BasicObject) => {
    delete observation.id
    delete observation.type
    delete observation.localImages
  })

  event.gatherings[0].units = units

  const accessToken = 'R7uWGymPsmJ2ItzJphThYBcqLc6dBVDBfdUEGSRYq8aChwRvi34zvfJyrXTTUHFB'
  let url = `https://apitest.laji.fi/v0/documents?personToken=${token}&access_token=${accessToken}&validationErrorFormat=remote`
  
  try {
    let response = await axios.post(url, event)
    console.log(response)
    setMessageVisibilityTrue()
    if (i18n.language === 'fi') {
      if (response.status === 200) {
        setMessageContent('Lähettäminen onnistui!')
      } else {
        setMessageContent(`Lähettäminen epäonnistui koodilla ${response.status}`)
      }
    } else if (i18n.language === 'en') {
      if (response.status === 200) {
        setMessageContent('Sending succeeded!')
      } else {
        setMessageContent(`Sending to server failed with status code ${response.status}`)
      }
    } else {
      if (response.status === 200) {
        setMessageContent('Skickande lyckades!')
      } else {
        setMessageContent(`Skickande misslyckades med statuskod ${response.status}`)
      }
    }
  } catch (error) {
    console.log('ERROR: ' + error)
    setMessageVisibilityTrue()
    if (i18n.language === 'fi') {
      setMessageContent(`Palvelimelle lähettäminen epäonnistui: ${error}`)
    } else if (i18n.language === 'en') {
      setMessageContent(`Sending to server failed: ${error}`)
    } else {
      setMessageContent(`Skickande till server misslyckades: ${error}`)
    }
  }
}

const postImageFile = async (image: string, token: string) => {

  const accessToken = 'R7uWGymPsmJ2ItzJphThYBcqLc6dBVDBfdUEGSRYq8aChwRvi34zvfJyrXTTUHFB'
  let url = `https://apitest.laji.fi/v0/images?personToken=${token}&access_token=${accessToken}&formID=MHL.51`

  // readAsStringAsync reads the file contents and converts it to base64-encoded string
  const base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' })

  // Instead of using FormData, the payload is manually constructed below
  // const data = new FormData()
  // data.append('photo', 'data:image/jpeg;name=IMAGE.JPG;base64,' + base64)

  let boundary = '---erotin---'
  let payloadheader = boundary + '\n' +
        'Content-Disposition: form-data; name="data"; filename="IMAGE.JPG"\n' +
        'Content-Type: image/jpeg\n\n\n' + 
        boundary + '\n'

  let payload = payloadheader + 'data:image/jpeg;name=IMAGE.JPG;base64,' + base64

  try {
    let response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundary
      }
    })
    console.log('POST /images/ response: ' + response)
  } catch (error) {
    console.log('POST /images/ error: ' + error)
  }
  
}

const postImageMetadata = async () => {
  
}
