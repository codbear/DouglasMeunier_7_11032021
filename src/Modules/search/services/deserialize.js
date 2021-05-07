import sanitize from './sanitize';

export default function deserialize(string = '') {
  const chunkedString = string
    .split(' ')
    .map((chunk) => sanitize(chunk));

  chunkedString.forEach((chunk) => {
    if (chunk.endsWith('s')) {
      chunkedString.push(chunk.substring(0, chunk.length - 1));
    }
  });

  return chunkedString;
}
