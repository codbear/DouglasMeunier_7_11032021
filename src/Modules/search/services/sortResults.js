/**
 *
 * @param {{score: number, item: Item}[]} results
 */
export default function sortResults(results) {
  return results.map((result) => result.item);
}
