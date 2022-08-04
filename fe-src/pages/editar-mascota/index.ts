import { Router } from "@vaadin/router";
import { state } from "../../state";
import { mapboxgl } from "../../../be-src/lib/mapbox";
import { Dropzone } from "dropzone";

type EditPet = {
  petName: string;
  description: string;
  lat: number;
  lng: number;
  ubication: string;
  pictureURL: string;
};
class EditPage extends HTMLElement {
  editPet: EditPet = {
    petName: "",
    description: "",
    lat: 0,
    lng: 0,
    ubication: "",
    pictureURL: "1",
  };

  connectedCallback() {
    const cs = state.getState();
    state.getPetById();

    state.subscribe(() => {
      const cs = state.getState();
      this.editPet = cs.lostPetData;
      //this.render();
    });

    this.render();
  }
  addListenerts() {
    const form: any = document.querySelector(".form");

    if (this.editPet) {
      form.petName.value = this.editPet.petName;
      form.ubication.value = this.editPet.ubication;
      form.description.value = this.editPet.description;
    }

    const cs = state.getState();
    const miUbicacionButton = document.querySelector(".mi-ubicacion");
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-21.9270884, 64.1436456],
      zoom: 13,
    });
    miUbicacionButton?.addEventListener("click", (e) => {
      e.preventDefault();
      if (cs.currentGeoLoc.lat && cs.currentGeoLoc.lng) {
        map.flyTo({
          center: [cs.currentGeoLoc.lng, cs.currentGeoLoc.lat],
          zoom: 15,
        });
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          map.flyTo({
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 15,
          });
        });
      }
    });
    map.on("click", (e) => {
      const marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
      this.editPet.lat = e.lngLat.lat;
      this.editPet.lng = e.lngLat.lng;
    });

    let pictureURL;
    const myDropzone = new Dropzone(".label", {
      url: "/falsa",
      autoProcessQueue: false,
      createImageThumbnails: true,
    });

    myDropzone.on("thumbnail", function (file) {
      pictureURL = file.dataURL;
      cs.lostPetData.pictureURL = pictureURL;
      state.setState(cs);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target;
      (this.editPet.petName = target.petName.value),
        (this.editPet.ubication = target.ubication.value),
        (this.editPet.description = target.description.value),
        (this.editPet.pictureURL = cs.lostPetData.pictureURL);

      state.editPet(this.editPet);
      Router.go("/misMascotas");
    });
    const cancelButton = document.querySelector(".cancelar");
    cancelButton?.addEventListener("click", (e) => {
      e.preventDefault();
      cs.lostPetData.pictureURL = "";
      cs.lostPetData.lat = "";
      cs.lostPetData.lng = "";
      state.setState(cs);
      Router.go("/");
    });

    const popupBorrar = document.querySelector(".popup-borrar");
    const encontrada = document.querySelector(".encontrada");
    encontrada?.addEventListener("click", (e) => {
      e.preventDefault();
      popupBorrar?.classList.remove("none");
      console.log("encontrada");
    });
  }

  render() {
    this.innerHTML = `
    <style class="select-style" type="text/css">
      .caja{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 340px;
        margin: 0px auto 40px;
      }
      .form{
        margin: 0 auto;
      }
      .foto-input{
        width: 335px;
        height: 190px;
        background: #EEEAEA;
        border: 1px dashed;
        border-radius: 14px;
        margin: 20px auto;
      }
      .map{
        width: 335px; 
        height: 230px
      }
      .input{
        border: 1px solid #F19F1F;
        border-radius: 14px;
        width: 340px;
        height: 50px;
        font-family: 'Roboto';
        font-weight: 700;
        font-size: 16px;
        align-items: center;
        padding: 15px;
      }
      .input-box{
        margin-top: 25px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        color: #F19F1F;
      }
      .button{
        width: 340px;
        height: 50px;
        background: #F19F1F;
        border: 1px solid #F19F1F;
        border-radius: 14px;
        align-items: center;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
        margin-top: 25px;
    }
    .publicar{
      background: #EF5030;
    }
    .cancelar{
      background: #A1A0A0;
    }
    .encontrada{
      background: #108896;
    }
    .description{
      height: 200px;
    }
    .dz-details,
    .dz-progress,
    .dz-error-message,
    .dz-success-mark,
    .dz-error-mark{
      display:none;
    }
    .label{
      width: 100%;
      height: 100%;
    }
    img{
      width: 335px;
      height: 190px;
      object-fit: scale-down;
    }
    .none{
      display: none;
    }

    </style>

    

    <header-comp></header-comp>
    <title-comp>Editar mascota perdida</title-comp>
    <div class = "caja">
    <form class="form">
            <label class="input-box">Nombre de la mascota
                <input class="input" type="text" name="petName">
            </label>
            <div class="foto-input caja">
                <label class="label"> </label>
            </div>
            <div class ="geo-loc__box">
                <p class="input-box">Marcá en el mapa dónde lo viste por última vez</p>
                <div class="map" id="map"></div>
                <button class="button mi-ubicacion">Ir a mi ubicación aproximada</button>
            </div>
            
                <label class="input-box">Indica ciudad y provincia
                    <input class="input" type="text" name="ubication">
                </label>
            <label class="input-box">Descripción
                <textarea class="input description" name="description" cols="30" rows="10"></textarea>
            </label>
            <button class="button publicar">Actualizar información</button>  
    </form>
    <button class="button encontrada">Mascota encontrada</button>
    <button class="button cancelar">Cancelar</button>
    </div>
    <delete-comp class="popup-borrar none"></delete-comp>
    `;
    this.addListenerts();
  }
}

customElements.define("edit-page", EditPage);
