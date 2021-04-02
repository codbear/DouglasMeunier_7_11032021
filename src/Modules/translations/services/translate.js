import fr from '../locales/fr.json';

const translations = { fr };

const translate = (string, locale = 'fr') => translations[locale][string] ?? string;

export default translate;
