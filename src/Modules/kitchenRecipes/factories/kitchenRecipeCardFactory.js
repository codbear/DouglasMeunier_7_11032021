import formatDescription from '../services';

export default function kitchenRecipeCardFactory(kitchenRecipe) {
  const recipeCardElement = document.createElement('kitchen-recipe-card');
  recipeCardElement.classList.add('card');
  recipeCardElement.setAttribute('title', kitchenRecipe.name);
  recipeCardElement.setAttribute('duration', kitchenRecipe.duration);

  const formattedDescription = formatDescription(kitchenRecipe.description);
  const descriptionContent = document.createTextNode(formattedDescription);
  const descriptionElement = document.createElement('p');
  descriptionElement.setAttribute('slot', 'description');
  descriptionElement.appendChild(descriptionContent);

  recipeCardElement.appendChild(descriptionElement);

  const ingredientElement = document.createElement('ingredient-list-item');
  ingredientElement.setAttribute('slot', 'ingredients');

  kitchenRecipe.ingredients.forEach((ingredient) => {
    const { ingredient: name, quantity, unit } = ingredient;

    const ingredientsListItem = ingredientElement.cloneNode();
    ingredientsListItem.setAttribute('name', name);

    if (quantity) {
      ingredientsListItem.setAttribute('quantity', quantity);
    }

    if (unit) {
      ingredientsListItem.setAttribute('unit', unit);
    }

    recipeCardElement.appendChild(ingredientsListItem);
  });

  const fragment = document.createDocumentFragment();
  fragment.appendChild(recipeCardElement);

  return fragment;
}
