import KitchenRecipe from '../models';

export default function kitchenRecipesFactory(kitchenRecipes) {
  return kitchenRecipes.map((kitchenRecipe) => new KitchenRecipe(kitchenRecipe));
}
