import KitchenRecipeCard from '../KitchenRecipeCard';

const KitchenRecipesCollection = ({ kitchenRecipes }) => (`
    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3">
      ${kitchenRecipes.map((kitchenRecipe) => (`
        <div class="col">
          ${KitchenRecipeCard({ kitchenRecipe })}
        </div>`)).join('')}
    </div>`
);

export default KitchenRecipesCollection;