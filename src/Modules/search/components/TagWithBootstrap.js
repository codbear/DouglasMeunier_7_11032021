// eslint-disable-next-line func-names
(function () {
  const VARIANTS = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
  ];

  const template = document.createElement('template');
  template.innerHTML = `
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
      crossorigin="anonymous"
    />
    <style>
      .badge {
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 1.2rem;
        font-weight: 400 !important;
        margin: 0 15px 15px 0;
      }
      .badge-close {
        font-size: 1.2rem;
        margin-left: 13px;
        cursor: pointer;
      }
    </style>
    <span class="badge">
      <i class="far fa-times-circle badge-close"></i>
    </span>
    `;

  class TagWithBootstrap extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.spanElement = this.shadowRoot.querySelector('span');

      this.removeButton = this.shadowRoot.querySelector('.badge-close');
      this.removeButton.addEventListener(
        'click',
        () => {
          this.dispatchEvent(new CustomEvent('removeFilter', {
            bubbles: true,
            composed: true,
            detail: { filterName: this.filterName, filterValue: this.label },
          }));
        },
      );
    }

    connectedCallback() {
      this.spanElement.classList.add(`bg-${this.variant}`);

      const tagLabel = document.createTextNode(this.label);
      this.spanElement.prepend(tagLabel);
    }

    get variant() {
      const variant = this.getAttribute('variant');

      if (!VARIANTS.includes(variant)) {
        return 'primary';
      }

      return variant;
    }

    get label() {
      return this.getAttribute('label');
    }

    get filterName() {
      return this.getAttribute('filterName');
    }
  }

  customElements.define('tag-filter', TagWithBootstrap);
}());
