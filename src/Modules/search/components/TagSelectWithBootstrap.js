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
    >
    <style>
      .dropdown-toggle {
        min-width: 205px;
        padding: 24px 15px;
        text-align: left;
      }
      .dropdown-toggle::after {
        display: inline-block;
        position: absolute;
        top: 36px;
        right: 18px;
        content: "";
        border-top: .7rem solid;
        border-right: .7rem solid transparent;
        border-bottom: 0;
        border-left: .7rem solid transparent;
      }
      .dropdown-menu {
        padding: 16px 0;
      }
      .dropdown-menu li {
        padding: 0 20px;
        white-space: nowrap;
        color: #fff;
      }
      ::slotted(.dropdown-item) {
        color: #fff !important;
      }
      ::slotted(.dropdown-item:hover) {
        color: #000 !important;
      }
    </style>
    <div class="dropdown">
      <button 
        class="btn btn-lg dropdown-toggle" 
        type="button"
        aria-expanded="false"
      >
      </button>
      <ul class="dropdown-menu text-white">
        <slot><li>Aucun filtre disponible</li></slot>
      </ul>
    </div>
  `;

  class TagSelectWithBootstrap extends HTMLElement {
    constructor() {
      super();

      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.handleClickAway = this.handleClickAway.bind(this);

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.$dropdownToggle = this.shadowRoot.querySelector('.dropdown-toggle');
      this.$dropdownMenu = this.shadowRoot.querySelector('.dropdown-menu');
      this.$dropdownItemsSlot = this.shadowRoot.querySelector('slot');

      this.$dropdownItemsSlot.addEventListener('slotchange', () => {
        const dropdownItems = this.$dropdownItemsSlot.assignedElements();
        dropdownItems.forEach((dropdownItem) => {
          dropdownItem.classList.add('dropdown-item');
          dropdownItem.addEventListener(
            'click',
            () => {
              this.dispatchEvent(new CustomEvent('clickItem', {
                bubbles: false,
                composed: false,
                detail: dropdownItem.textContent,
              }));
            },
          );
        });
      });

      this.$dropdownToggle.addEventListener('click', this.toggleDropdown);
    }

    connectedCallback() {
      const dropdownId = `dropdownToggle-${this.label}`;
      this.$dropdownToggle.setAttribute('id', dropdownId);
      this.$dropdownToggle.classList.add(`btn-${this.variant}`);
      this.$dropdownMenu.setAttribute('aria-labelledby', dropdownId);
      this.$dropdownMenu.classList.add(`bg-${this.variant}`);

      const dropdownLabel = document.createTextNode(this.label);
      this.$dropdownToggle.appendChild(dropdownLabel);
    }

    toggleDropdown() {
      const isDropdownOpen = this.$dropdownMenu.classList.contains('show');

      if (isDropdownOpen) {
        this.handleClose();
      } else {
        this.handleOpen();
      }
    }

    handleOpen() {
      this.$dropdownMenu.classList.add('show');
      this.$dropdownToggle.setAttribute('aria-expanded', 'true');

      document.addEventListener('click', this.handleClickAway);
    }

    handleClose() {
      this.$dropdownMenu.classList.remove('show');
      this.$dropdownToggle.setAttribute('aria-expanded', 'false');

      document.removeEventListener('click', this.handleClickAway);
    }

    handleClickAway(event) {
      const hasClickAway = this !== event.target;

      if (hasClickAway) {
        this.$dropdownMenu.classList.remove('show');
        document.removeEventListener('click', this.handleClickAway);
      }
    }

    get variant() {
      const variant = this.getAttribute('variant');

      if (!VARIANTS.includes(variant)) {
        return 'primary';
      }

      return variant;
    }

    get label() {
      let label = this.getAttribute('label');
      label = label[0].toUpperCase() + label.substring(1);

      return label;
    }
  }

  customElements.define('tag-select', TagSelectWithBootstrap);
}());
