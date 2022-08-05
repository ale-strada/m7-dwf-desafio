import { Router } from "@vaadin/router";
import { state } from "../../state";
import { mapboxgl } from "../../../be-src/lib/mapbox";
import { Dropzone } from "dropzone";

class ReportPage extends HTMLElement {
  connectedCallback() {
    const cs = state.getState();
    this.render();
  }
  addListenerts() {
    const cs = state.getState();
    const miUbicacionButton = document.querySelector(".mi-ubicacion");
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-21.9270884, 64.1436456], // starting position [lng, lat]
      zoom: 13, // starting zoom
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
      cs.lostPetData.lat = e.lngLat.lat;
      cs.lostPetData.lng = e.lngLat.lng;
      state.setState(cs);
    });

    let pictureURL;
    const myDropzone = new Dropzone(".label", {
      url: "/falsa",
      autoProcessQueue: false,
      createImageThumbnails: true,
      thumbnailWidth: null,
      thumbnailHeight: null,
      maxFiles: 1,
    });

    myDropzone.on("thumbnail", function (file) {
      pictureURL = file.dataURL;
      cs.lostPetData.pictureURL = pictureURL;
      state.setState(cs);
    });

    const form: any = document.querySelector(".form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target;
      (cs.lostPetData.petName = target.petName.value),
        (cs.lostPetData.ubication = target.ubication.value),
        (cs.lostPetData.description = target.description.value),
        (cs.lostPetData.email = cs.email);
      state.setState(cs);
      console.log(cs);

      state.createPet();
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
        border: 1px dashed #A1A0A0;
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

    </style>

    

    <header-comp></header-comp>
    <title-comp>Publicar mascota perdida</title-comp>
    <div class = "caja">
    <form class="form">
            <label class="input-box">Nombre de la mascota
                <input class="input" type="text" name="petName">
            </label>
            <p class="input-box">Agregá una foto aquí</p>
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
          
            <button class="button publicar">Publicar mascota</button>  
    </form>
    <button class="button cancelar">Cancelar</button>
    </div>
    `;
    this.addListenerts();
  }
}

customElements.define("report-page", ReportPage);
