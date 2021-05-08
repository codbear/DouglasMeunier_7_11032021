export default class Facet {
  /**
   * Create a Facet with searchable values.
   * @param {string} name
   * @param {string[]} values
   * @param {number} priority
   */
  constructor(name, values, priority) {
    this.name = name;
    this.values = values;
    this.priority = priority;
  }
}
