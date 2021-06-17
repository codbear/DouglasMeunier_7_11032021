class FiltersContainer {
  /**
   *
   * @param {SearchIndex} searchIndex
   * @param {HTMLElement} root
   */
  constructor(searchIndex, root) {
    this.searchIndex = searchIndex;
    this.root = root;
    this.dropdownElements = [];
    this.activeFilters = [];

    this.handleAddFilter = this.handleAddFilter.bind(this);
  }

  setFilter({
    searchIndexItemProperty, searchIndexItemSubProperty = '',
    dropdownLabel, variant = 'primary',
  }) {
    this.searchIndex.setFilter(
      searchIndexItemProperty,
      { propertyForFilteringWithNestedObject: searchIndexItemSubProperty },
    );

    const dropdownElement = document.createElement('tag-select');
    dropdownElement.setAttribute('id', searchIndexItemProperty);
    dropdownElement.setAttribute('label', dropdownLabel);
    dropdownElement.setAttribute('variant', variant);

    this.dropdownElements.push({ id: searchIndexItemProperty, dropdownElement });

    this.updateDropdown(searchIndexItemProperty);

    dropdownElement.addEventListener(
      'clickItem',
      this.handleAddFilter(searchIndexItemProperty, variant),
    );

    this.root.appendChild(dropdownElement);

    return this;
  }

  handleAddFilter(filterName, variant) {
    return (event) => {
      const filterValue = event.detail;
      this.searchIndex.addFilter(filterName, filterValue);
      this.activeFilters.push({ filterValue, variant });

      this.updateDropdown(filterName);
    };
  }

  handleRemoveFilter(filterName, filterValue) {
    this.searchIndex.removeFilter(filterName, filterValue);
    this.updateDropdown(filterName);
  }

  updateDropdown(dropdownId) {
    const { dropdownElement } = this.dropdownElements
      .filter((element) => element.id === dropdownId)[0];
    dropdownElement.innerHTML = '';

    const filterValues = this.searchIndex.getAllFilterValues(dropdownId);

    filterValues.forEach((filterValue) => {
      const isActive = Boolean(
        this.activeFilters.filter((activeFilter) => activeFilter.filterValue === filterValue)[0],
      );

      if (!isActive) {
        const filterElement = document.createElement('li');
        filterElement.textContent = filterValue;
        dropdownElement.appendChild(filterElement);
      }
    });
  }
}

export default FiltersContainer;
