export default function countHitInArrayWithSearchTerms(searchTerms = []) {
  return (data = []) => {
    let hitCount = 0;

    data.forEach((chunk) => {
      if (searchTerms.includes(chunk)) {
        hitCount += 1;
      }
    });

    return hitCount;
  };
}
