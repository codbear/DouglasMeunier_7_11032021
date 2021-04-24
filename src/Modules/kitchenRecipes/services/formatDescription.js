export default function formatDescription(description) {
  return description.length > 230
    ? `${description.substring(0, 230)}...`
    : description;
}
