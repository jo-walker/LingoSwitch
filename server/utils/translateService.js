const { Translate } = require('@google-cloud/translate').v2;

// Creates a client using the service account key
const translate = new Translate({
  keyFilename: './utils/lingo-switch-620bb68e81d7.json'
});

/**
 * Translates text into the specified target language.
 * @param {string} text - The text to be translated.
 * @param {string} targetLanguage - The target language code (e.g., 'fr', 'de').
 * @returns {Promise<string>} - The translated text.
 */
async function translateText(text, targetLanguage) {
  try {
    const [translations] = await translate.translate(text, targetLanguage);
    return translations;
  } catch (error) {
    console.error('Translation error:', error.message); // Log the error for debugging
    throw new Error('Translation failed');
  }
}

module.exports = {
  translateText,
};
