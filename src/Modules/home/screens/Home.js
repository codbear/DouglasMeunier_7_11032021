import Header from '../../header';
import SearchBar from '../../search';
import KitchenRecipesCollection from '../../kitchenRecipes';

const Home = () => (`
    <div class='container'>
      ${Header()}
      ${SearchBar()}
      ${KitchenRecipesCollection()}
    </div>`
);

export default Home;
