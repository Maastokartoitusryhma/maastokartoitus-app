import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

const NestObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function, defaults: Object | undefined
) => {

  let toReturn = []
  let defaultNestType = null
  let defaultNestNotes = null
  let defaultNestCount = null
  let defaultTaxonConfidence = null

  const nestTypeDictionary: { [key: string]: any } = {
    'MY.nestTypeTreeCavity' : 'Kolopesä puussa'
  }
  const taxonConfidenceDictionary: { [key: string]: any } = {
    '' : '',
    'MY.taxonConfidenceSure' : 'varma',
    'MY.taxonConfidenceUnsure' : 'epävarma',
    'MY.taxonConfidenceSubspeciesUnsure' : 'alalaji epävarma'
  }

  if(defaults !== undefined) {
    if(defaults.nestType !== undefined) { defaultNestType = defaults.nestType }
    if(defaults.nestNotes !== undefined) { defaultNestNotes = defaults.nestNotes }
    if(defaults.nestCount !== undefined) { defaultNestCount = defaults.nestCount }
    if(defaults.taxonConfidence !== undefined) { defaultTaxonConfidence = defaults.taxonConfidence }
  }

  if(defaultNestType === null || defaultNestType === undefined) { defaultNestType = 'MY.nestTypeTreeCavity' }
  if(defaultNestNotes === null || defaultNestNotes === undefined) { defaultNestNotes = '' }
  if(defaultNestCount === null || defaultNestCount === undefined) { defaultNestCount = '' }
  if(defaultTaxonConfidence === null || defaultTaxonConfidence === undefined) { defaultTaxonConfidence = '' }

  toReturn.push(createPicker('Pesän tyyppi', 'nestType', defaultNestType, register, setValue, watch, errors, unregister, nestTypeDictionary))
  toReturn.push(createInputElement('Pesän tarkenne', 'nestNotes', '', 'string', defaultNestNotes, register, setValue, watch, errors, unregister, false, undefined))
  toReturn.push(createInputElement('Pesien/kolojen määrä', 'nestCount', '', 'integer', defaultNestCount, register, setValue, watch, errors, unregister, false, undefined))
  toReturn.push(createPicker('Onko varmasti liito-oravan pesä?', 'taxonConfidence', defaultTaxonConfidence, register, setValue, watch, errors, unregister, taxonConfidenceDictionary))
  return (toReturn)
}

export default NestObservationForm