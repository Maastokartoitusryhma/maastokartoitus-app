import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

const FecesObservationForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function, defaults: Object | undefined
) => {

  let toReturn = []
  let defaultLolifeDroppingsType = null
  let defaultLolifeDroppingsCount = null
  let defaultLolifeDroppingsQuality = null

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

  if(defaults !== undefined) {
    if(defaults.lolifeDroppingsType !== undefined) { defaultLolifeDroppingsType = defaults.lolifeDroppingsType }
    if(defaults.lolifeDroppingsCount !== undefined) { defaultLolifeDroppingsCount = defaults.lolifeDroppingsCount }
    if(defaults.lolifeDroppingsQuality !== undefined) { defaultLolifeDroppingsQuality = defaults.lolifeDroppingsQuality }
  }

  if(defaultLolifeDroppingsType === null || defaultLolifeDroppingsType === undefined) { defaultLolifeDroppingsType =  '' }
  if(defaultLolifeDroppingsCount === null || defaultLolifeDroppingsCount === undefined) { defaultLolifeDroppingsCount = '' }
  if(defaultLolifeDroppingsQuality === null || defaultLolifeDroppingsQuality === undefined) { defaultLolifeDroppingsQuality = '' }

  toReturn.push(createPicker('Papanahavainnon tyyppi', 'lolifeDroppingsType', defaultLolifeDroppingsType, register, setValue, watch, errors, unregister, lolifeDroppingsTypeDictionary))
  toReturn.push(createPicker('Papanamäärä', 'lolifeDroppingsCount', defaultLolifeDroppingsCount, register, setValue, watch, errors, unregister, lolifeDroppingsCountDictionary))
  toReturn.push(createPicker('Papanoiden laatu', 'lolifeDroppingsQuality', defaultLolifeDroppingsQuality, register, setValue, watch, errors, unregister, lolifeDroppingsQualityDictionary))
  return (toReturn)
}

export default FecesObservationForm