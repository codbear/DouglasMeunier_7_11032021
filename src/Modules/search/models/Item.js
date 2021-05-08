export default class Item {
  /**
   *
   * @param {Object.<string, any>} dataItem
   */
  constructor(dataItem) {
    this.data = dataItem;

    /** @type {Object.<string, Facet>} */
    this.facets = {};
  }

  /**
   * @public
   * @param {Facet} facet
   * @return {Item}
   */
  addFacet(facet) {
    this.facets = {
      ...this.facets,
      [facet.name]: facet,
    };

    return this;
  }

  /**
   * @public
   * @param {string} property
   * @param {string} [propertyForFacetingNestedObjects]
   * @return {{
   * propertyType: ("string"|"stringArray"|"objectArray"|"not supported"),
   * isPropertyValid: boolean,
   * isNestedPropertyValid: boolean,
   * }}
   */
  supportPropertyForFaceting(property, propertyForFacetingNestedObjects = '') {
    const isPropertyValid = this.hasProperty(property);
    const propertyType = this.getPropertyType(property);
    const isNestedPropertyValid = propertyType === 'objectArray'
      && this.hasProperty(property, propertyForFacetingNestedObjects);

    return { isPropertyValid, isNestedPropertyValid, propertyType };
  }

  /**
   * @private
   * @param {string} property
   * @param {string} [propertyForFacetingNestedObjects]
   * @return {boolean}
   */
  hasProperty(property, propertyForFacetingNestedObjects = '') {
    return propertyForFacetingNestedObjects
    /* eslint-disable no-prototype-builtins */
      ? this.data[property][0].hasOwnProperty(propertyForFacetingNestedObjects)
      : this.data.hasOwnProperty(property);
    /* eslint-enable no-prototype-builtins */
  }

  /**
   * @private
   * @param {string} property
   * @return {"string"|"stringArray"|"objectArray"|"not supported"}
   */
  getPropertyType(property) {
    const propertyType = typeof this.data[property];

    const propertyTypeToDecoratedType = {
      string: 'string',
      object: this.getNestedObjectType(property),
      default: 'not supported',
    };

    return propertyTypeToDecoratedType[propertyType] || propertyTypeToDecoratedType.default;
  }

  /**
   * @private
   * @param {string} property
   * @return {"stringArray"|"objectArray"|"not supported"}
   */
  getNestedObjectType(property) {
    const isArray = Array.isArray(this.data[property]);

    if (!isArray) {
      return 'not supported';
    }

    const isAnArrayOfStrings = this.data[property].every((value) => typeof value === 'string');

    if (isAnArrayOfStrings) {
      return 'stringArray';
    }

    const isAnArrayOfObjects = this.data[property].every((value) => typeof value === 'object');

    if (isAnArrayOfObjects) {
      return Array.isArray(this.data[property][0]) ? 'not supported' : 'objectArray';
    }

    return 'not supported';
  }
}
