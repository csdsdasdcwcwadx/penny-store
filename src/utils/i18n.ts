import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const covid19 = require('@locales/covid19.json');
const normal = require('@locales/normal.json');

export default function () {
    i18n.use(initReactI18next) // passes i18n down to react-i18next
        .init({
            // the translations
            // (tip move them in a JSON file and import them,
            // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
            resources: {
                covid19: {
                    translation: covid19,
                },
                normal: {
                    translation: normal,
                },
            },
            lng: 'covid19', // if you're using a language detector, do not define the lng option
            fallbackLng: 'covid19',

            interpolation: {
                escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
            },
        });
}
