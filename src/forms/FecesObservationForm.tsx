import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

const FecesObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function
) => {
  let toReturn = []
  const lolifeDroppingsTypeDictionary: { [key: string]: any } = {
    '' : '',
    'MY.lolifeDroppingsTypeRock' : 'Kiven päällä',
    'MY.lolifeDroppingsTypeTree' : 'Yksittäinen puu',
    'MY.lolifeDroppingsTypeTreeGroup' : 'Monen puun ryhmä',
    'MY.lolifeDroppingsTypeOther' : 'Muu, kirjaa lisätietoihin'
  }
  const lolifeDroppingsCountDictionary: { [key: string]: any } = {
    '' : '',
    'MY.lolifeDroppingsCount1' : 'Muutama',
    'MY.lolifeDroppingsCount2' : 'Kymmeniä',
    'MY.lolifeDroppingsCount3' : 'Satoja'
  }
  const lolifeDroppingsQualityDictionary: { [key: string]: any } = {
    '' : '',
    'MY.lolifeDroppingsQuality1' : 'Tosi vanhoja',
    'MY.lolifeDroppingsQuality2' : 'Aika vanhoja',
    'MY.lolifeDroppingsQuality3' : 'Tuoreita ja keltaisia'
  }
  toReturn.push(createPicker('Papanahavainnon tyyppi', 'lolifeDroppingsType', '', register, setValue, watch, errors, unregister, lolifeDroppingsTypeDictionary))
  toReturn.push(createPicker('Papanamäärä', 'lolifeDroppingsCount', '', register, setValue, watch, errors, unregister, lolifeDroppingsCountDictionary))
  toReturn.push(createPicker('Papanoiden laatu', 'lolifeDroppingsQuality', '', register, setValue, watch, errors, unregister, lolifeDroppingsQualityDictionary))
  return (toReturn)
}

export default FecesObservationForm