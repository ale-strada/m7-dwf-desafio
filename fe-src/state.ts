const API_BASE_URL = "";
import { Router } from "express";

const state = {
  data: {
    userId: "",
    fullName: "",
    email: "",
    token: "",
    currentGeoLoc: { lat: 0, lng: 0 },
    lostPetData: {
      petName: "",
      description: "",
      lat: "",
      lng: "",
      ubication: "",
      pictureURL: "",
    },
    currentPetEditId: "",
    petsNear: [],
    myPets: [],
  },

  listeners: [],

  init() {
    //const lastStorageState = localStorage.getItem("state");
    const cs = this.getState();
  },

  getState() {
    return this.data;
  },
  petsNear() {
    const cs = state.getState();
    fetch(
      API_BASE_URL +
        "/pets/cerca-de?lat=" +
        cs.currentGeoLoc.lat +
        "&lng=" +
        cs.currentGeoLoc.lng,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.map(function (e) {
          const pet = {
            id: e.objectID,
            petName: e.petName,
            description: e.description,
            lat: e._geoloc.lat,
            lng: e._geoloc.lng,
            ubication: e.ubication,
            pictureURL: e.pictureURL,
          };
          cs.petsNear.push(pet);
        });
        state.setState(cs);
      });
  },
  async createPet() {
    const cs = this.getState();
    if (cs.token) {
      const res = await fetch(API_BASE_URL + "/pets", {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: cs.token,
        },
        body: JSON.stringify({
          petName: cs.lostPetData.petName,
          description: cs.lostPetData.description,
          lat: cs.lostPetData.lat,
          lng: cs.lostPetData.lng,
          ubication: cs.lostPetData.ubication,
          pictureURL: cs.lostPetData.pictureURL,
        }),
      });
      const data = await res.json();
    } else {
      console.error("usuario no registrado");
    }
  },
  async editPet(petData) {
    const cs = this.getState();
    if (cs.token) {
      const res = await fetch(API_BASE_URL + "/pets/" + cs.currentPetEditId, {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: cs.token,
        },
        body: JSON.stringify({
          petName: petData.petName,
          description: petData.description,
          lat: petData.lat,
          lng: petData.lng,
          ubication: petData.ubication,
          pictureURL: petData.pictureURL,
        }),
      });
      const data = await res.json();
    } else {
      console.error("usuario no registrado");
    }
  },
  async getPetById() {
    const cs = this.getState();
    const res = await fetch(API_BASE_URL + "pets/" + cs.currentPetEditId, {
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: cs.token,
      },
    });
    const data = await res.json();
    if (data) {
      cs.lostPetData = data;
      state.setState(cs);
    } else {
      console.log("vacio");
    }
  },
  async myPets() {
    const cs = this.getState();
    if (cs.token) {
      const res = await fetch(API_BASE_URL + "/pets/me", {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: cs.token,
        },
      });
      const data = await res.json();
      if (data) {
        try {
          cs.myPets = data;
          state.setState(cs);
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      console.error("usuario no registrado");
    }
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("soy el state, he cambiado", this.getState());
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  signUp(password, callback?) {
    const cs = this.getState();
    if (cs.email) {
      fetch(API_BASE_URL + "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: cs.email,
          fullName: cs.fullName,
          password: password,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.userId = data[1].id;
          console.log(data);

          this.setState(cs);
          callback();
        });
    } else {
      console.error("No hay un email en el state");
      callback(true);
    }
  },
  async logIn(password, callback?) {
    const cs = this.getState();
    if (cs.email && password) {
      const res = await fetch(API_BASE_URL + "/auth/token", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: cs.email,
          password: password,
        }),
      });
      const data = await res.json();
      if (data) {
        try {
          cs.token = "bearer " + data;
          this.setState(cs);
          callback();
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      console.error("No hay un email en el state o pass incorrecta");
      callback(true);
    }
  },
};
export { state };
