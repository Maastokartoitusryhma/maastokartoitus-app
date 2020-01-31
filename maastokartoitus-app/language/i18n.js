import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      fi: {
        havainnointialue: 'Valitse havainnointialue',
        common: {

        },
      },
      en: {
        havainnointialue: 'Select observation zone',
        common: {

        },
      },
    },
    //ns: ['common'],
    //defaultNS: 'common',
    keySeparator: false,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  })

  export default i18n