export class LoginComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
      <link rel="stylesheet" href="../../css/login.css">

      <div class="login-container">
        <h2>Iniciar sesión</h2>
        <form class="login-form">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input type="text" id="username" name="username" placeholder="Tu usuario" required>
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" placeholder="Tu contraseña" required>
          </div>

          <button type="submit" class="btn-login">Iniciar sesión</button>

          <p class="register-text">
            ¿No tienes cuenta?
            <a href="#" id="register-link">Regístrate aquí</a>
          </p>
        </form>
      </div>
    `;
  }
}

customElements.define("login-component", LoginComponent);
