export default class Filter {
  /**
   * @param {string} name
   * @param {string[]} values
   */
  constructor(name, values) {
    this.name = name;
    this.values = values;
  }

  /**
   * @public
   * @return {string[]}
   */
  getValues() {
    return this.values;
  }

  /**
   * @public
   * @param {string} value
   * @return {boolean}
   */
  hasValue(value) {
    return this.values.includes(value);
  }
}
