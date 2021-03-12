import { render } from './Router';

const App = () => {
  const $root = document.getElementById('root');

  $root.innerHTML = render(window.location.pathname);

  window.onpopstate = () => {
    $root.innerHTML = render(window.location.pathname);
  };

  return null;
};

export default App;
