import deserialize from './deserialize';
import countHitInArrayWithSearchTerms from './countHitInArrayWithSearchTerms';

export default function filterRecipes(
  search = '',
  recipes = [],
) {
  const searchTerms = deserialize(search);
  const match = [];
  const searchInRecipeField = countHitInArrayWithSearchTerms(searchTerms);

  // eslint-disable-next-line consistent-return
  recipes.forEach((recipe) => {
    recipe.getSearchIndex().forEach((index) => {
      const hitCount = searchInRecipeField(recipe.searchIndex[index].index);

      recipe.setScore(index, hitCount);
    });

    const isPartialMatch = recipe.getScore() > 0;

    if (isPartialMatch) {
      match.push(recipe);
    }
  });

  return match;
}
