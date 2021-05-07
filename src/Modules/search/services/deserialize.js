export default function deserialize(string = '') {
  const chunkedString = string
    .trim()
    .toLocaleLowerCase()
    .split(' ');

  chunkedString.forEach((chunk) => {
    if (chunk.endsWith('s')) {
      chunkedString.push(chunk.substring(0, chunk.length - 1));
    }
  });

  return chunkedString;
}
