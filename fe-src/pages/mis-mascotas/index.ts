//import { Router } from "@vaadin/router";
import { state } from "../../state";
let poncho = require("url:../../img/Rectangle.png");
import { iconoUbication2 } from "../../img/iconos";

type Pet = {
  petName: string;
  ubication: string;
  pictureURL: string;
  description: string;
  id: number;
};
class MyPets extends HTMLElement {
  pageTitle: string;
  pets: Pet[] = [];

  connectedCallback() {
    const cs = state.getState();
    cs.ruta = "";

    this.pageTitle = "No hay mascotas reportadas";
    state
      .myPets()
      .then(() => {
        this.pets = cs.myPets;
      })
      .then(() => {
        this.render();
      });

    // state.subscribe(() => {
    //   const cs = state.getState();
    //   this.pets = cs.myPets;
    //   this.render();
    // });
  }
  addListenerts() {
    if (this.pets) {
      this.pageTitle = "Mis mascotas reportadas";
    }
  }
  render() {
    this.innerHTML = `
    <style class="select-style" type="text/css">
    .opacity{
      opacity: 40%;
    }
    .none{
      display:none;
    }
    </style>
    <header-comp class="header"></header-comp>
    <title-comp class="title">${this.pageTitle}</title-comp>
    <div>
    ${this.pets.map((m) => {
      const pet = {
        petName: m.petName,
        ubication: m.ubication,
        pictureURL: m.pictureURL,
        description: m.description,
        id: m.id,
      };

      return `<mypet-comp>
      ${JSON.stringify(pet)}
        </mypet-comp>`;
    })}
    </div>
    
    `;
    this.addListenerts();
  }
}

customElements.define("mismascotas-page", MyPets);
