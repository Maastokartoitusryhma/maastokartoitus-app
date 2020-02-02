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
          'mobile app': 'Mobiilisovellus maastokartoituksiin',
          'observation event': 'Uusi havaintotapahtuma',
          'observation zone': 'Valitse havainnointialue',
          'observation': 'Havainto',
          'species': 'laji',
          'required field': 'Pakollinen kenttä.',
          'loggedin': 'Kirjautuneena: ',
          'login': 'Kirjaudu sisään',
          'logout': 'Kirjaudu ulos',
          'finnish': 'suomi',
          'english': 'englanti',
          'select language': 'Valitse kieli',
          'map': 'Kartta',
          'personal token': 'Syötä henkilökohtainen tokenisi',
          'incorrect token': 'Virheellinen token',
          'center': 'Keskitä',
        },
      },
      en: {
        translation: {
          'mobile app': 'Mobile App for Nature Mapping',
          'observation event': 'New observation event',
          'observation zone': 'Select observation zone',
          'observation': 'Observation',
          'species': 'species',
          'required field': 'Required field.',
          'loggedin': 'Logged in: ',
          'login': 'Login',
          'logout': 'Log out',
          'finnish': 'Finnish',
          'english': 'English',
          'select language': 'Select language',
          'map': 'Map',
          'personal token': 'Enter your personal token',
          'incorrect token': 'Incorrect token',
          'center': 'Center',
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