import './Modules/kitchenRecipes';
import './Modules/search';
import { kitchenRecipesFactory } from './Modules/kitchenRecipes/factories';
import recipes from './Data/recipes.json';

const recipeCards = kitchenRecipesFactory(recipes);

const recipesCollectionFragment = document.createDocumentFragment();

recipeCards.forEach((recipeCard) => {
  recipesCollectionFragment.appendChild(recipeCard.fragment);
});

const recipesCollectionElement = document.getElementById('kitchenRecipesCollection');
recipesCollectionElement.appendChild(recipesCollectionFragment);
