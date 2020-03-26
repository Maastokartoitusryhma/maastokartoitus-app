import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

const ObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function, defaults: Object | undefined
) => {
  
  let toReturn = []
  let defaultTaxonConfidence = null
  let defaultRecordBasis = null
  let defaultCount = null
  let defaultLifeStage = null
  let defaultNotes = null
  
  const taxonConfidenceDictionary: { [key: string]: any } = {
    '' : '',
    'MY.taxonConfidenceSure' : 'varma',
    'MY.taxonConfidenceUnsure' : 'epävarma',
    'MY.taxonConfidenceSubspeciesUnsure' : 'alalaji epävarma'
  }
  const recordBasisDictionary: { [key: string]: any } = {
    '' : '',
    'MY.recordBasisPreservedSpecimen' : 'Näyte',
    'MY.recordBasisHumanObservationPhoto' : 'Valokuvattu',
    'MY.recordBasisHumanObservationVideo' : 'Videoitu',
    'MY.recordBasisHumanObservationIndirect' : 'Epäsuora havainto (jäljet, ulosteet, yms)'
  }
  const lifeStageDictionary: { [key: string]: any } = {
    'MY.lifeStageDead' : 'kuollut',
    'MY.lifeStageAlive' : 'elävä'
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

  toReturn.push(createPicker('Määrityksen varmuus', 'taxonConfidence', defaultTaxonConfidence, register, setValue, watch, errors, unregister, taxonConfidenceDictionary))
  toReturn.push(createPicker('Havainnointitapa', 'recordBasis', defaultRecordBasis, register, setValue, watch, errors, unregister, recordBasisDictionary))
  toReturn.push(createInputElement('Määrä', 'count', '', 'string', defaultCount, register, setValue, watch, errors, unregister, false, undefined))
  toReturn.push(createPicker('Elinvaihe', 'lifeStage', defaultLifeStage, register, setValue, watch, errors, unregister, lifeStageDictionary))
  toReturn.push(createInputElement('Lisätiedot', 'notes', '', 'string', defaultNotes, register, setValue, watch, errors, unregister, false, undefined))
  
  return (toReturn)
}

export default ObservationForm