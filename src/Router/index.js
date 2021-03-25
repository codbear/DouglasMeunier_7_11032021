import ROUTES from './constants/routes';
import { HomeScreen } from '../Modules/home';

const render = (pathname) => {
  switch (pathname) {
    case ROUTES.HOME:
    default:
      return HomeScreen();
  }
};

export { render, ROUTES };
