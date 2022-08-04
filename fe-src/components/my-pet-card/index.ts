let sinFoto = require("url:../../img/sin-foto.png");
import { Router } from "@vaadin/router";
import { iconoUbication2 } from "../../img/iconos";
import { state } from "../../state";

export function initMyMpet() {
  class MyPetComp extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }

    render() {
      const textoOriginal: any = this.textContent;
      const pet = JSON.parse(textoOriginal);

      var style = document.createElement("style");
      style.textContent = `
      .pet__box{    
        margin: 20px auto;
        width: 240px;
        height: 220px;
        box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
        border-radius: 14px;
      }
        .pet__box-description{
          background: #EF5030;
          box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
          border-radius: 14px;
          position: relative;
          top: -25px;
          display: flex;  
        }
        .pet__foto{
          width: 100%;
          max-width: 235px;
          max-height: 160px;
          object-fit: contain;
        }
        .pet__titulo-name{
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 700;
          font-size: 14px;
          line-height: 16px;
          color:#FFFFFF;
          margin: 0px 10px;
        }
        .pet__ubicacion{
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 300;
          font-size: 12px;
          line-height: 12px;
          color:#FFFFFF;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pet__ubicacion-text{
          margin:5px;
        }
        .button{
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 700;
          font-size: 12px;
          line-height: 12px;
          color: #F19F1F;
          border: none;
          background: none;
        }
        .box{
          display: flex;
          justify-content: space-around;
          align-items: flex-start;
          flex-direction: column;
          margin: 10px;
          width: 100%;
          height: 60px;
        }
        .pet__info{
          width: 400px;
        }
        .none{
          display:none;
        }

        * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
            `;

      this.shadow.innerHTML = `
     
      <div class="pet__box">
        <img src=${pet.pictureURL || sinFoto} alt="FOTO" class="pet__foto">
        <div class="pet__box-description">
          <div class="pet__info box">
            <h3 class="pet__titulo-name">${pet.petName}</h3>
            <div class="pet__ubicacion">
              <span>${iconoUbication2}</span>
              <p class="pet__ubicacion-text">${pet.ubication}</p>
            </div>
          </div>
          <div class="pet__buttons-my-pets box">
          <button class="button editar">Editar</button>
          </div>
        </div>
      </div>
        `;

      this.shadow.appendChild(style);
      const cs = state.getState();
      const botonEditar: any = this.shadow.querySelector(".editar");

      botonEditar.addEventListener("click", (e) => {
        e.preventDefault();
        cs.currentPetEditId = pet.id;
        state.setState(cs);
        Router.go("/editar");
      });
    }
  }
  customElements.define("mypet-comp", MyPetComp);
}
