import { createPicker, createInputElement } from '../builders/FormComponentBuilders'

const FecesObservationForm = (
  register: Function, setValue: Function,
  watch: Function, errors: Object, 
  unregister: Function, defaults: Object | undefined, t: Function) => {

  // variables for the possible default values of the fields
  let toReturn = []
  let defaultLolifeDroppingsType = null
  let defaultLolifeDroppingsCount = null
  let defaultLolifeDroppingsQuality = null
  let defaultNotes = null

  // hardcoded options for each picker (enum) component
  const lolifeDroppingsTypeDictionary: { [key: string]: any } = {
    '' : '',
    'MY.lolifeDroppingsTypeRock' : t('MY.lolifeDroppingsTypeRock'),
    'MY.lolifeDroppingsTypeTree' : t('MY.lolifeDroppingsTypeTree'),
    'MY.lolifeDroppingsTypeTreeGroup' : t('MY.lolifeDroppingsTypeTreeGroup'),
    'MY.lolifeDroppingsTypeOther' : t('MY.lolifeDroppingsTypeOther')
  }
  const lolifeDroppingsCountDictionary: { [key: string]: any } = {
    '' : '',
    'MY.lolifeDroppingsCount1' : t('MY.lolifeDroppingsCount1'),
    'MY.lolifeDroppingsCount2' : t('MY.lolifeDroppingsCount2'),
    'MY.lolifeDroppingsCount3' : t('MY.lolifeDroppingsCount3')
  }
  const lolifeDroppingsQualityDictionary: { [key: string]: any } = {
    '' : '',
    'MY.lolifeDroppingsQuality1' : t('MY.lolifeDroppingsQuality1'),
    'MY.lolifeDroppingsQuality2' : t('MY.lolifeDroppingsQuality2'),
    'MY.lolifeDroppingsQuality3' : t('MY.lolifeDroppingsQuality3')
  }

  // inserting the default values into the variables in fields where a default value exists
  if (defaults !== undefined) {
    if (defaults.unitFact.lolifeDroppingsType !== undefined) { defaultLolifeDroppingsType = defaults.unitFact.lolifeDroppingsType }
    if (defaults.unitFact.lolifeDroppingsCount !== undefined) { defaultLolifeDroppingsCount = defaults.unitFact.lolifeDroppingsCount }
    if (defaults.unitFact.lolifeDroppingsQuality !== undefined) { defaultLolifeDroppingsQuality = defaults.unitFact.lolifeDroppingsQuality }
    if (defaults.notes !== undefined) { defaultNotes = defaults.notes }
  }

  // inserting the hardcoded default options from the schema to the variables in case where there was no default value from the user
  if (defaultLolifeDroppingsType === null || defaultLolifeDroppingsType === undefined) { defaultLolifeDroppingsType =  '' }
  if (defaultLolifeDroppingsCount === null || defaultLolifeDroppingsCount === undefined) { defaultLolifeDroppingsCount = '' }
  if (defaultLolifeDroppingsQuality === null || defaultLolifeDroppingsQuality === undefined) { defaultLolifeDroppingsQuality = '' }
  if (defaultNotes === null || defaultNotes === undefined) {defaultNotes = ''}

  // creating the actual form elements, they're hardcoded and use the above variables to define the default values
  toReturn.push(createPicker(t('lolifeDroppingsType'), 'lolifeDroppingsType', defaultLolifeDroppingsType, 
    register, setValue, watch, errors, unregister, lolifeDroppingsTypeDictionary))

  toReturn.push(createPicker(t('lolifeDroppingsCount'), 'lolifeDroppingsCount', defaultLolifeDroppingsCount,
    register, setValue, watch, errors, unregister, lolifeDroppingsCountDictionary))

  toReturn.push(createPicker(t('lolifeDroppingsQuality'), 'lolifeDroppingsQuality', defaultLolifeDroppingsQuality,
    register, setValue, watch, errors, unregister, lolifeDroppingsQualityDictionary))

  toReturn.push(createInputElement(t('notes'), 'notes', '', 'string', defaultNotes, 
    register, setValue, watch, errors, unregister, false, undefined))
    
  return (toReturn)
}

export default FecesObservationForm