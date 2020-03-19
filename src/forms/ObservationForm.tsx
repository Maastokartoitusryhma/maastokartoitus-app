import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

const ObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function
) => {
  let toReturn = []
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
  toReturn.push(createPicker('Määrityksen varmuus', 'taxonConfidence', 'MY.taxonConfidenceSure', register, setValue, watch, errors, unregister, taxonConfidenceDictionary))
  toReturn.push(createPicker('Havainnointitapa', 'recordBasis', '', register, setValue, watch, errors, unregister, recordBasisDictionary))
  toReturn.push(createInputElement('Määrä', 'count', '', 'string', '', register, setValue, watch, errors, unregister, false, undefined))
  toReturn.push(createPicker('Elinvaihe', 'lifeStage', 'MY.lifeStageAlive', register, setValue, watch, errors, unregister, lifeStageDictionary))
  toReturn.push(createInputElement('Lisätiedot', 'notes', '', 'string', '', register, setValue, watch, errors, unregister, false, undefined))
  return (toReturn)
}

export default ObservationForm