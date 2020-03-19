import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

const NestObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function
) => {
  let toReturn = []
  const nestTypeDictionary: { [key: string]: any } = {
    'MY.nestTypeTreeCavity' : 'Kolopesä puussa'
  }
  const taxonConfidenceDictionary: { [key: string]: any } = {
    '' : '',
    'MY.taxonConfidenceSure' : 'varma',
    'MY.taxonConfidenceUnsure' : 'epävarma',
    'MY.taxonConfidenceSubspeciesUnsure' : 'alalaji epävarma'
  }
  toReturn.push(createPicker('Pesän tyyppi', 'nestType', 'MY.nestTypeTreeCavity', register, setValue, watch, errors, unregister, nestTypeDictionary))
  toReturn.push(createInputElement('Pesän tarkenne', 'nestNotes', '', 'string', '', register, setValue, watch, errors, unregister, false, undefined))
  toReturn.push(createInputElement('Pesien/kolojen määrä', 'nestCount', '', 'integer', '', register, setValue, watch, errors, unregister, false, undefined))
  toReturn.push(createPicker('Onko varmasti liito-oravan pesä?', 'taxonConfidence', '', register, setValue, watch, errors, unregister, taxonConfidenceDictionary))
  return (toReturn)
}

export default NestObservationForm