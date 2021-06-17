import { getDeserializer, quickSort } from '../services';
import Facet from './Facet';
import Item from './Item';
import Filter from './Filter';

/**
 * Create a searchable index from data. You need to set at least one facet if you want your
 * index to be searchable.
 */
export default class SearchIndex {
  /**
   * Create an index from data.
   * @param {Object.<string, any>[]} resourceCollection - An array of iterable objects.
   * @param {HTMLElement} resultsContainer
   * @param {string} noResultsMessage - Message to display when no results are found.
   */
  constructor(resourceCollection, resultsContainer, noResultsMessage) {
    /** @type {Item[]} */
    this.index = resourceCollection.map((resourceItem) => new Item(resourceItem));

    this.resultsContainer = resultsContainer;

    this.noResultsMessage = document.createTextNode(noResultsMessage);

    /** @type {Item[]} */
    this.resultsIndex = [...this.index];

    /** @type {Object<string, string[]>} */
    this.filters = {};
  }

  resetResults() {
    this.resultsIndex = [...this.index];
    this.applyFilters();
    this.renderResults();

    return this;
  }

  renderResults() {
    this.resultsContainer.innerHTML = '';

    if (this.resultsIndex.length === 0) {
      this.resultsContainer.append(this.noResultsMessage);

      return;
    }

    const resultsContainerFragment = document.createDocumentFragment();

    this.resultsIndex.forEach((result) => {
      resultsContainerFragment.append(result.getData().getNode());
    });

    this.resultsContainer.append(resultsContainerFragment);
  }

  /**
   * @public
   * Search a string in the index.
   * @param {string} query - A string to search in index.
   * @param {Object} options
   * @param {number} [options.minScore=1] - Set the minimal score a hit must have to appear in the
   * results.
   * @param {boolean} [options.directlyRenderResults=false] - Directly render search results in
   * the results container.
   * @returns {Item[]} - An array of Items from the index corresponding to search query.
   */
  search(query, options = { minScore: 1, directlyRenderResults: false }) {
    const queryChunks = getDeserializer(true)(query);

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

    this.resultsIndex = quickSort(results, (result) => result.score)
      .map((result) => result.item);

    this.applyFilters();

    if (options.directlyRenderResults) {
      this.renderResults();
    }

    return this.resultsIndex;
  }

  /**
   * @public
   * @return {Item[]}
   */
  applyFilters() {
    const isFilterValueInItem = (item) => (filterName) => (filterValue) => (
      item.getFilter(filterName).hasValue(filterValue)
    );

    const doesFilterMatchItem = (item) => (filterName) => (
      this.filters[filterName].every(isFilterValueInItem(item)(filterName))
    );

    const doesItemMatchAllFilters = (item) => (
      this.getFilterNames().every(doesFilterMatchItem(item))
    );

    this.resultsIndex = this.resultsIndex.filter(doesItemMatchAllFilters);

    return this.resultsIndex;
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
    const {
      priority, propertyForFacetingNestedObjects,
    } = options;

    const deserializer = this.getDeserializer(
      property, propertyForFacetingNestedObjects, true, true,
    );

    this.index = this.index.map((item) => {
      const valuesForFaceting = deserializer(item.data[property]);

      return item.addFacet(new Facet(property, valuesForFaceting, priority));
    });

    return this;
  }

  /**
   * @public
   * @param {string} property
   * @param options
   * @return {SearchIndex}
   */
  setFilter(
    property,
    options = {
      propertyForFilteringWithNestedObject: '',
      shouldAtomize: false,
      shouldHandlePlural: false,
    },
  ) {
    const { propertyForFilteringWithNestedObject, shouldAtomize, shouldHandlePlural } = options;
    const deserializer = this.getDeserializer(
      property,
      propertyForFilteringWithNestedObject,
      shouldAtomize,
      shouldHandlePlural,
    );

    this.index = this.index.map((item) => {
      const valuesForFiltering = deserializer(item.data[property]);

      return item.addFilter(new Filter(property, valuesForFiltering));
    });

    this.filters = {
      ...this.filters,
      [property]: [],
    };

    return this;
  }

  /**
   * @public
   * @return {string[]}
   */
  getFilterNames() {
    return Object.keys(this.filters);
  }

  /**
   * @public
   * @param {string} filterName
   * @return {Set<string>}
   */
  getAllFilterValues(filterName) {
    const filterValues = this.resultsIndex
      .map((item) => item.getFilter(filterName).getValues())
      .flat();

    return new Set(filterValues);
  }

  /**
   * @public
   * @param {string} filterName
   * @param {string} value
   * @return {Item[]}
   */
  addFilter(filterName, value) {
    this.filters[filterName].push(value);

    return this.applyFilters();
  }

  /**
   * @public
   * @param {string} filterName
   * @param {string} value
   * @return {Item[]}
   */
  removeFilter(filterName, value) {
    const filterIndex = this.filters[filterName].indexOf(value);

    if (filterIndex > -1) {
      this.filters[filterName].splice(filterIndex, 1);
    }

    if (this.hasEmptyFilters) {
      this.resultsIndex = [...this.index];
    }

    return this.applyFilters();
  }

  hasEmptyFilters() {
    return this
      .getFilterNames()
      .every((filterName) => this.filters[filterName].length === 0);
  }

  /**
   * @private
   * @param {string} property
   * @param {string} [subProperty]
   * @param {boolean} shouldAtomize
   * @param {boolean} shouldHandlePlural
   * @return {function(string): string[]}
   */
  getDeserializer(property, subProperty = '', shouldAtomize = false, shouldHandlePlural = false) {
    const {
      isPropertyValid,
      isNestedPropertyValid,
      propertyType,
    } = this.index[0].supportPropertyForFaceting(property, subProperty);

    if (!isPropertyValid) {
      throw new Error(`"${property}" is not a valid property.`);
    }

    if (propertyType === 'not supported') {
      throw new Error(`"${property}" is not supported. Supported property types are string, array of strings or array of objects.`);
    }

    if (propertyType === 'objectArray' && !isNestedPropertyValid) {
      throw new Error(`"${subProperty}" is not a valid property in "${property}".`);
    }

    const deserialize = getDeserializer(shouldHandlePlural);

    const propertyTypeToDeserializer = {
      string: (string) => (
        shouldAtomize
          ? deserialize(string)
          : string
      ),

      stringArray: (array) => (
        shouldAtomize
          ? array.map((string) => deserialize(string))
          : array
      ),

      objectArray: (array) => (
        array.map((object) => (
          shouldAtomize
            ? deserialize(object[subProperty])
            : object[subProperty]
        )).flat()
      ),
    };

    return propertyTypeToDeserializer[propertyType];
  }

  /**
   * @private
   * @returns {string[]} - List of facet names.
   */
  getFacets() {
    return Object.keys(this.index[0]?.facets);
  }
}
