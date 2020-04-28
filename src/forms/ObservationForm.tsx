import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

interface DefaultsObject {
  taxonConfidence: string
  recordBasis: string
  count: string
  lifeStage: string
  notes: string
}

const ObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function, defaults: DefaultsObject | undefined, t: Function
) => {
  
  // variables for the possible default values of the fields
  let toReturn = []
  let defaultTaxonConfidence: string = 'MY.taxonConfidenceSure'
  let defaultRecordBasis: string = ''
  let defaultCount: string = ''
  let defaultLifeStage: string = 'MY.lifeStageAlive'
  let defaultNotes: string = ''
  
  // hardcoded options for each picker (enum) component
  const taxonConfidenceDictionary: { [key: string]: any } = {
    '' : '',
    'MY.taxonConfidenceSure' : t('MY.taxonConfidenceSure'),
    'MY.taxonConfidenceUnsure' : t('MY.taxonConfidenceUnsure')
  }
  const recordBasisDictionary: { [key: string]: any } = {
    '' : '',
    'MY.recordBasisPreservedSpecimen' : t('MY.recordBasisPreservedSpecimen'),
    'MY.recordBasisHumanObservationPhoto' : t('MY.recordBasisHumanObservationPhoto'),
    'MY.recordBasisHumanObservationVideo' : t('MY.recordBasisHumanObservationVideo'),
    'MY.recordBasisHumanObservationIndirect' : t('MY.recordBasisHumanObservationIndirect')
  }
  const lifeStageDictionary: { [key: string]: any } = {
    'MY.lifeStageDead' : t('MY.lifeStageDead'),
    'MY.lifeStageAlive' : t('MY.lifeStageAlive')
  }

  // inserting the default values into the variables in fields where a default value exists
  if (defaults !== undefined) {
    if (defaults.taxonConfidence !== undefined) { defaultTaxonConfidence = defaults.taxonConfidence }
    if (defaults.recordBasis !== undefined) { defaultRecordBasis = defaults.recordBasis }
    if (defaults.count !== undefined) { defaultCount = defaults.count }
    if (defaults.lifeStage !== undefined) { defaultLifeStage = defaults.lifeStage }
    if (defaults.notes !== undefined) { defaultNotes = defaults.notes }
  }

  // creating the actual form elements, they're hardcoded and use the above variables to define the default values
  toReturn.push(createPicker(t('taxonConfidence'), 'taxonConfidence', defaultTaxonConfidence, register, setValue, watch, errors, unregister, taxonConfidenceDictionary))
  toReturn.push(createPicker(t('recordBasis'), 'recordBasis', defaultRecordBasis, register, setValue, watch, errors, unregister, recordBasisDictionary))
  toReturn.push(createInputElement(t('count'), 'count', '', 'string', defaultCount, register, setValue, watch, errors, unregister, false, undefined, true))
  toReturn.push(createPicker(t('lifeStage'), 'lifeStage', defaultLifeStage, register, setValue, watch, errors, unregister, lifeStageDictionary))
  toReturn.push(createInputElement(t('notes'), 'notes', '', 'string', defaultNotes, register, setValue, watch, errors, unregister, false, undefined, true))
  
  return (toReturn)
}

export default ObservationForm