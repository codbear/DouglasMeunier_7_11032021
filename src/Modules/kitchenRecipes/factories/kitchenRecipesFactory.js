import KitchenRecipe from '../models';

/**
 *
 * @param {Object.<string, *>[]} kitchenRecipes
 * @return {KitchenRecipe[]}
 */
export default function kitchenRecipesFactory(kitchenRecipes) {
  return kitchenRecipes.map((kitchenRecipe) => new KitchenRecipe(kitchenRecipe));
}
