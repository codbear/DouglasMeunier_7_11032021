export default function sanitize(string = '') {
  return string
    .toLocaleLowerCase()
    .trim();
}
