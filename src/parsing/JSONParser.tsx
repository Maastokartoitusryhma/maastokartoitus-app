//import schema from '../../temporaryschema.json'

export const getKeys = (level) => {
  console.log('KEYS')
  let keys: string[] = []
  Object.keys(level).forEach((key) => {
    console.log(key)
    keys.push(key)
  })
  return keys
}

export const getAllKeys = (schema) => {
  // //EI TOIMI
  // //Pitäisi käsitellä myös valuet.
  // let keys: string[] = getKeys(schema)
  // keys.forEach((key) => {
  //   if (key.includes('string')) {
  //     //TextField
  //   } else if (key.includes('enumNames')) {
  //     //Checkbox
  //   } else if (key.includes('array')) {
  //     //TextField + Add
  //   } else if (key.includes('boolean')) {
  //     //Checkbox
  //   } else if (key.includes('object')) {
  //     //Title
  //   }
  //   getAllKeys(schema.key)
  // })
}