import Header from '../../header';
import { SearchBar, TagSelect } from '../../search';
import KitchenRecipesCollection from '../../kitchenRecipes';
// eslint-disable-next-line no-unused-vars
import styles from './Home.scss';

const Home = () => (`
    <div class='container'>
      ${Header()}
      ${SearchBar()}
      <div class='search-selector-group'>
        ${TagSelect('ingredients', ['tag1', 'tag2', 'tag3'], 'primary')}
        ${TagSelect('appliance', ['tag1', 'tag2', 'tag3'], 'success')}
        ${TagSelect('ustensils', ['tag1', 'tag2', 'tag3'], 'danger')}
      </div>
      ${KitchenRecipesCollection()}
    </div>`
);

export default Home;
