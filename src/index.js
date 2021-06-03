import './Modules/kitchenRecipes';
import './Modules/search';
import { kitchenRecipesFactory } from './Modules/kitchenRecipes/factories';
import recipes from './Data/recipes.json';
import SearchIndex from './Modules/search/models/SearchIndex';

const kitchenRecipes = kitchenRecipesFactory(recipes);

const searchIndex = new SearchIndex(kitchenRecipes);

searchIndex
  .setFacet(
    'name',
    { priority: 9 },
  )
  .setFacet(
    'description',
    { priority: 1 },
  )
  .setFacet(
    'ingredients',
    { priority: 3, propertyForFacetingNestedObjects: 'ingredient' },
  );

const recipesCollectionFragment = document.createDocumentFragment();

kitchenRecipes.forEach((recipeCard) => {
  recipesCollectionFragment.appendChild(recipeCard.getNode());
});

const recipesCollectionElement = document.getElementById('kitchenRecipesCollection');
recipesCollectionElement.appendChild(recipesCollectionFragment);

const searchInputElement = document.getElementById('searchBar');
const resultsContainerFragment = document.createDocumentFragment();

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
