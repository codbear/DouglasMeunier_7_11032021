// eslint-disable-next-line func-names
(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
      integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
      crossorigin="anonymous"
    /> 
    
    <style>
      :host {
        --color-background-card: #e7e7e7;
        --color-background-illustration: #c7bebe;
        
        display: block;
        width: 380px;
        background: var(--color-background-card);
        border: none;
        border-radius: 5px;
        overflow: hidden;
      }
      .card-img-top {
        height: 178px;
        background: var(--color-background-illustration);
      }
      .card-body {
        background: var(--color-background-card);
      }
      .card-title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
      }
      .card-title {
        font-size: 18px;
      }
      .recipe-duration {
        display: flex;
        align-items: center;
        line-height: 20px;
      }
      .icon-clock {
        width: 20px;
        height: 20px;
        margin-right: 7px;
      }
      .card-description {
        padding-left: 0;
        position: relative;
        font-size: 12px;
      }
      ::slotted(ingredient-list-item) {
        font-size: 12px;
      }
    </style>

    <div class="card-img-top">
      <img src="" alt="">
    </div>
    <div class="card-body">
      <div class="card-title-wrapper">
        <h1 class="card-title"></h1>
        <div class="recipe-duration">
          <svg class="icon-clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) -->
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 
            0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 
            200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 
            48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
            />
          </svg>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <ul class="list-unstyled">
            <slot name="ingredients"></slot>
          </ul>
        </div>
        <div class="col-6 card-description">
          <slot name="description"></slot>
        </div>
      </div>
    </div>
  `;

  class KitchenRecipeCardWithBootstrap extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.$img = this.shadowRoot.querySelector('img');
      this.$title = this.shadowRoot.querySelector('.card-title');
      this.$descriptionSlot = this.shadowRoot.querySelector('slot[name=description]');
      this.$recipeDuration = this.shadowRoot.querySelector('.recipe-duration');
    }

    connectedCallback() {
      this.$img.setAttribute('src', this.dataset.imageSrc || '');
      this.$img.setAttribute('alt', this.dataset.imageAlt || '');

      const title = document.createTextNode(this.getAttribute('title'));
      this.$title.appendChild(title);

      const duration = document.createTextNode(`${this.getAttribute('duration')} min`);
      this.$recipeDuration.appendChild(duration);

      const description = Array.from(this.$descriptionSlot.assignedElements())[0];
      description.classList.add('card-text');
    }
  }

  customElements.define('kitchen-recipe-card', KitchenRecipeCardWithBootstrap);
}());
