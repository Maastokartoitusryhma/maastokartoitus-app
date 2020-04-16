import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

const TrackObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function, defaults: Object | undefined, t: Function
) => {

  // variables for the possible default values of the fields
  let toReturn = []
  let defaultIndirectObservationType = null
  let defaultNotes = null

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

  // inserting the hardcoded default options from the schema to the variables in case where there was no default value from the user
  if (defaultIndirectObservationType === null) { defaultIndirectObservationType = 'MY.indirectObservationTypeSnowTracks' }
  if (defaultNotes === null) { defaultNotes = '' }

  // creating the actual form elements, they're hardcoded and use the above variables to define the default values
  toReturn.push(createPicker(t('indirectObservationType'), 'indirectObservationType', defaultIndirectObservationType , register, setValue, watch, errors, unregister, indirectObservationTypeDictionary))
  toReturn.push(createInputElement(t('notes'), 'notes', '', 'string', defaultNotes, register, setValue, watch, errors, unregister, false, undefined))
  return (toReturn)
}

export default TrackObservationForm