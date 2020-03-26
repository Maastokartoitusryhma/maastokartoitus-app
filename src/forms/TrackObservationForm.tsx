import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

const TrackObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function, defaults: Object | undefined
) => {

  let toReturn = []
  let defaultIndirectObservationType = null
  let defaultNotes = null

  const indirectObservationTypeDictionary: { [key: string]: any } = {
    'MY.indirectObservationTypeSnowTracks' : 'Lumijälkiä',
    'MY.indirectObservationTypeUrine' : 'Virtsajälkiä',
    'MY.indirectObservationTypeFeasting' : 'Syönnöksiä',
    'MY.indirectObservationTypeFoodStock' : 'Ruokavarasto'
  }

  if(defaults !== undefined) {
    if(defaults.indirectObservationType !== undefined) { defaultIndirectObservationType = defaults.indirectObservationType }
    if(defaults.notes !== undefined) { defaultNotes = defaults.notes }
  }

  if(defaultIndirectObservationType === null) { defaultIndirectObservationType = 'MY.indirectObservationTypeSnowTracks' }
  if(defaultNotes === null) { defaultNotes = '' }

  toReturn.push(createPicker('Jälkiä', 'indirectObservationType', defaultIndirectObservationType , register, setValue, watch, errors, unregister, indirectObservationTypeDictionary))
  toReturn.push(createInputElement('Lisätiedot', 'notes', '', 'string', defaultNotes, register, setValue, watch, errors, unregister, false, undefined))
  return (toReturn)
}

export default TrackObservationForm