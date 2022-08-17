//import { Router } from "@vaadin/router";
import { state } from "../../state";
import { perrito } from "../../img/perrito";
import { iconoUbication } from "../../img/iconos";
import { Router } from "@vaadin/router";

class Home extends HTMLElement {
  connectedCallback() {
    const cs = state.getState();
    this.render();
    // if (cs.error) {
    //   location.reload();
    //   cs.error = false;
    //   state.setState(cs);
    //}
  }
  addListenerts() {
    const buttonMostrarMascotas: any = this.querySelector(".mostrar-mascotas");
    const buttonPermitirLoc: any = this.querySelector(".permitir-loc");
    const buttonRechazarLoc: any = this.querySelector(".rechazar-loc");
    const userGeoLoc: any = this.querySelector(".user-geo-loc");
    buttonMostrarMascotas.addEventListener("click", (e) => {
      e.preventDefault();
      const cs = state.getState();

      userGeoLoc.classList.add("visible");
    });
    buttonRechazarLoc.addEventListener("click", (e) => {
      e.preventDefault();
      userGeoLoc.classList.remove("visible");
    });

    buttonPermitirLoc.addEventListener("click", (e) => {
      e.preventDefault();
      const cs = state.getState();
      navigator.geolocation.getCurrentPosition((position) => {
        (cs.currentGeoLoc.lat = position.coords.latitude),
          (cs.currentGeoLoc.lng = position.coords.longitude);

        state.petsNear();
        state.setState(cs);
        Router.go("/mascotas");
      });
    });
  }
  render() {
    this.innerHTML = `
    <style class="select-style" type="text/css">
      .perrito-welcome{
          margin: 50px auto;
          width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
      }
      .user-geo-loc{
        position: absolute;
        width: 320px;
        height: 214px;
        padding: 10px;
        background: #FFF8ED;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 14px;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        display: none;
      }
      .ubication-text{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        align-items: center;
        text-align: justify;
        color: #8B8B8B;
        margin:20px 0px;
      }
      .user-geo-loc-buttons{
        margin-top:30px;
      }
      .button-loc{
        border: none;
        background-color: inherit;
        align-items: center;
        text-align: justify;
        color: #F19F1F;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        padding: 15px;
      }
      .rechazar-loc{
        border-right: 1px solid #9A9997;
      }
      .visible{
        display: flex;
      }
    </style>
    <header-comp></header-comp>
    <title-comp>Consigue ayuda, ayuda a otros</title-comp>
    <div class="perrito-welcome">
      ${perrito}
    </div>
    <button-comp class="mostrar-mascotas">Mostrar mascotas</button-comp>
    
    <div class="user-geo-loc">
      ${iconoUbication}
      <p class = "ubication-text">Para ver las mascotas reportadas cerca tuyo permite la ubicación de tu dispositivo.</p>
      <div class="user-geo-loc-buttons">
        <button class="button-loc rechazar-loc">Rechazar</button>
        <button class="button-loc permitir-loc">Permitir</button>
      </div>
    </div>
      
    `;
    this.addListenerts();
  }
}

customElements.define("home-page", Home);
