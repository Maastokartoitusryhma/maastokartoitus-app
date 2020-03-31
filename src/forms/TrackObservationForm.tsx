import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

const TrackObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function, defaults: Object | undefined, t: Function
) => {

  let toReturn = []
  let defaultIndirectObservationType = null
  let defaultNotes = null

  const indirectObservationTypeDictionary: { [key: string]: any } = {
    'MY.indirectObservationTypeSnowTracks' : t('MY.indirectObservationTypeSnowTracks'),
    'MY.indirectObservationTypeUrine' : t('MY.indirectObservationTypeUrine'),
    'MY.indirectObservationTypeFeasting' : t('MY.indirectObservationTypeFeasting'),
    'MY.indirectObservationTypeFoodStock' : t('MY.indirectObservationTypeFoodStock')
  }

  if(defaults !== undefined) {
    if(defaults.indirectObservationType !== undefined) { defaultIndirectObservationType = defaults.indirectObservationType }
    if(defaults.notes !== undefined) { defaultNotes = defaults.notes }
  }

  if(defaultIndirectObservationType === null) { defaultIndirectObservationType = 'MY.indirectObservationTypeSnowTracks' }
  if(defaultNotes === null) { defaultNotes = '' }

  toReturn.push(createPicker(t('indirectObservationType'), 'indirectObservationType', defaultIndirectObservationType , register, setValue, watch, errors, unregister, indirectObservationTypeDictionary))
  toReturn.push(createInputElement(t('notes'), 'notes', '', 'string', defaultNotes, register, setValue, watch, errors, unregister, false, undefined))
  return (toReturn)
}

export default TrackObservationForm