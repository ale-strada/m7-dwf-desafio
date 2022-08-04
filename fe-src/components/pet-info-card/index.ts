import { iconoUbication3 } from "../../img/iconos";

export function initPetInfoCard() {
  class PetInfoCardComp extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }

    render() {
      let textoOriginal: any = this.textContent;
      const pet = JSON.parse(textoOriginal);
      var style = document.createElement("style");
      style.textContent = `
      .pet__full-info{
        lign-items: center;
        background-color: rgba(0, 0, 0, 0.3);
        bottom: 0;
        display: flex;
        justify-content: center;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 1;
      }
      .text{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #108896;
      }
      .pet__ubicacion{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #108896;
        margin-left: 5px;
      }
      .pet__full-info-conteiner{
        padding: 40px;
        position: absolute;
        box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
        border-radius: 14px;
        background: #FFF8ED;
        width: 300px;
        height: 370px;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 0;
        right: 0;
        opacity:1;
      }
      .pet__full-info-title{
        font-size: 20px;
        font-weight: 700;
        margin: 50px 0px 30px;
      }
      .pet__full-info-ubication-title{
        margin-top: 70px;
      }
      .pet__full-info-ubication-box{
        display: flex;
        align-items: center;
      }
        
            `;

      this.shadow.innerHTML = `
        <div class="pet__full-info">
          <div class="pet__full-info-conteiner">
            <h3 class="pet__full-info-title text">${pet.petName}</h3>
            <p class="pet__full-info-text text">${pet.description} </p>
            <p class="pet__full-info-ubication-title text">Última vez visto en:</p>
            <div class="pet__full-info-ubication-box">
              <span>${iconoUbication3}</span>
              <p class="pet__ubicacion">${pet.ubication}</p>
            </div>
          </div>
        </div>
  
        `;

      this.shadow.appendChild(style);
    }
  }
  customElements.define("infocard-comp", PetInfoCardComp);
}
