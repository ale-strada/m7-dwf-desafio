export function initButton() {
  class ButtonComp extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const textoOriginal = this.textContent;
      var style = document.createElement("style");
      style.textContent = `
        .button-container{
            max-width: 560px;
            margin: 100px auto;
            padding: 0px 20px;
            display: flex;
            justify-content: center
        }
        .button{
            
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 19px;
          color: #FFFFFF;
          width:340px;
          height: 50px; 
          background: #EF5030;
          border-radius: 14px;
}
        }
        `;
      var shadow = this.attachShadow({ mode: "open" });
      shadow.appendChild(style);

      var button = document.createElement("button");
      button.classList.add("button");
      button.textContent = textoOriginal;

      var div = document.createElement("div");
      div.classList.add("button-container");
      div.appendChild(button);

      shadow.appendChild(div);
    }
  }
  customElements.define("button-comp", ButtonComp);
}
