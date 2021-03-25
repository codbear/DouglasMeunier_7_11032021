const IngredientList = ({ ingredients }) => (`
  <ul class="list-unstyled">
  ${ingredients.map((ingredient) => {
    const {
      ingredient: name,
      quantity,
      unit,
    } = ingredient;

    return quantity
      ? (`<li><span class="fw-bold">${name}:</span> ${quantity ?? ''} ${unit ?? ''}</li>`)
      : (`<li><span class="fw-bold">${name}</span></li>`);
  }).join('')}
  </ul>`
);

export default IngredientList;
