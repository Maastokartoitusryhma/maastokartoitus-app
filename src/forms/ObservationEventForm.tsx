import { createPicker, createArray, createInputElement } from '../builders/FormComponentBuilders'

interface BasicObject {
  [key: string]: any
}

const ObservationEventForm = (register: Function, setValue: Function,
  watch: Function, errors: BasicObject, unregister: Function, defaults: BasicObject
) => {
  
  // variables for the possible default values of the fields
  let toReturn = []
  let defaultLeg: Array<string> = []
  let defaultLegPublic: string = 'false'
  let defaultSecureLevel: string = ''
  let defaultDateBegin: string = ''
  let defaultDateEnd: string = ''
  let defaultKeywords: string = ''

  // hardcoded options for each picker (enum) component
  const legPublicDictionary: { [key: string]: any } = {
    'true' : 'Kyllä',
    'false' : 'Ei'
  }
  
  const secureLevelDictionary: { [key: string]: any } = {
    'MX.secureLevelNone' : 'Ei karkeistettu',
    'MX.secureLevelKM10' : '10 km'
  }

  // inserting the default values into the variables in fields where a default value exists
  if (defaults !== undefined) {
    if (defaults.gatheringEvent.leg !== undefined) { defaultLeg = defaults.gatheringEvent.leg }
    if (defaults.gatheringEvent.legPublic !== undefined) { defaultLegPublic = defaults.gatheringEvent.legPublic }
    if (defaults.secureLevel !== undefined) { defaultSecureLevel = defaults.secureLevel }
    if (defaults.gatheringEvent.dateBegin != undefined) { defaultDateBegin = defaults.gatheringEvent.dateBegin }
    if (defaults.gatheringEvent.dateEnd != undefined) { defaultDateEnd = defaults.gatheringEvent.dateEnd }
    if (defaults.keywords !== undefined) { defaultKeywords = defaults.keywords.toString() }
  }

  // creating the actual form elements, they're hardcoded and use the above variables to define the default values
  toReturn.push(createArray('Havainnoijat', '', 'leg', 'string', defaultLeg, register, setValue, watch, errors, unregister))
  toReturn.push(createPicker('Havainnoijien nimet ovat julkisia', 'legPublic', defaultLegPublic, register, setValue, watch, errors, unregister, legPublicDictionary))
  toReturn.push(createPicker('Havainnon tarkat paikkatiedot ovat julkisia', 'secureLevel', defaultSecureLevel, register, setValue, watch, errors, unregister, secureLevelDictionary))
  toReturn.push(createInputElement('Alku', 'dateBegin', '', 'string', defaultDateBegin, register, setValue, watch, errors, unregister, false, undefined))
  toReturn.push(createInputElement('Loppu', 'dateEnd', '', 'string', defaultDateEnd, register, setValue, watch, errors, unregister, false, undefined))
  toReturn.push(createInputElement('Avainsanat', 'keywords', '', 'string', defaultKeywords, register, setValue, watch, errors, unregister, false, undefined))
  
  return (toReturn)
}

export default ObservationEventForm