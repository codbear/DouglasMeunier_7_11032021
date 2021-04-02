import translate from '../../../translations';
// eslint-disable-next-line no-unused-vars
import styles from './TagSelect.scss';

const TagSelect = (name, tags, style) => {
  const nameFr = translate(name);
  const label = nameFr[0].toUpperCase() + nameFr.substring(1);

  return (`
    <div class="dropdown">
      <button class="btn btn-lg btn-${style} dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        ${label}
      </button>
      <ul class="dropdown-menu bg-${style} text-white" aria-labelledby="dropdownMenuButton1">
        ${tags.map((tag) => (`
          <li><a class="dropdown-item text-white" href="#">${tag}</a></li>
        `)).join('')}
      </ul>
    </div>
  `);
};

export default TagSelect;
