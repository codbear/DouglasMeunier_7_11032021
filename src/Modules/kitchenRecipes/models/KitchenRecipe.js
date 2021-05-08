import { kitchenRecipeCardFactory } from '../factories';

export default class KitchenRecipe {
  constructor(recipeData) {
    this.id = recipeData.id;
    this.name = recipeData.name;
    this.servings = recipeData.servings;
    this.ingredients = recipeData.ingredients;
    this.duration = recipeData.time;
    this.description = recipeData.description;
    this.appliance = recipeData.appliance;
    this.utensils = recipeData.ustensils;
    this.element = kitchenRecipeCardFactory(this);
  }
}
