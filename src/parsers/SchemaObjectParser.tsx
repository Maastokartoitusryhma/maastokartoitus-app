import React from 'react'
import SchemaObjectComponent from '../components/SchemaObjectComponent'

interface BasicObject {
  [key: string]: any
}

export const createSchemaObjectComponents = (JSONObject: BasicObject, schema: BasicObject) => {
  const returnArray: Array<any> = []
  Object.keys(JSONObject).forEach((key) => {
    const objectKey = key
    findSchemaObject(objectKey, JSONObject[objectKey], schema[objectKey], returnArray)
  })
  return returnArray    
 }

const findSchemaObject = (objectKey: string, objectValue: any, schemaObject: BasicObject, componentArray: Array<any>) => {
  if (schemaObject) {
    switch (schemaObject['type']) {
      case 'boolean':
      case 'integer':
      case 'string':
        componentArray.push(
          <SchemaObjectComponent
            key={objectKey} name={objectKey} value={objectValue} 
            schemaObject={schemaObject}>
          </SchemaObjectComponent>)
        break
      case 'array':
        if (!schemaObject['title'] && Array.isArray(objectValue)) {
          objectValue.forEach(item => {
            schemaObject = schemaObject['items']
            findSchemaObject(objectKey, item, schemaObject, componentArray)
          })          
        } else {
          componentArray.push(
            <SchemaObjectComponent 
              key={objectKey} name={objectKey}
              value={JSON.stringify(objectValue)}
              schemaObject={schemaObject}>
            </SchemaObjectComponent>)
        }
        break
      case 'object':
        if (!schemaObject['title'] && typeof(objectValue) === 'object') {
          Object.keys(objectValue).forEach(key => {
            const subSchemaObject = schemaObject['properties'][key]
            findSchemaObject(key, objectValue[key], subSchemaObject, componentArray)
          })          
        } else {
          componentArray.push(
            <SchemaObjectComponent
              key={objectKey} name={objectKey}
              value={JSON.stringify(objectValue)}
              schemaObject={schemaObject}>
            </SchemaObjectComponent>)
        }
        break
      default:
    }
  } else if (objectKey !== 'id' && objectKey !== 'type') { // user doesn't need to see id or type
    //this js object does not have a match in the schema
    componentArray.push(
      <SchemaObjectComponent
        key={objectKey} name={objectKey}
        value={JSON.stringify(objectValue)}
        schemaObject={null}>
      </SchemaObjectComponent>)
  }
}