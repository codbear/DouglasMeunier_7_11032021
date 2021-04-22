// eslint-disable-next-line no-unused-vars
import styles from './Tag.scss';

const Tag = (label, style) => (`
  <span class="badge bg-${style}">
    ${label}
    <i class="far fa-times-circle badge-close"></i>
  </span>
`);

export default Tag;
