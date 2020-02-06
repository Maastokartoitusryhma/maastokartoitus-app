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
          'swedish': 'ruotsi',
          'select language': 'Valitse kieli',
          'map': 'Kartta',
          'personal token': 'Syötä henkilökohtainen tokenisi',
          'incorrect token': 'Virheellinen token',
          'center': 'Keskitä',
          'home page': 'Etusivu',
          'add observation': 'Lisää havainto',
          'species': 'Laji',
          'location': 'Sijainti',
          'date': 'Päivä',
          'time': 'Aika',
          'info': 'Lisätietoja',
          'save': 'Tallenna',
          'flying squirrel': 'Liito-orava',
          'previous observation events': 'Aiemmat havaintotapahtumat'
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
          'swedish': 'Swedish',
          'select language': 'Select language',
          'map': 'Map',
          'personal token': 'Enter your personal token',
          'incorrect token': 'Incorrect token',
          'center': 'Center',
          'home page': 'Home page',
          'add observation': 'Add observation',
          'species': 'Species',
          'location': 'Location',
          'date': 'Date',
          'time': 'Time',
          'info': 'Info',
          'save': 'Save',
          'flying squirrel': 'Flying squirrel',
          'previous observation events': 'Previous observation events'
        },
      },
      sv: {
        translation: {
          'mobile app': 'Mobilapp för kartläggning',
          'observation event': 'Ny observationshändelse',
          'observation zone': 'Välja observationsplatsen',
          'observation': 'Observation',
          'species': 'art',
          'required field': 'Fältet krävs.',
          'loggedin': 'Loggad in: ',
          'login': 'Logga in',
          'logout': 'Logga ut',
          'finnish': 'finska',
          'english': 'engelska',
          'swedish': 'svenska',
          'select language': 'Välja språk',
          'map': 'Karta',
          'personal token': 'Ange din personliga token',
          'incorrect token': 'Token är ogiltig',
          'center': 'Centrera',
          'home page': 'Hemsida',
          'add observation': 'Ny observation',
          'species': 'Art',
          'location': 'Plats',
          'date': 'Datum',
          'time': 'Tid',
          'info': 'Information',
          'save': 'Spara',
          'flying squirrel': 'Flygekorre',
          'previous observation events': 'Tidigare observationshändelser'
        }
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