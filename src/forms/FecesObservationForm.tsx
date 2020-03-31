import { createPicker } from '../builders/FormComponentBuilders'

const FecesObservationForm = (
  register: Function, setValue: Function,
  watch: Function, errors: Object, 
  unregister: Function, defaults: Object | undefined, t: Function) => {

  let toReturn = []
  let defaultLolifeDroppingsType = null
  let defaultLolifeDroppingsCount = null
  let defaultLolifeDroppingsQuality = null

  const lolifeDroppingsTypeDictionary: { [key: string]: any } = {
    '' : '',
    'MY.lolifeDroppingsTypeRock' : t('MY.lolifeDroppingsTypeRock'),
    'MY.lolifeDroppingsTypeTree' : t('MY.lolifeDroppingsTypeTree'),
    'MY.lolifeDroppingsTypeTreeGroup' : t('MY.lolifeDroppingsTypeTreeGroup'),
    'MY.lolifeDroppingsTypeOther' : t('MY.lolifeDroppingsTypeOther')
  }
  const lolifeDroppingsCountDictionary: { [key: string]: any } = {
    '' : '',
    'MY.lolifeDroppingsCount1' : t('MY.lolifeDroppingsCount1'),
    'MY.lolifeDroppingsCount2' : t('MY.lolifeDroppingsCount2'),
    'MY.lolifeDroppingsCount3' : t('MY.lolifeDroppingsCount3')
  }
  const lolifeDroppingsQualityDictionary: { [key: string]: any } = {
    '' : '',
    'MY.lolifeDroppingsQuality1' : t('MY.lolifeDroppingsQuality1'),
    'MY.lolifeDroppingsQuality2' : t('MY.lolifeDroppingsQuality2'),
    'MY.lolifeDroppingsQuality3' : t('MY.lolifeDroppingsQuality3')
  }

  if (defaults !== undefined) {
    if (defaults.lolifeDroppingsType !== undefined) { defaultLolifeDroppingsType = defaults.lolifeDroppingsType }
    if (defaults.lolifeDroppingsCount !== undefined) { defaultLolifeDroppingsCount = defaults.lolifeDroppingsCount }
    if (defaults.lolifeDroppingsQuality !== undefined) { defaultLolifeDroppingsQuality = defaults.lolifeDroppingsQuality }
  }

  if (defaultLolifeDroppingsType === null || defaultLolifeDroppingsType === undefined) { defaultLolifeDroppingsType =  '' }
  if (defaultLolifeDroppingsCount === null || defaultLolifeDroppingsCount === undefined) { defaultLolifeDroppingsCount = '' }
  if (defaultLolifeDroppingsQuality === null || defaultLolifeDroppingsQuality === undefined) { defaultLolifeDroppingsQuality = '' }

  toReturn.push(createPicker(t('lolifeDroppingsType'), 'lolifeDroppingsType', defaultLolifeDroppingsType, 
    register, setValue, watch, errors, unregister, lolifeDroppingsTypeDictionary))

  toReturn.push(createPicker(t('lolifeDroppingsCount'), 'lolifeDroppingsCount', defaultLolifeDroppingsCount,
    register, setValue, watch, errors, unregister, lolifeDroppingsCountDictionary))

  toReturn.push(createPicker(t('lolifeDroppingsQuality'), 'lolifeDroppingsQuality', defaultLolifeDroppingsQuality,
    register, setValue, watch, errors, unregister, lolifeDroppingsQualityDictionary))
    
  return (toReturn)
}

export default FecesObservationForm