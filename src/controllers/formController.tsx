import ApolloClient, { gql } from 'apollo-boost'
import { Alert } from 'react-native'

const client = new ApolloClient({
  uri: 'https://apitest.laji.fi/v0/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: 'R7uWGymPsmJ2ItzJphThYBcqLc6dBVDBfdUEGSRYq8aChwRvi34zvfJyrXTTUHFB'
      }
    })
  }
})

export const getSchema = async () => {
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
    //console.log(JSON.stringify(response.data.form.schema, null, '  '))
    return JSON.stringify(response.data.form.schema, null, '  ')
  } catch (error) {
    Alert.alert(error)
    return null
  }
}

export const getUISchema = async () => {
  const query = gql`
    query {
      form(id: "MHL.45") {
        id
        uiSchema
      }
    }
  `
  try {
    const response = await client.query({ query })
    //console.log(response.data.form.uiSchema)
    return response.data.form.uiSchema
  } catch (error) {
    Alert.alert(error)
    return null
  }
}
