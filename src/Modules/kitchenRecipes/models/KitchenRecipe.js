import { kitchenRecipeCardFactory } from '../factories';

export default class KitchenRecipe {
  constructor(recipeData) {
    this.hydrate(recipeData);
    this.fragment = kitchenRecipeCardFactory(this);
  }

  hydrate(data) {
    this.id = data.id;
    this.name = data.name;
    this.servings = data.servings;
    this.ingredients = data.ingredients;
    this.duration = data.time;
    this.description = data.description;
    this.appliance = data.appliance;
    this.utensils = data.ustensils;

    return this;
  }
}
