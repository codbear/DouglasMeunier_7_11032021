/**
 * @param {boolean} shouldHandlePlural
 * @returns {function(string): string[]}
 */
const getDeserializer = (shouldHandlePlural) => (string) => {
  const chunkedString = string
    .trim()
    .toLocaleLowerCase()
    .split(' ');

  if (shouldHandlePlural) {
    chunkedString.forEach((chunk) => {
      if (chunk.endsWith('s')) {
        chunkedString.push(chunk.substring(0, chunk.length - 1));
      }
    });
  }

  return chunkedString;
};

export default getDeserializer;
