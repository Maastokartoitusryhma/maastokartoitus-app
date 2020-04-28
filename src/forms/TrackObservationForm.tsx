import { createPicker, createInputElement } from '../builders/FormComponentBuilders'

interface DefaultsObject {
  indirectObservationType: string
  notes: string
}

const TrackObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function, defaults: DefaultsObject | undefined, t: Function
) => {

  // variables for the possible default values of the fields
  let toReturn = []
  let defaultIndirectObservationType: string = 'MY.indirectObservationTypeSnowTracks'
  let defaultNotes: string = ''

  // hardcoded options for each picker (enum) component
  const indirectObservationTypeDictionary: { [key: string]: any } = {
    'MY.indirectObservationTypeSnowTracks' : t('MY.indirectObservationTypeSnowTracks'),
    'MY.indirectObservationTypeUrine' : t('MY.indirectObservationTypeUrine'),
    'MY.indirectObservationTypeFeasting' : t('MY.indirectObservationTypeFeasting'),
    'MY.indirectObservationTypeFoodStock' : t('MY.indirectObservationTypeFoodStock')
  }

  // inserting the default values into the variables in fields where a default value exists
  if (defaults !== undefined) {
    if (defaults.indirectObservationType !== undefined) { defaultIndirectObservationType = defaults.indirectObservationType }
    if (defaults.notes !== undefined) { defaultNotes = defaults.notes }
  }

  // creating the actual form elements, they're hardcoded and use the above variables to define the default values
  toReturn.push(createPicker(t('indirectObservationType'), 'indirectObservationType', defaultIndirectObservationType , register, setValue, watch, errors, unregister, indirectObservationTypeDictionary))
  toReturn.push(createInputElement(t('notes'), 'notes', '', 'string', defaultNotes, register, setValue, watch, errors, unregister, false, undefined, true))
  return (toReturn)
}

export default TrackObservationForm