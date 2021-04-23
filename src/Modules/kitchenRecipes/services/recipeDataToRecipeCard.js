const formatDescription = (description) => `${description.substring(0, 250)}...`;

export default function recipeDataToRecipeCard(recipeData) {
  const recipeCardElement = document.createElement('kitchen-recipe-card');
  recipeCardElement.classList.add('card');

  const descriptionElement = document.createElement('p');
  descriptionElement.setAttribute('slot', 'description');

  const ingredientElement = document.createElement('ingredient-list-item');
  ingredientElement.setAttribute('slot', 'ingredients');

  return recipeData.map((recipe) => {
    const recipeCard = recipeCardElement.cloneNode();

    recipeCard.setAttribute('title', recipe.name);
    recipeCard.setAttribute('duration', recipe.time);

    const formattedDescription = formatDescription(recipe.description);
    const descriptionContent = document.createTextNode(formattedDescription);
    const description = descriptionElement.cloneNode();
    description.appendChild(descriptionContent);

    recipeCard.appendChild(description);

    recipe.ingredients.forEach((ingredient) => {
      const { ingredient: name, quantity, unit } = ingredient;

      const ingredientsListItem = ingredientElement.cloneNode();
      ingredientsListItem.setAttribute('name', name);

      if (quantity) {
        ingredientsListItem.setAttribute('quantity', quantity);
      }

      if (unit) {
        ingredientsListItem.setAttribute('unit', unit);
      }

      recipeCard.appendChild(ingredientsListItem);
    });

    return recipeCard;
  });
}
