import IngredientList from '../IngredientList';
// eslint-disable-next-line no-unused-vars
import styles from './KitchenRecipeCard.scss';

const KitchenRecipeCard = ({ kitchenRecipe }) => {
  const {
    name, ingredients, description, time,
  } = kitchenRecipe;

  return (`
    <div class="card kitchen-recipe_card">
    <div class="card-img-top kitchen-recipe_card-img-top">
      <img src="" alt="">
    </div>
      <div class="card-body kitchen-recipe_card-body">
        <h2 class="card-title kitchen-recipe_card-title">${name}</h2>
        <div class="row">
          <div class="col-6">
            ${IngredientList({ ingredients })}
          </div>
          <div class="col-6 kitchen-recipe_card-description">
            <p class="card-text kitchen-recipe_card-text">
              ${description}
            </p>
          </div>
        </div>
      </div>
    </div>`
  );
};

export default KitchenRecipeCard;
