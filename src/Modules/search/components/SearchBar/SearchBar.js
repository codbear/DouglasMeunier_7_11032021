// eslint-disable-next-line no-unused-vars
import styles from './SearchBar.scss';

const SearchBar = () => {
  const label = 'Rechercher un ingrédient, appareil, ustensile ou une recette';
  const value = '';

  const handleChange = (event) => {
    value = event.target.value;
  };

  window.setTimeout(() => {
    const $input = document.getElementById('search-bar');
    console.log($input);
  });

  return (`
    <form>
      <input 
        id="search-bar"
        class="form-control search-bar" 
        type="text"
        placeholder="${label}"
        aria-label="${label}"
      />
    </form>`
  );
};

export default SearchBar;
