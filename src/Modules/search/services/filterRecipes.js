import sanitize from './sanitize';
import deserialize from './deserialize';
import searchInArrayWithSearchTerms from './searchInArrayWithSearchTerms';

export default function filterRecipes(search = '', data = []) {
  const searchTerms = deserialize(search);
  const exactMatch = [];
  const match = [];
  const searchInRecipesFields = searchInArrayWithSearchTerms(searchTerms);

  // eslint-disable-next-line consistent-return
  data.forEach((hit) => {
    const nameChunks = deserialize(hit.name);
    const descriptionChunks = deserialize(hit.description);
    const ingredients = hit.ingredients.map(({ ingredient }) => sanitize(ingredient));

    const {
      isExactMatch: isNameExactMatching,
      isPartialMatch: isNamePartialMatching,
    } = searchInRecipesFields(nameChunks);

    const {
      isExactMatch: isIngredientsExactMatching,
      isPartialMatch: isIngredientsPartialMatching,
    } = searchInRecipesFields(ingredients);

    const {
      isPartialMatch: isDescriptionPartialMatching,
    } = searchInRecipesFields(descriptionChunks);

    const isExactMatch = isNameExactMatching || isIngredientsExactMatching;
    const isPartialMatch = isNamePartialMatching
      || isDescriptionPartialMatching
      || isIngredientsPartialMatching;

    if (isExactMatch) {
      exactMatch.push(hit);
    }

    if (isPartialMatch) {
      match.push(hit);
    }
  });

  return [exactMatch, match];
}
