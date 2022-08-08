import { Router } from "@vaadin/router";
import { state } from "../../state";

class LoginPage extends HTMLElement {
  connectedCallback() {
    const cs = state.getState();
    this.render();
  }
  addListenerts() {
    const cs = state.getState();
    const form: any = document.querySelector(".form");
    const togglePassword: any = document.querySelector("#togglePassword");
    const password: any = document.querySelector("#id_password");
    const signupLink: any = document.querySelector(".signup");
    const errorMessage: any = document.querySelector(".error-message");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const cs = state.getState();
      const target: any = e.target;
      cs.email = target.email.value;
      state.setState(cs);
      state.logIn(target.password.value, () => {
        if (cs.token === "bearer email or pass incorrect") {
          password.classList.add("incorrect");
          errorMessage.classList.remove("none");
        } else {
          Router.go(cs.ruta);
          state.me();
        }
      });
    });

    togglePassword.addEventListener("click", function (e) {
      // toggle the type attribute
      const type =
        password.getAttribute("type") === "password" ? "text" : "password";

      password.setAttribute("type", type);

      // toggle the eye slash icon
      this.classList.toggle("fa-eye-slash");
    });

    signupLink.addEventListener("click", (e) => {
      e.preventDefault();
      Router.go("/signup");
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
        margin: 0px auto;
      }
      .input{
        border: 1px solid #108896;
        border-radius: 14px;
        width: 340px;
        height: 50px;
        font-family: 'Roboto';
        font-weight: 700;
        font-size: 16px;
        align-items: center;
        padding: 15px;
      }
      .incorrect{
        border: 1px solid #FF0101;
      }
      .incorrect::placeholder{
        color: #FF0101;
      }
      ::placeholder {
        color: #108896;

      }
      .input-box{
        margin-top: 25px;
      }
      .button{
        width: 340px;
        height: 50px;
        background: #108896;
        border: 1px solid #108896;
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
    .texto{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        text-align: center;
        color: rgba(0, 0, 0, 0.38);
        margin: 25px;
    }
    .azul{
        color: #108896;
    }
    .azul:hover {
      text-decoration: underline;
      cursor:pointer;
    }
    .error-message{
        font-family: 'Roboto';
        font-style: normal;
        font-size: 10px;
        color: #FF0101;
        margin: 3px 25px;
        align-self: flex-start;
    }
    .none{
        display:none;
    }
    }
      }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <header-comp></header-comp>
    <title-comp>Entrar en mi cuenta</title-comp>
    <form class="form caja">
        
            <label class="input-box">
                <input class="input" type="email" name="email" placeholder="Introduce tu email" >
            </label>
           
            <label class="input-box pass">
              <input class="input" type="password" autocomplete="off" name="password" id="id_password" placeholder="Introduce tu contraseña">
              <i class="far fa-eye fa-eye-slash" id="togglePassword" style="margin-left: -30px; cursor: pointer;"></i>
            </label>
            <span class ="error-message none">Contraseña incorrecta</span>

        <button class="button">Enviar</button>
    </form>
    <p class="sin-cuenta texto">¿No tienes cuenta? <span class="signup azul">Regístrate</span></p>
    <p class="sin-pass texto azul">Olvidé mi contraseña</span></p>

    `;
    this.addListenerts();
  }
}

customElements.define("login-page", LoginPage);
