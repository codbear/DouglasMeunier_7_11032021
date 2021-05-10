import { deserialize, sortResults } from '../services';
import Facet from './Facet';
import Item from './Item';

/**
 * Create a searchable index from data. You need to set at least one facet if you want your
 * index to be searchable.
 */
export default class SearchIndex {
  /**
   * Create an index from data.
   * @param {Object.<string, any>[]} resourceCollection - An array of iterable objects.
   */
  constructor(resourceCollection) {
    /** @type {Item[]} */
    this.index = resourceCollection.map((resourceItem) => new Item(resourceItem));
  }

  /**
   * @public
   * Search a string in the index.
   * @param {string} query - A string to search in index.
   * @param {Object} options
   * @param {number} [options.minScore=1] - Set the minimal score a hit must have to appear in the
   * results.
   * @returns {Item[]} - An array of Items from the index corresponding to search query.
   */
  search(query, options = { minScore: 1 }) {
    const queryChunks = deserialize(query);

    const scoredItems = this.index.map((item) => {
      let score = 0;

      this.getFacets().forEach((facet) => {
        const { values, priority } = item.facets[facet];

        const hits = values.filter((value) => (
          queryChunks.some((queryChunk) => queryChunk === value)
        ));

        score += hits.length * priority;
      });

      return { item, score };
    });

    const results = scoredItems.filter(({ score }) => score >= options.minScore);

    return sortResults(results);
  }

  /**
   * @public
   * Set a facet on each object of the indexed data. A facet stores the searchable values of a
   * property of the object.
   * @param {string} property - The property from objects of the index that should be use to
   * create the facet. This property must be a string, an array of strings or an array of objects.
   * @param {Object} [options]
   * @param {number} [options.priority = 1] - The priority represents the importance of the
   * facet compared to the others in the calculation of the score which makes it possible to
   * sort the search results.
   * @param {string} [options.propertyForFacetingNestedObjects] - If the property you provide to
   * create the facet is an array of objects, you need to set a property from those objects to
   * populate the facet. This property must be a string.
   * @returns {SearchIndex}
   */
  setFacet(
    property,
    options = {
      priority: 1,
      propertyForFacetingNestedObjects: '',
    },
  ) {
    const { priority, propertyForFacetingNestedObjects } = options;
    const { isPropertyValid, isNestedPropertyValid, propertyType } = this.index[0]
      .supportPropertyForFaceting(property, propertyForFacetingNestedObjects);

    if (!isPropertyValid) {
      throw new Error(`"${property}" is not a valid property to create a facet.`);
    }

    if (propertyType === 'not supported') {
      throw new Error(`"${property}" is not supported to create a facet. Supported property types are string, array of strings or array of objects.`);
    }

    if (propertyType === 'objectArray' && !isNestedPropertyValid) {
      throw new Error(`"${propertyForFacetingNestedObjects}" is not a valid property in "${property}" to create a facet.`);
    }

    const propertyTypeToDeserializer = {
      string: (string) => deserialize(string),

      stringArray: (array) => array
        .map((string) => deserialize(string)),

      objectArray: (array) => array
        .map((object) => deserialize(object[propertyForFacetingNestedObjects])).flat(),
    };

    const deserializer = propertyTypeToDeserializer[propertyType];

    this.index = this.index.map((item) => {
      const valuesForFaceting = deserializer(item.data[property]);

      return item.addFacet(new Facet(property, valuesForFaceting, priority));
    });

    return this;
  }

  /**
   * @private
   * @returns {string[]} - List of facet names.
   */
  getFacets() {
    return Object.keys(this.index[0]?.facets);
  }
}
