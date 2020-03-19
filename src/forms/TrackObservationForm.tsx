import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

const TrackObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function
) => {
  let toReturn = []
  const indirectObservationTypeDictionary: { [key: string]: any } = {
    'MY.indirectObservationTypeSnowTracks' : 'Lumijälkiä',
    'MY.indirectObservationTypeUrine' : 'Virtsajälkiä',
    'MY.indirectObservationTypeFeasting' : 'Syönnöksiä',
    'MY.indirectObservationTypeFoodStock' : 'Ruokavarasto'
  }
  toReturn.push(createPicker('Jälkiä', 'indirectObservationType', 'MY.indirectObservationTypeSnowTracks', register, setValue, watch, errors, unregister, indirectObservationTypeDictionary))
  toReturn.push(createInputElement('Lisätiedot', 'notes', '', 'string', '', register, setValue, watch, errors, unregister, false, undefined))
  return (toReturn)
}

export default TrackObservationForm