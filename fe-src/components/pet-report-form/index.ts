import { iconoX } from "../../img/iconos";
import { state } from "../../state";

export function initPetReportCard() {
  class PetReportCardComp extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }

    render() {
      let textoOriginal: any = this.textContent;
      const pet = JSON.parse(textoOriginal);
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
                width: 300px;
                height: 530px;
                display: flex;
                flex-direction: column;
                padding: 20px;
                border-radius: 14px;
                background-color: #FFF8ED;
                align-items: center;
                justify-content: space-around;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                width: 300px;
                height: 530px;
            }
            .text{
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 20px;
                line-height: 23px;
                color: #F19F1F;
            }
            .form{
                display: flex;
                flex-direction: column;
                width: 260px;
            }
            .label{    width: 100%;
                display: flex;
                flex-direction: column;
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 12px;
                color: #F19F1F;
            }
            .input{
                height: 45px;
                margin: 10px 0;
                width: 100%;
                background: #F2E5CF;
                border: 1px solid #F19F1F;
                border-radius: 14px;
            }
            .textarea{
                height: 140px
            }
            .button{
                margin: 10px 5px;
                padding: 0px 20px;
                font-family: 'Roboto';
                font-size: 16px;
                line-height: 19px;
                color: #FFFFFF;
                width: inherit;
                height: 50px;
                background: #EF5030;
                border-radius: 14px;
            }
            .button-cerrar{
                position: absolute;
                right: 0;
                top: 0;
                margin: 12px;
                border: none;
                background: none;
            }
            .reporte-exitoso{
                height: 50px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
            }
            .text-gracias{
                font-family: 'Roboto';
                color: #F19F1F;
            }
            .none{
                display:none
            }
            `;

      this.shadow.innerHTML = `
        <div class="pet__full-info">
          <div class="pet__report-conteiner">
            <button class="button-cerrar">${iconoX}</button>
            <div class="conteiner">
            <h3 class="pet__full-info-title text">Reportar info de ${pet.petName}</h3>
            <form class="form">
                <label class="label">Tu Nombre
                    <input class="input" type="text" name="reporterName">
                </label>
                
                <label class="label">Tu teléfono
                    <input class="input" type="number" name="reporterPhone" >
                </label>

                <label class="label">Descripción
                 <textarea class="input textarea" name="description"></textarea>
                </label>

                <button class="button">enviar</button>
            </form>
            </div>
            <div class="reporte-exitoso none">
                <h3 class="text">¡Reporte exitoso!</h3>
                <p class="text-gracias">Gracias por ayudar</p>
            </div>
         </div>
        </div>
  
        `;

      this.shadow.appendChild(style);

      const form = this.shadow.querySelector(".form");
      const report = this.shadow.querySelector(".conteiner");
      const gracias = this.shadow.querySelector(".reporte-exitoso");
      const reportConteiner: any = this.shadow.querySelector(
        ".pet__report-conteiner"
      );

      form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const cs = state.getState();
        const target: any = e.target;

        cs.reporte.nombre = target.reporterName.value;
        cs.reporte.telefono = target.reporterPhone.value;
        cs.reporte.descripcion = target.description.value;
        state.setState(cs);

        state.sendEmail();

        report?.classList.add("none");
        gracias?.classList.remove("none");
        reportConteiner.style.height = "190px";
      });
    }
  }
  customElements.define("reportcard-comp", PetReportCardComp);
}
