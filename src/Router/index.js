import ROUTES from './constants/routes';
import { HomeScreen } from '../Modules/Home';

const render = (pathname) => {
  switch (pathname) {
    case ROUTES.HOME:
    default:
      return HomeScreen();
  }
};

export { render, ROUTES };
