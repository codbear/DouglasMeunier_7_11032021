import './Modules/kitchenRecipes';
import './Modules/search';
import { kitchenRecipesFactory } from './Modules/kitchenRecipes/factories';
import recipes from './Data/recipes.json';
import SearchIndex from './Modules/search/models/SearchIndex';
import FiltersContainer from './Modules/search/components/FiltersContainer';

const kitchenRecipes = kitchenRecipesFactory(recipes);
const searchIndex = new SearchIndex(kitchenRecipes);
const recipesCollectionElement = document.getElementById('kitchenRecipesCollection');
const recipesCollectionFragment = document.createDocumentFragment();
const searchInputElement = document.getElementById('searchBar');
const resultsContainerFragment = document.createDocumentFragment();

searchIndex
  .setFacet('name', { priority: 9 })
  .setFacet('description', { priority: 1 })
  .setFacet('ingredients', { priority: 3, propertyForFacetingNestedObjects: 'ingredient' })
  .setFilter('ingredients', { propertyForFilteringWithNestedObject: 'ingredient' })
  .setFilter('appliance')
  .setFilter('utensils');

searchIndex.all().forEach((kitchenRecipeItem) => {
  recipesCollectionFragment.appendChild(kitchenRecipeItem.getData().getNode());
});

recipesCollectionElement.appendChild(recipesCollectionFragment);

searchInputElement.addEventListener('input', (e) => {
  const searchInput = e.target.value;

  if (searchInput.length >= 3) {
    const results = searchIndex.search(searchInput, { minScore: 3 });

    results.forEach((result) => {
      resultsContainerFragment.appendChild(result.getData().getNode());
    });
    recipesCollectionElement.innerHTML = '';
    recipesCollectionElement.appendChild(resultsContainerFragment);
  }
});

const filtersContainerRoot = document.getElementById('filtersContainerRoot');
const filtersContainer = new FiltersContainer(searchIndex, filtersContainerRoot);
filtersContainer
  .setFilter({
    dropdownLabel: 'Ingrédients',
    searchIndexItemProperty: 'ingredients',
    searchIndexItemSubProperty: 'ingredient',
  })
  .setFilter({
    dropdownLabel: 'Appareils',
    variant: 'danger',
    searchIndexItemProperty: 'appliance',
  })
  .setFilter({
    dropdownLabel: 'Ustensiles',
    variant: 'success',
    searchIndexItemProperty: 'utensils',
  });
