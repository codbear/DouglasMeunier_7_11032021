export default function searchInArrayWithSearchTerms(searchTerms = []) {
  return (data = []) => {
    const isExactMatch = searchTerms
      .every((searchTerm) => data.includes(searchTerm));

    const isPartialMatch = searchTerms
      .some((searchTerm) => data.includes(searchTerm));

    return { isExactMatch, isPartialMatch };
  };
}
