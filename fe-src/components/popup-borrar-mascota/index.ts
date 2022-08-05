import { Router } from "@vaadin/router";
import { state } from "../../state";
import { iconoXblanco } from "../../img/iconos";

export function initDeletePet() {
  class DeletePetComp extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }

    render() {
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
              display: flex;
              padding: 20px;
              border-radius: 14px;
              align-items: center;
              justify-content: center;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              width: 300px;
              height: 180px;
              background: #108896;
            }
            .title{
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 23px;
                color: #FFFFFF;
                position: absolute;
                top: 0;
            }
            .text{
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 16px;
                text-align: center;
                color: #FFFFFF;
            }
            .button{
              font-size: 14px;
              text-align: center;
              color: #F19F1F;
              background: none;
              border: none;
              position: absolute;
              bottom: 20px;
              right: 15px;
            }
            .button-cerrar{
                position: absolute;
                right: 0;
                top: 0;
                margin: 12px;
                border: none;
                background: none;
            }
            `;

      this.shadow.innerHTML = `
        <div class="pet__full-info">
          <div class="pet__report-conteiner">
              <button class="button-cerrar">${iconoXblanco}</button>
              <h3 class="title">Reportar como encontrada</h3>
               <p class="text">Si confirmas esta acción se eliminará la mascota de la base de datos.</p>
              <button class="button">Confirmar</button>
         </div>
        </div>
  
        `;

      this.shadow.appendChild(style);
      const cs = state.getState();
      const botonConfirmar: any = this.shadow.querySelector(".button");

      botonConfirmar.addEventListener("click", (e) => {
        e.preventDefault();
        state.deletePet();
        Router.go("/");
      });
    }
  }
  customElements.define("delete-comp", DeletePetComp);
}
