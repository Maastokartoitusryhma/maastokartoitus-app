import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    lng: 'fi',
    fallbackLng: 'en',
    resources: {
      fi: {
        translation: {
          'observation event': 'Uusi havaintotapahtuma',
          'observation zone': 'Valitse havainnointialue',
          'species': 'laji',
          'required field': 'Pakollinen kenttä.'
        },
      },
      en: {
        translation: {
          'observation event': 'New observation event',
          'observation zone': 'Select observation zone',
          'species': 'species',
          'required field': 'Required field.'
        },
      },
    },
    //ns: ['common'],
    //defaultNS: 'common',
    keySeparator: false,
    //debug: true,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n