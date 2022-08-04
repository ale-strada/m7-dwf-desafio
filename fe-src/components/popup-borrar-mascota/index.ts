import { Router } from "@vaadin/router";
import { state } from "../../state";
import { iconoX } from "../../img/iconos";

export function initDeletePet() {
  class DeletePetComp extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }

    render() {
      //   const textoOriginal: any = this.textContent;
      //   const pet = JSON.parse(textoOriginal);

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
            .pet__report-conteiner{
                width: 300px;
                height: 530px;
                display: flex;
                flex-direction: column;
                padding: 20px;
                border-radius: 14px;
                background-color: #FFF8ED;
                align-items: center;
                justify-content: space-around;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                width: 300px;
                height: 530px;
            }
            .text{
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 20px;
                line-height: 23px;
                color: #F19F1F;
            }
            .form{
                display: flex;
                flex-direction: column;
                width: 260px;
            }
            .label{    width: 100%;
                display: flex;
                flex-direction: column;
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 12px;
                color: #F19F1F;
            }
            .input{
                height: 45px;
                margin: 10px 0;
                width: 100%;
                background: #F2E5CF;
                border: 1px solid #F19F1F;
                border-radius: 14px;
            }
            .textarea{
                height: 140px
            }
            .button{
                margin: 10px 5px;
                padding: 0px 20px;
                font-family: 'Roboto';
                font-size: 16px;
                line-height: 19px;
                color: #FFFFFF;
                width: inherit;
                height: 50px;
                background: #EF5030;
                border-radius: 14px;
            }
            .button-cerrar{
                position: absolute;
                right: 0;
                top: 0;
                margin: 12px;
                border: none;
                background: none;
            }
            .reporte-exitoso{
                height: 50px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
            }
            .text-gracias{
                font-family: 'Roboto';
                color: #F19F1F;
            }
            .none{
                display:none
            }
            `;

      this.shadow.innerHTML = `
        <div class="pet__full-info">
          <div class="pet__report-conteiner">
            <button class="button-cerrar">${iconoX}</button>
                <h3 class="text">¡Reporte exitoso!</h3>
                <p class="text-gracias">Gracias por ayudar</p>
          
         </div>
        </div>
  
        `;
      //armar el delete pets
      this.shadow.appendChild(style);
      const cs = state.getState();
      const botonEditar: any = this.shadow.querySelector(".editar");

      botonEditar.addEventListener("click", (e) => {
        e.preventDefault();
      });
    }
  }
  customElements.define("delete-comp", DeletePetComp);
}
