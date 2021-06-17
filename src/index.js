import './Modules/kitchenRecipes';
import './Modules/search';
import { kitchenRecipesFactory } from './Modules/kitchenRecipes/factories';
import recipes from './Data/recipes.json';
import SearchIndex from './Modules/search/models/SearchIndex';
import FiltersContainer from './Modules/search/components/FiltersContainer';

const kitchenRecipes = kitchenRecipesFactory(recipes);
const recipeCardsContainer = document.getElementById('kitchenRecipesCollection');
const noResultsMessage = 'Aucune recette ne correspond à votre critère... vous pouvez chercher «'
  + ' tarte aux pommes », « poisson », etc.';
const searchIndex = new SearchIndex(kitchenRecipes, recipeCardsContainer, noResultsMessage);
searchIndex
  .setFacet('name', { priority: 9 })
  .setFacet('description', { priority: 1 })
  .setFacet('ingredients', { priority: 3, propertyForFacetingNestedObjects: 'ingredient' })
  .renderResults();

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

const searchInputElement = document.getElementById('searchBar');
searchInputElement.addEventListener('input', (e) => {
  const searchInput = e.target.value;

  if (searchInput === '') {
    searchIndex.resetResults();
  }

  if (searchInput.length >= 3) {
    searchIndex.search(searchInput, { minScore: 3, directlyRenderResults: true });
    filtersContainer.updateAllDropdowns();
  }
});
