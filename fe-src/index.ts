import "./pages/home";
import "./pages/mascotas-cerca";
import "./pages/log-in";
import "./pages/sign-up";
import "./pages/reportar-mascota";
import "./pages/mis-mascotas";
import "./pages/editar-mascota";
import "./router";
import { state } from "./state";
import { initHeader } from "./components/header";
import { initButton } from "./components/boton";
import { initTitle } from "./components/title";
import { initPetInfoCard } from "./components/pet-info-card";
import { initPetTemplate } from "./components/pet-card-template";
import { initPetReportCard } from "./components/pet-report-form";
import { initMyMpet } from "./components/my-pet-card";
import { initDeletePet } from "./components/popup-borrar-mascota";

(function () {
  state.init();
  initHeader();
  initButton();
  initTitle();
  initPetInfoCard();
  initPetTemplate();
  initPetReportCard();
  initMyMpet();
  initDeletePet();
})();
