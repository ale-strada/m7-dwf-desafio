import { Router } from "@vaadin/router";
import { state } from "../../state";
import {
  iconoMisDatos,
  iconoMisMascotas,
  iconoReportar,
} from "../../img/iconos";
export function initHeader() {
  class HeaderComp extends HTMLElement {
    shadow: ShadowRoot;
    email: string;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.email = "";
      this.render();
    }

    render() {
      const cs = state.getState();
      if (cs.token) {
        this.email = cs.email;
      }
      var style = document.createElement("style");
      style.textContent = `
          .header{
                height: 70px;
                background: #F19F1F;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                display: flex;
                flex-direction: column;
            }
            .hamburger{
                position:fixed;
              background-color:transparent;
                left:0;
                top:0;
                height:30px;
                width:30px;
                padding:20px 20px;
                -webkit-transform:translate3d(0, 0, 0);
                transform:translate3d(0, 0, 0);
                -webkit-transition:-webkit-transform 0.25s cubic-bezier(0.05, 1.04, 0.72, 0.98);
                transition:transform 0.25s cubic-bezier(0.05, 1.04, 0.72, 0.98);
                z-index:1002;
                cursor:pointer;
                -webkit-user-select:none;
                -moz-user-select:none;
                -ms-user-select:none;
                user-select:none
            }
            .hamburger.is-active{
              background-color:none;
            }
            ._layer{
                background:#FFFFFF;
                margin-bottom:4px;
                border-radius:2px;
                width:28px;
                height:4px;
                opacity:1;
                -webkit-transform:translate3d(0, 0, 0);
                transform:translate3d(0, 0, 0);
                -webkit-transition:all 0.25s cubic-bezier(0.05, 1.04, 0.72, 0.98);
                transition:all 0.25s cubic-bezier(0.05, 1.04, 0.72, 0.98);
            }
            .hamburger:hover .-top{
                -webkit-transform:translateY(-100%);
                -ms-transform:translateY(-100%);
                transform:translateY(-100%);
            }
            .hamburger:hover .-bottom{
                -webkit-transform:translateY(50%);
                -ms-transform:translateY(100%);
                transform:translateY(100%);
                }
            .hamburger.is-active .-top{
                -webkit-transform:translateY(200%) rotate(45deg) !important;
                -ms-transform:translateY(200%) rotate(45deg) !important;
                transform:translateY(200%) rotate(45deg) !important;
            }
            .hamburger.is-active .-mid{
                opacity:0;
            }
            .hamburger.is-active .-bottom{
                -webkit-transform:translateY(-200%) rotate(135deg) !important;
                -ms-transform:translateY(-200%) rotate(135deg) !important;
                transform:translateY(-200%) rotate(135deg) !important;
            }
            
            .menuppal.is_active{
              transform: translate3d(0px, 0px, 0px);
            }
            .menuppal{
               background-color: #EF5030;
                bottom: 0;
                height: 100%;
                left: 0;
                position: fixed;
                top: 0;
                transform: translate3d(0px, -100%, 0px);
                transition: transform 0.35s cubic-bezier(0.05, 1.04, 0.72, 0.98) 0s;
                width: 70%;
                max-width: 300px;
                z-index: 1001;
                border-radius: 0 14px 14px 0;
            }
            .menuppal ul{
              margin:100px 10px 10px 10px;
              padding:0;
              width: 100%;
              position: absolute;
              left: -10px;
            }
            .menuppal ul li { 
              list-style: none;
              font-family: Verdadna, Arial, Helvetica;
              color: $nav-color-text;
              font-size: 1.5rem;
              line-height: 3em;
              height: 3em;
              text-transform: none;
              font-weight: bold;
              border-top: solid;
              border-color: #FFF8ED;
              padding-left: 10px
              
            }
            .menuppal ul li a{
              text-decoration: none;
              font-family: 'Roboto';
              font-style: normal;
              font-weight: 300;
              font-size: 20px;
              color: #FFFFFF;
            }
            .menuppal ul li a:hover{
              text-decoration:none;
              color:#333;
            }
            .logo{
              align-self: flex-end;
              margin: auto 20px;
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            }
            .cuenta-user{
              display: flex;
              position: relative;
              top: 400px;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .user-email{
              font-family: 'Roboto';
              font-style: normal;
              font-weight: 300;
              font-size: 14px;
              line-height: 16px;            
              text-align: center;
              color: #FFFFFF;
            }
            .cerrar-secion{
              font-family: 'Roboto';
              font-style: normal;
              font-weight: 800;
              font-size: 12px;
              line-height: 12px;
              border: none;
              background: none;
              color: white;
            }
            .cerrar-secion:hover {
              color: rgba(255, 255, 255, 1) !important;
              box-shadow: 0 4px 16px rgba(49, 138, 172, 1);
              transition: all 0.2s ease;
            }
          `;

      this.shadow.innerHTML = `
<div class="header">
<div class="hamburger">
	<div class="_layer -top"></div>
	<div class="_layer -mid"></div>
	<div class="_layer -bottom"></div>
</div>
<div class ="logo">
  <svg width="29" height="27" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.5294 5.26445C18.3126 4.74922 17.9524 4.37773 17.4876 4.19063L17.4813 4.18828C17.2698 4.10541 17.0445 4.06301 16.8173 4.06328H16.7923C15.7282 4.0793 14.6419 4.98359 14.0896 6.31367C13.6845 7.28633 13.638 8.33242 13.9653 9.11211C14.1817 9.62773 14.5427 9.99922 15.0095 10.1863L15.0146 10.1883C15.2261 10.2711 15.4514 10.3135 15.6786 10.3133C16.7528 10.3133 17.8505 9.40899 18.413 8.06133C18.813 7.08984 18.8571 6.04453 18.5294 5.26445ZM14.2778 11.0012C13.6642 10.6324 13.0841 10.2836 12.7052 9.65703C11.6599 7.92266 11.0286 6.87578 9.37354 6.87578C7.71846 6.87578 7.08564 7.92266 6.03799 9.65703C5.6583 10.2844 5.07705 10.6336 4.46143 11.0039C3.75557 11.4281 3.02627 11.8664 2.71143 12.7289C2.58903 13.0398 2.52737 13.3713 2.52979 13.7055C2.52979 15.1098 3.62354 16.2523 4.96729 16.2523C5.66064 16.2523 6.39854 16.0121 7.17939 15.7578C7.93018 15.5133 8.70635 15.2605 9.37744 15.2605C10.0485 15.2605 10.8228 15.5133 11.5708 15.7578C12.3501 16.0105 13.0845 16.2508 13.7798 16.2508C15.1216 16.2508 16.2134 15.1082 16.2134 13.7039C16.2145 13.3695 16.1515 13.038 16.0278 12.7273C15.713 11.8641 14.9833 11.4254 14.2778 11.0012ZM5.23291 5.50273C5.69775 6.08594 6.2876 6.40703 6.89385 6.40703C6.97661 6.40703 7.05926 6.40089 7.14111 6.38867C8.40557 6.20273 9.19346 4.65977 8.93486 2.87305C8.82666 2.12188 8.5376 1.42227 8.12354 0.903516C7.65947 0.321484 7.06885 0.000781268 6.46299 0.000781268C6.38023 0.000783921 6.29758 0.00692057 6.21572 0.0191407C4.95127 0.205078 4.16338 1.74805 4.42197 3.53477C4.52979 4.28477 4.81885 4.98359 5.23291 5.50273ZM11.6063 6.38867C11.6882 6.40089 11.7709 6.40703 11.8536 6.40703C12.4603 6.40703 13.0497 6.08594 13.5146 5.50273C13.9282 4.98359 14.2157 4.28477 14.3251 3.53398C14.5837 1.74805 13.7958 0.205078 12.5313 0.0183594C12.4495 0.0061393 12.3668 2.65273e-06 12.2841 0C11.6782 0.00078125 11.0876 0.321484 10.6235 0.903516C10.2095 1.42227 9.92041 2.12188 9.8126 2.87383C9.554 4.65977 10.3419 6.20273 11.6063 6.38867ZM3.73252 10.1883L3.73799 10.1863C4.204 9.99922 4.56455 9.62812 4.78057 9.11289C5.10791 8.33164 5.06182 7.28672 4.65752 6.31406C4.09775 4.96797 3.00049 4.06328 1.92744 4.06328C1.70021 4.06295 1.47494 4.10536 1.26338 4.18828L1.25791 4.19023C0.793067 4.37578 0.43252 4.74844 0.216505 5.26367C-0.110839 6.04492 -0.0647453 7.08984 0.339552 8.0625C0.899317 9.40859 1.99658 10.3133 3.06963 10.3133C3.29647 10.3135 3.52132 10.2711 3.73252 10.1883Z" fill="white"/>
  </svg>
</div>
<nav class="menuppal">
    <ul>
      <li>${iconoMisDatos}<a href="#" class="datos">Mis datos</a></li>
      <li>${iconoMisMascotas} <a href="#" class="mascotas">Mis mascotas</a></li>
      <li>${iconoReportar} <a href="#" class="reportar">Reportar mascota</a></li>
    </ul>
    <div class="cuenta-user">
      <p class="user-email">${this.email}</p>
      <button class="cerrar-secion">Cerrar Sesión</button>
    </div>
  </nav>
  </div>
      `;
      const patitaHome: any = this.shadow.querySelector(".logo");
      const menuBurguer: any = this.shadow.querySelector(".hamburger");
      const menuppal: any = this.shadow.querySelector(".menuppal");
      const misDatos: any = this.shadow.querySelector(".datos");
      const misMascotas: any = this.shadow.querySelector(".mascotas");
      const reportar: any = this.shadow.querySelector(".reportar");
      const cerrarSecion: any = this.shadow.querySelector(".cerrar-secion");

      //method;
      function toggleMenu(event) {
        this.classList.toggle("is-active");
        menuppal.classList.toggle("is_active");
        event.preventDefault();
      }

      // event
      menuBurguer.addEventListener("click", toggleMenu, false);

      //boton Home
      patitaHome.addEventListener("click", (e) => {
        e.preventDefault(), Router.go("/");
      });

      misDatos.addEventListener("click", (e) => {
        e.preventDefault();
        if (cs.token) {
          Router.go("/signup");
        } else {
          cs.ruta = "/signup";
          Router.go("/login");
        }
      });
      misMascotas.addEventListener("click", (e) => {
        e.preventDefault();
        if (cs.token) {
          Router.go("/misMascotas");
        } else {
          cs.ruta = "/misMascotas";
          Router.go("/login");
        }
      });
      reportar.addEventListener("click", (e) => {
        e.preventDefault();
        if (cs.token) {
          Router.go("/reportar");
        } else {
          cs.ruta = "/reportar";
          Router.go("/login");
        }
      });
      cerrarSecion.addEventListener("click", (e) => {
        e.preventDefault();
        this.email = "";
        if (cs.token) {
          cs.token = "";
          cs.email = "";
          cs.fullName = "";
          cs.userId = "";
          cs.ruta = "/";
          cs.myPets = [];
          state.setState(cs);
          location.reload();
          console.log("cerrado");
        } else {
          console.log("no hay user");
        }
      });

      this.shadow.appendChild(style);
    }
  }
  customElements.define("header-comp", HeaderComp);
}
