// eslint-disable-next-line no-unused-vars
import styles from './SearchBar.scss';

const SearchBar = () => {
  const label = 'Rechercher un ingrédient, appareil, ustensile ou une recette';

  return (`
    <div>
      <input 
        class="form-control search-bar" 
        type="text"
        placeholder="${label}"
        aria-label="${label}"
      />
    </div>`
  );
};

export default SearchBar;
