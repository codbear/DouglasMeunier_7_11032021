import { kitchenRecipeCardFactory } from '../factories';
import deserialize from '../../search/services/deserialize';

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
    this.searchIndex = {};
    this.element = kitchenRecipeCardFactory(this);
  }

  setScore(index, score) {
    if (!this.searchIndex[index]) {
      return this;
    }

    if (typeof score === 'number') {
      this.searchIndex[index].score = score;
    }

    return this;
  }

  getScore() {
    let score = 0;

    this.getSearchIndex().forEach((index) => {
      const multiplier = this.searchIndex[index].scoreMultiplier;
      const indexScore = this.searchIndex[index].score;
      score += indexScore * multiplier;
    });

    return score;
  }

  getSearchIndex() {
    return Object.keys(this.searchIndex);
  }

  addSearchIndex(field = '', options = { scoreMultiplier: 1 }) {
    if (typeof field !== 'string') {
      return this;
    }

    if (!this[field]) {
      return this;
    }

    Object.defineProperty(this.searchIndex, field, {
      value: {
        index: field === 'ingredients'
          ? this.ingredients.map(({ ingredient }) => deserialize(ingredient)).flat()
          : deserialize(this[field]),
        scoreMultiplier: options.scoreMultiplier,
        score: 0,
      },
      enumerable: true,
      writable: true,
    });

    return this;
  }
}
