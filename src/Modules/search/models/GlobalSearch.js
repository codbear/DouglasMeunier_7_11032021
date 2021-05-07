import getDeserializerFromAttributeType from '../services/getDeserializerFromAttributeType';

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

  /**
   * @public
   * Set a facet on each object of the indexed data. A facet stores the searchable values of an
   * attribute of the object.
   * @param {string} attribute - The attribute from objects of the indexed data that should be
   * use to create the facet. Valid types are string, array of strings or array of objects.
   * @param {object} [options] - The options of the facet.
   * @param {number} [options.priority = 1] - The priority represents the importance of the
   * facet compared to the others in the calculation of the score which makes it possible to
   * sort the search results.
   * @param {string} [options.attributeForFaceting] - If the attribute you provide to create the
   * facet is an array of objects, you need to set an attribute from those objects to populate
   * the facet. Valid types are string.
   * @returns {GlobalSearch}
   */
  setFacet(
    attribute,
    options = {
      priority: 1,
    },
  ) {
    const isAttributeValid = typeof attribute === 'string'
      // eslint-disable-next-line no-prototype-builtins
      && this.index[0].hasOwnProperty(attribute);

    if (!isAttributeValid) {
      throw new Error(`"${attribute}" is not a valid attribute.`);
    }

    let attributeType = typeof this.index[0][attribute];

    switch (typeof this.index[0][attribute]) {
      case 'string':
        break;

      case 'object':
        // eslint-disable-next-line no-case-declarations
        const itemsType = typeof this.index[0][attribute][0];

        if (itemsType === 'string') {
          attributeType = 'stringArray';
        } else if (itemsType === 'object') {
          attributeType = 'objectArray';
        } else {
          throw new Error('Nested attribute must be an array of strings or objects.');
        }

        break;

      default:
        throw new Error('Attribute must be a string or an array.');
    }

    if (attributeType === 'objectArray') {
      const isAttributeForFacetingValid = typeof options.attributeForFaceting === 'string'
      // eslint-disable-next-line no-prototype-builtins
      && this.index[0][attribute][0].hasOwnProperty(options.attributeForFaceting);

      if (!isAttributeForFacetingValid) {
        throw new Error(`${attribute} is an array of objects, you must specify a valid attribute in this object for faceting`);
      }
    }

    const deserializer = getDeserializerFromAttributeType(
      attributeType, options.attributeForFaceting,
    );

    this.createFacet(attribute, options.priority, deserializer);

    return this;
  }

  /**
   * @private
   * @param {string} attribute
   * @param {number} priority
   * @param {function} deserializer
   */
  createFacet(attribute, priority, deserializer) {
    this.index = this.index.map((item) => {
      const valuesForFaceting = deserializer(item[attribute]);

      Object.defineProperty(item.facets, attribute, {
        value: {
          values: valuesForFaceting,
          priority,
        },
        enumerable: true,
        writable: true,
      });

      return item;
    });
  }
}
