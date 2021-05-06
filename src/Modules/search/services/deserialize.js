import sanitize from './sanitize';

export default function deserialize(string = '') {
  return string
    .split(' ')
    .map((chunk) => sanitize(chunk));
}
