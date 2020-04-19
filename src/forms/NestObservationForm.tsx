import { createPicker, createInputElement } from '../builders/FormComponentBuilders'

interface DefaultsObject {
  nestType: string
  nestNotes: string
  nestCount: number
  taxonConfidence: string
  notes: string
}

const NestObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function, defaults: DefaultsObject | undefined, t: Function
) => {

  // variables for the possible default values of the fields
  let toReturn = []
  let defaultNestType = null
  let defaultNestNotes = null
  let defaultNestCount = null
  let defaultTaxonConfidence = null
  let defaultNotes = null

  // hardcoded options for each picker (enum) component
  const nestTypeDictionary: { [key: string]: any } = {
    'MY.nestTypeTreeCavity' : t('MY.nestTypeTreeCavity')
  }
  const taxonConfidenceDictionary: { [key: string]: any } = {
    '' : '',
    'MY.taxonConfidenceSure' : t('MY.taxonConfidenceSure'),
    'MY.taxonConfidenceUnsure' : t('MY.taxonConfidenceUnsure'),
    'MY.taxonConfidenceSubspeciesUnsure' : t('MY.taxonConfidenceSubspeciesUnsure')
  }

  // inserting the default values into the variables in fields where a default value exists
  if (defaults !== undefined) {
    if (defaults.nestType !== undefined) { defaultNestType = defaults.nestType }
    if (defaults.nestNotes !== undefined) { defaultNestNotes = defaults.nestNotes }
    if (defaults.nestCount !== undefined) { defaultNestCount = defaults.nestCount }
    if (defaults.taxonConfidence !== undefined) { defaultTaxonConfidence = defaults.taxonConfidence }
    if (defaults.notes !== undefined) { defaultNotes = defaults.notes }
  }

  // inserting the hardcoded default options from the schema to the variables in case where there was no default value from the user
  if (defaultNestType === null || defaultNestType === undefined) { defaultNestType = 'MY.nestTypeTreeCavity' }
  if (defaultNestNotes === null || defaultNestNotes === undefined) { defaultNestNotes = '' }
  if (defaultNestCount === null || defaultNestCount === undefined) { defaultNestCount = '' }
  if (defaultTaxonConfidence === null || defaultTaxonConfidence === undefined) { defaultTaxonConfidence = '' }
  if (defaultNotes === null || defaultNotes === undefined) { defaultNotes = '' }

  // creating the actual form elements, they're hardcoded and use the above variables to define the default values
  toReturn.push(createPicker(t('nestType'), 'nestType', defaultNestType, register, setValue, watch, errors, unregister, nestTypeDictionary))
  toReturn.push(createInputElement(t('nestNotes'), 'nestNotes', '', 'string', defaultNestNotes, register, setValue, watch, errors, unregister, false, undefined))
  toReturn.push(createInputElement(t('nestCount'), 'nestCount', '', 'integer', defaultNestCount, register, setValue, watch, errors, unregister, false, undefined))
  toReturn.push(createPicker(t('taxonConfidenceNest'), 'taxonConfidence', defaultTaxonConfidence, register, setValue, watch, errors, unregister, taxonConfidenceDictionary))
  toReturn.push(createInputElement(t('notes'), 'notes', '', 'string', defaultNotes, register, setValue, watch, errors, unregister, false, undefined))
  return (toReturn)
}

export default NestObservationForm