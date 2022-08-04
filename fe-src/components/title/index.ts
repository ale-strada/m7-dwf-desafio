export function initTitle() {
  class TitleComp extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }

    render() {
      let textoOriginal = this.textContent;
      var style = document.createElement("style");
      style.textContent = `
      .text{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 28px;
        line-height: 33px;
        color:#108896;
        text-align: center;
      }
      .box-text{
        margin: 50px auto;
        max-width: 250px;
      }
          `;

      this.shadow.innerHTML = `
    <div class="box-text">
      <h2 class="text">${textoOriginal}</h2>
    </div>

      `;

      this.shadow.appendChild(style);
    }
  }
  customElements.define("title-comp", TitleComp);
}
