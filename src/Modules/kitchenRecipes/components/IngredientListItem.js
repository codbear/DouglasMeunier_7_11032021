// eslint-disable-next-line func-names
(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      .ingredient-name {
        font-weight: bold;
      }
    </style>
    
    <li></li>
  `;

  class IngredientListItem extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.listElement = this.shadowRoot.querySelector('li');
    }

    connectedCallback() {
      const nameContent = document.createTextNode(this.name);
      const nameElement = document.createElement('span');
      nameElement.classList.add('ingredient-name');
      nameElement.appendChild(nameContent);

      this.listElement.appendChild(nameElement);

      if (this.hasAttribute('quantity')) {
        const quantityContent = document.createTextNode(`: ${this.quantity}`);
        this.listElement.appendChild(quantityContent);
      }

      if (this.hasAttribute('unit')) {
        const unitContent = document.createTextNode(` ${this.unit}`);
        this.listElement.appendChild(unitContent);
      }
    }

    get name() {
      return this.getAttribute('name');
    }

    get quantity() {
      return this.getAttribute('quantity');
    }

    get unit() {
      return this.getAttribute('unit');
    }
  }

  customElements.define('ingredient-list-item', IngredientListItem);
}());
