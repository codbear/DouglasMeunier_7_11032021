import { kitchenRecipeCardFactory } from '../factories';

export default class KitchenRecipe {
  /**
   *
   * @param {Object.<string, *>} recipeData
   */
  constructor(recipeData) {
    this.id = recipeData.id;
    this.name = recipeData.name;
    this.servings = recipeData.servings;
    this.ingredients = recipeData.ingredients;
    this.duration = recipeData.time;
    this.description = recipeData.description;
    this.appliance = recipeData.appliance;
    this.utensils = recipeData.ustensils;
    this.node = kitchenRecipeCardFactory(this);
  }

  /**
   *
   * @return {Node}
   */
  getNode() {
    return this.node.cloneNode(true);
  }
}
