import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

interface BasicObject {
  [key: string]: any
}

type Props = {
  name: string
  value: string | number | boolean
  schemaObject : BasicObject | null
}

const SchemaObjectComponent = (props: Props) => {
  const [label, setLabel] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    findObjectDataFromSchemaObject()
  }, [])

  const findObjectDataFromSchemaObject = () => {
    if (props.schemaObject) {
      const title = props.schemaObject['title']
      const enums = props.schemaObject['enum']
      const enumNames = props.schemaObject['enumNames']

      if (title) {
        setLabel(title)
      }
      if (enums && enumNames && Array.isArray(enums)) {
        let enumIndex = enums.findIndex(enumValue => enumValue === props.value)
        if (enumIndex !== -1) {
          setText(enumNames[enumIndex])
        }
      }
    }    
  }

  return (
    <View>
      <Text key={props.name}>
        {label === '' ? props.name : label}:
         {text === '' ? props.value : text}</Text>
    </View>
  )
}

export default SchemaObjectComponent