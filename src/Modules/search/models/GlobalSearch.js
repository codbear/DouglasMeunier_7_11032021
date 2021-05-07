/**
 * Create a searchable index from data. You need to set at least one facet if you want your
 * index to be searchable.
 */
export default class GlobalSearch {
  /**
   * Create an index from data.
   * @param {object[]} data - An array of iterable objects
   */
  constructor(data) {
    this.index = data.map((item) => {
      Object.defineProperty(item, 'facets', {
        value: {},
        enumerable: true,
        writable: true,
      });

      return item;
    });
  }
}
