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

    this.dropdownContainer = document.createElement('div');
    this.dropdownContainer.classList.add('tag-select-group');
    this.root.append(this.dropdownContainer);

    this.filtersCloud = document.createElement('div');
    this.filtersCloud.classList.add('tags-cloud');
    this.filtersCloud.addEventListener('removeFilter', (e) => {
      const { filterName, filterValue } = e.detail;
      this.handleRemoveFilter(filterName, filterValue);
    });
    this.root.prepend(this.filtersCloud);
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

    this.dropdownContainer.append(dropdownElement);

    return this;
  }

  handleAddFilter(filterName, variant) {
    return (event) => {
      const filterValue = event.detail;
      this.searchIndex.addFilter(filterName, filterValue);
      this.activeFilters.push({ filterName, filterValue, variant });

      this.updateDropdown(filterName);
      this.updateFiltersCloud();
    };
  }

  handleRemoveFilter(filterName, filterValue) {
    const activeFilter = this.activeFilters.filter((filter) => (
      filter.filterName === filterName && filter.filterValue === filterValue
    ))[0];
    const activeFilterIndex = this.activeFilters.indexOf(activeFilter);

    if (activeFilterIndex < 0) {
      return;
    }

    this.activeFilters.splice(activeFilterIndex, 1);

    this.searchIndex.removeFilter(filterName, filterValue);

    this.updateDropdown(filterName);
    this.updateFiltersCloud();
  }

  updateDropdown(dropdownId) {
    const { dropdownElement } = this.dropdownElements
      .filter((element) => element.id === dropdownId)[0];

    const dropdownElementFragment = document.createDocumentFragment();

    const filterValues = this.searchIndex.getAllFilterValues(dropdownId);

    filterValues.forEach((filterValue) => {
      const isActive = Boolean(
        this.activeFilters.filter((activeFilter) => activeFilter.filterValue === filterValue)[0],
      );

      if (!isActive) {
        const filterElement = document.createElement('li');
        filterElement.textContent = filterValue;
        dropdownElementFragment.append(filterElement);
      }
    });

    dropdownElement.innerHTML = '';
    dropdownElement.append(dropdownElementFragment);
  }

  updateFiltersCloud() {
    const filtersCloudFragment = document.createDocumentFragment();

    this.activeFilters.forEach((activeFilter) => {
      const tagElement = document.createElement('tag-filter');
      tagElement.setAttribute('label', activeFilter.filterValue);
      tagElement.setAttribute('filterName', activeFilter.filterName);
      tagElement.setAttribute('variant', activeFilter.variant);

      filtersCloudFragment.append(tagElement);
    });

    this.filtersCloud.innerHTML = '';
    this.filtersCloud.append(filtersCloudFragment);
  }
}

export default FiltersContainer;
