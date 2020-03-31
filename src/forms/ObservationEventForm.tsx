import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

const ObservationEventForm = (register: Function, setValue: Function,
  watch: Function, errors: Object, unregister: Function, defaults: Object | undefined
) => {
  
  let toReturn = []
  let defaultLeg = null
  let defaultLegPublic = null
  let defaultEditors = null
  let defaultSecureLevel = null
  let defaultDateBegin = null
  let defaultDateEnd = null
  let defaultKeywords = null

  const legPublicDictionary: { [key: string]: any } = {
    'true' : 'Kyllä',
    'false' : 'Ei'
  }
  
  const secureLevelDictionary: { [key: string]: any } = {
    'MX.secureLevelNone' : 'Ei karkeistettu',
    'MX.secureLevelKM10' : '10 km'
  }

  if(defaults !== undefined) {
    if(defaults.gatheringEvent.leg !== undefined) { defaultLeg = defaults.gatheringEvent.leg }
    if(defaults.gatheringEvent.legPublic !== undefined) { defaultLegPublic = defaults.gatheringEvent.legPublic }
    if(defaults.editors !== undefined) { defaultEditors = defaults.editors }
    if(defaults.secureLevel !== undefined) { defaultSecureLevel = defaults.secureLevel }
    if(defaults.gatheringEvent.dateBegin != undefined) { defaultDateBegin = defaults.gatheringEvent.dateBegin }
    if(defaults.gatheringEvent.dateEnd != undefined) { defaultDateEnd = defaults.gatheringEvent.dateEnd }
    if(defaults.keywords !== undefined) { defaultKeywords = defaults.keywords }
  }

  if(defaultLeg === null || defaultLeg === undefined) { defaultLeg = '' }
  if(defaultLegPublic === null || defaultLegPublic === undefined) { defaultLegPublic = 'false' }
  if(defaultEditors === null || defaultEditors === undefined) { defaultEditors = '' }
  if(defaultSecureLevel === null || defaultSecureLevel === undefined) { defaultSecureLevel = '' }
  if(defaultDateBegin === null || defaultDateBegin === undefined) { defaultDateBegin = '' }
  if(defaultDateEnd === null || defaultDateEnd === undefined) { defaultDateEnd = '' }
  if(defaultKeywords === null || defaultKeywords === undefined) { defaultKeywords = '' }

  toReturn.push(createArray('Havainnoijat', '', 'leg', 'string', defaultLeg, register, setValue, watch, errors, unregister))
  toReturn.push(createPicker('Havainnoijien nimet ovat julkisia', 'legPublic', defaultLegPublic, register, setValue, watch, errors, unregister, legPublicDictionary))
  toReturn.push(createArray('Muokkausoikeus', '', 'editors', 'string', defaultEditors, register, setValue, watch, errors, unregister))
  toReturn.push(createPicker('Havainnon tarkat paikkatiedot ovat julkisia', 'secureLevel', defaultSecureLevel, register, setValue, watch, errors, unregister, secureLevelDictionary))
  toReturn.push(createInputElement('Alku', 'dateBegin', '', 'string', defaultDateBegin, register, setValue, watch, errors, unregister, false, undefined))
  toReturn.push(createInputElement('Loppu', 'dateEnd', '', 'string', defaultDateEnd, register, setValue, watch, errors, unregister, false, undefined))
  toReturn.push(createInputElement('Avainsanat', 'keywords', '', 'string', defaultKeywords, register, setValue, watch, errors, unregister, false, undefined))
  return (toReturn)
}

export default ObservationEventForm