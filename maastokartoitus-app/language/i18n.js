import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import finnish from './translations/finnish'
import english from './translations/english'
import swedish from './translations/swedish'

i18n
  .use(initReactI18next)
  .init({
    lng: 'fi',
    fallbackLng: ['en', 'sv'],
    resources: {
      fi: {
        translation: finnish
      },
      en: {
        translation: english
      },
      sv: {
        translation: swedish
      }
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