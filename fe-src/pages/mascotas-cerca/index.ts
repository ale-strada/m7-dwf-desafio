//import { Router } from "@vaadin/router";
import { StringDataType } from "sequelize/types";
import { state } from "../../state";

type Pet = {
  petName: string;
  ubication: string;
  pictureURL: string;
  description: string;
  email: string;
};
class PetsNear extends HTMLElement {
  pageTitle: string;
  pets: Pet[] = [];

  connectedCallback() {
    const cs = state.getState();
    state.petsNear();
    this.pets = cs.petsNear;
    this.pageTitle = "No hay mascotas perdidas cerca tuyo";
    this.pets = cs.petsNear;

    // state.subscribe(() => {
    //   const cs = state.getState();
    //   this.pets = cs.petsNear;
    //   this.render();
    // });
    this.render();
  }
  addListenerts() {
    if (this.pets) {
      this.pageTitle = "Mascotas perdidas cerca tuyo";
    }
  }
  render() {
    this.innerHTML = `
    <style class="select-style" type="text/css">
    .alcance-buscador{
      font-family: 'Roboto';
    font-size: 14px;
    text-align: center;
    color: #B3B0AC;
    margin-top: 0px;
    margin-bottom: 50px;
    }
    .none{
      display:none;
    }
    </style>
    <header-comp class="header"></header-comp>
    <title-comp class="title">${this.pageTitle}</title-comp>
    <p class ="alcance-buscador">Radio de 2km</p>
    <div>
    ${this.pets.map((m) => {
      const pet = {
        petName: m.petName,
        ubication: m.ubication,
        pictureURL: m.pictureURL,
        description: m.description,
        email: m.email,
      };

      return `<template-comp class = "template">
      ${JSON.stringify(pet)}
        </template-comp>`;
    })}
    </div>
    
    `;
    this.addListenerts();
  }
}

customElements.define("mascotas-page", PetsNear);
