import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      fi: {
        translation: {
          'havaintotapahtuma': 'Uuusi havaintotapahtuma',
          'havainnointialue': 'Valitse havainnointialue',
        },
      },
      en: {
        translation: {
          'havaintotapahtuma': 'New observation event',
          'havainnointialue': 'Select observation zone',
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