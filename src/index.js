import './Modules/kitchenRecipes';
import './Modules/search';
import { kitchenRecipesFactory } from './Modules/kitchenRecipes/factories';
import recipes from './Data/recipes.json';
import filterRecipes from './Modules/search/services';

const recipeCards = kitchenRecipesFactory(recipes);

const recipesCollectionFragment = document.createDocumentFragment();

recipeCards.forEach((recipeCard) => {
  const recipeCardElement = recipeCard.element.cloneNode(true);
  recipesCollectionFragment.appendChild(recipeCardElement);
});

const recipesCollectionElement = document.getElementById('kitchenRecipesCollection');
recipesCollectionElement.appendChild(recipesCollectionFragment);

const searchInputElement = document.getElementById('searchBar');
const resultsContainerFragment = document.createDocumentFragment();

searchInputElement.addEventListener('input', (e) => {
  const searchInput = e.target.value;

  if (searchInput.length >= 3) {
    const results = filterRecipes(searchInput, recipeCards);

    results.forEach((result) => {
      const recipeCardElement = result.element.cloneNode(true);

      resultsContainerFragment.appendChild(recipeCardElement);
    });

    recipesCollectionElement.innerHTML = '';
    recipesCollectionElement.appendChild(resultsContainerFragment);
  }
});
