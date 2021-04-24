import './Modules/kitchenRecipes';
import './Modules/search';
import recipeDataToRecipeCard from './Modules/kitchenRecipes/services';
import recipes from './Data/recipes.json';

const recipeCards = recipeDataToRecipeCard(recipes);

const recipesCollectionFragment = document.createDocumentFragment();

recipeCards.forEach((recipeCard) => {
  recipesCollectionFragment.appendChild(recipeCard);
});

const recipesCollectionElement = document.getElementById('kitchenRecipesCollection');
recipesCollectionElement.appendChild(recipesCollectionFragment);
