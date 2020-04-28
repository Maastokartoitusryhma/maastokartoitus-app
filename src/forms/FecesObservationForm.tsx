import { createPicker, createInputElement } from '../builders/FormComponentBuilders'

interface UnitFactObject {
  lolifeDroppingsType: string
  lolifeDroppingsCount: string
  lolifeDroppingsQuality: string
}

interface DefaultsObject {
  unitFact: UnitFactObject
  notes: string
}

const FecesObservationForm = (
  register: Function, setValue: Function,
  watch: Function, errors: Object, 
  unregister: Function, defaults: DefaultsObject | undefined, t: Function) => {

  // variables for the possible default values of the fields
  let toReturn = []
  let defaultLolifeDroppingsType: string | null = ''
  let defaultLolifeDroppingsCount: string | null = ''
  let defaultLolifeDroppingsQuality: string | null = ''
  let defaultNotes: string | null = ''

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

  // creating the actual form elements, they're hardcoded and use the above variables to define the default values
  toReturn.push(createPicker(t('lolifeDroppingsType'), 'lolifeDroppingsType', defaultLolifeDroppingsType, 
    register, setValue, watch, errors, unregister, lolifeDroppingsTypeDictionary))

  toReturn.push(createPicker(t('lolifeDroppingsCount'), 'lolifeDroppingsCount', defaultLolifeDroppingsCount,
    register, setValue, watch, errors, unregister, lolifeDroppingsCountDictionary))

  toReturn.push(createPicker(t('lolifeDroppingsQuality'), 'lolifeDroppingsQuality', defaultLolifeDroppingsQuality,
    register, setValue, watch, errors, unregister, lolifeDroppingsQualityDictionary))

  toReturn.push(createInputElement(t('notes'), 'notes', '', 'string', defaultNotes, 
    register, setValue, watch, errors, unregister, false, undefined, true))
    
  return (toReturn)
}

export default FecesObservationForm