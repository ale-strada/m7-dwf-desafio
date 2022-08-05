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

// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(
//   "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"
// );
// const msg = {
//   to: "strada.ale92@gmail.com", // Change to your recipient
//   from: "buscador.de.mascotas.app@gmail.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });
