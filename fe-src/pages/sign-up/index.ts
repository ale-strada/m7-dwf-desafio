import { Router } from "@vaadin/router";
import { state } from "../../state";

class SignupPage extends HTMLElement {
  connectedCallback() {
    const cs = state.getState();
    state.subscribe(() => {
      const cs = state.getState();
      this.render();
    });
    this.render();
  }
  addListenerts() {
    const cs = state.getState();
    const form: any = document.querySelector(".form");

    if (cs.token) {
      form.fullName.value = cs.fullName;
      form.email.value = cs.email;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target: any = e.target;
      if (target.password.value === target.confirmpassword.value) {
        const cs = state.getState();
        let password = target.password.value;
        cs.fullName = target.fullName.value;
        cs.email = target.email.value;
        state.setState(cs);
        if (cs.token) {
          state.updateUser(password);
          alert("Mudificacion guardada!");
          Router.go("/");
        } else {
          state.signUp(password, () => {
            state.logIn(password, (err) => {
              if (err) {
                console.log("hubo un error en el signIn");
              } else {
                alert("Usuario creado con éxito!");
                Router.go("/");
              }
            });
          });
        }
      } else {
        console.log("no coincide la contraseña con la confirmacion");
        alert("error en la contraseña");
      }
    });

    const togglePassword: any = document.querySelector("#togglePassword");
    const password: any = document.querySelector("#id_password");
    const passwordConfirm: any = document.querySelector("#id_password-confirm");

    togglePassword.addEventListener("click", function (e) {
      e.preventDefault();

      // toggle the type attribute
      const type =
        password.getAttribute("type") === "password" ? "text" : "password";
      const type2 =
        password.getAttribute("type") === "password" ? "text" : "password";
      password.setAttribute("type", type);
      passwordConfirm.setAttribute("type", type2);
      // toggle the eye slash icon
      this.classList.toggle("fa-eye-slash");
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
    }
      }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <header-comp></header-comp>
    <title-comp>Mis datos</title-comp>
    <form class="form caja">
        
            <label class="input-box">
                <input class="input" type="text"name="fullName" placeholder="Introduce tu nombre">
            </label>

            <label class="input-box">
                <input class="input" type="email" name="email" placeholder="Introduce tu email" >
            </label>
           
            <label class="input-box">
              <input class="input" type="password" name="password" id="id_password" autocomplete="off" placeholder="Introduce tu contraseña">
              <i class="far fa-eye fa-eye-slash" id="togglePassword" style="margin-left: -30px; cursor: pointer;"></i>
            </label>

            <label class="input-box">
              <input class="input" type="password" name="confirmpassword" id="id_password-confirm" autocomplete="off" placeholder="Repetir contraseña">
            </label>
       
        <button class="button">Guardar</button>
    </form>
    `;
    this.addListenerts();
  }
}

customElements.define("signup-page", SignupPage);
