export class RegisterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
      <link rel="stylesheet" href="../../css/register.css">
      <div class="register-container">
        <h2>Crear cuenta</h2>
        <form class="register-form">
            <div class="columna">
                <div class="form-group">
                    <label for="identificacion">Número de identificación</label>
                    <input type="text" id="identificacion" name="identificacion" placeholder="Ingresa tu número de identificación" required />
                </div>

                <div class="form-group">
                    <label for="nombre">Nombre completo</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Ingresa tu nombre completo" required />
                </div>

                <div class="form-group">
                    <label for="nacionalidad">Nacionalidad</label>
                    <input type="text" id="nacionalidad" name="nacionalidad" placeholder="Ej: Colombiana" required />
                </div>
            </div>
            <div class="columna">
                <div class="form-group">
                    <label for="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" placeholder="Ingresa tu correo" required />
                </div>

                <div class="form-group">
                    <label for="telefono">Teléfono</label>
                    <input type="tel" id="telefono" name="telefono" placeholder="Ingresa tu número de contacto" required />
                </div>

                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" placeholder="Crea una contraseña" required />
                </div>
            </div>
          <button type="submit" class="btn-register">Registrarme</button>
        </form>

        <p class="login-text">
          ¿Ya tienes una cuenta? <a href="../../pages/login.html" id="goToLogin">Inicia sesión</a>
        </p>
      </div>
    `;
  }
}

customElements.define("register-component", RegisterComponent);
