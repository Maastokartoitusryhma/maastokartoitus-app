import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

const ObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function, defaults: Object | undefined, t: Function
) => {
  
  let toReturn = []
  let defaultTaxonConfidence = null
  let defaultRecordBasis = null
  let defaultCount = null
  let defaultLifeStage = null
  let defaultNotes = null
  
  const taxonConfidenceDictionary: { [key: string]: any } = {
    '' : '',
    'MY.taxonConfidenceSure' : t('MY.taxonConfidenceSure'),
    'MY.taxonConfidenceUnsure' : t('MY.taxonConfidenceUnsure'),
    'MY.taxonConfidenceSubspeciesUnsure' : t('MY.taxonConfidenceSubspeciesUnsure')
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

  if(defaults !== undefined) {
    if(defaults.taxonConfidence !== undefined) { defaultTaxonConfidence = defaults.taxonConfidence }
    if(defaults.recordBasis !== undefined) { defaultRecordBasis = defaults.recordBasis }
    if(defaults.count !== undefined) { defaultCount = defaults.count }
    if(defaults.lifeStage !== undefined) { defaultLifeStage = defaults.lifeStage }
    if(defaults.notes !== undefined) { defaultNotes = defaults.notes }
  }

  if(defaultTaxonConfidence === null || defaultTaxonConfidence === undefined) { defaultTaxonConfidence = 'MY.taxonConfidenceSure' }
  if(defaultRecordBasis === null || defaultRecordBasis === undefined) { defaultRecordBasis = '' }
  if(defaultCount === null || defaultCount === undefined) { defaultCount = '' }
  if(defaultLifeStage === null || defaultLifeStage === undefined) {defaultLifeStage = 'MY.lifeStageAlive'}
  if(defaultNotes === null || defaultNotes === undefined) {defaultNotes = ''}

  toReturn.push(createPicker(t('taxonConfidence'), 'taxonConfidence', defaultTaxonConfidence, register, setValue, watch, errors, unregister, taxonConfidenceDictionary))
  toReturn.push(createPicker(t('recordBasis'), 'recordBasis', defaultRecordBasis, register, setValue, watch, errors, unregister, recordBasisDictionary))
  toReturn.push(createInputElement(t('count'), 'count', '', 'string', defaultCount, register, setValue, watch, errors, unregister, false, undefined))
  toReturn.push(createPicker(t('lifeStage'), 'lifeStage', defaultLifeStage, register, setValue, watch, errors, unregister, lifeStageDictionary))
  toReturn.push(createInputElement(t('notes'), 'notes', '', 'string', defaultNotes, register, setValue, watch, errors, unregister, false, undefined))
  
  return (toReturn)
}

export default ObservationForm