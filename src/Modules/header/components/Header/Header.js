import Logo from '../../assets/svg/logo.svg';
// eslint-disable-next-line no-unused-vars
import styles from './Header.scss';

const Header = () => (`
    <header class="main-header">
      <img src="${Logo}" alt="" class="mx-auto">
      <h1 class="text-center brand-name">Les petits plats</h1>
    </header>`
);

export default Header;
