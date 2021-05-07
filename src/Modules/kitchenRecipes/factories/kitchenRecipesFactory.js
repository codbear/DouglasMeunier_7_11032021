import KitchenRecipe from '../models';

export default function kitchenRecipesFactory(kitchenRecipes) {
  return kitchenRecipes.map((kitchenRecipe) => {
    const instance = new KitchenRecipe(kitchenRecipe);

    instance.addSearchIndex('name', { scoreMultiplier: 2 });
    instance.addSearchIndex('description', { scoreMultiplier: 0.5 });
    instance.addSearchIndex('ingredients');

    return instance;
  });
}
