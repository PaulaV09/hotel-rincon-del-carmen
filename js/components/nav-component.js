export class NavComponent extends HTMLElement {
  constructor() {
    super();
    // Opcional: Si quieres usar Shadow DOM para encapsular estilos, descomenta la línea de abajo.
    // this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    // setTimeout es una pequeña "trampa" para asegurarnos de que el HTML esté completamente
    // en el DOM antes de intentar buscar elementos para los listeners.
    setTimeout(() => {
      this.handleScroll();
      this.handleMenu();
      this.handleLogout();
      // Opcional: Si usas Shadow DOM, los querySelectors deben apuntar a this.shadowRoot
      // Ejemplo: this.handleScroll(this.shadowRoot);
    }, 0);
  }

  // Desconectamos el listener de scroll al remover el componente
  disconnectedCallback() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  // Guardamos la referencia a la función para poder removerla en disconnectedCallback
  scrollHandler = () => {
    const nav = this.querySelector(".navbar");
    if (!nav) return; // Protección si el elemento no se encuentra

    // Usamos 'scrolled' como una clase de estado
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };

  handleScroll() {
    window.addEventListener("scroll", this.scrollHandler);
  }

  handleMenu() {
    const toggle = this.querySelector(".menu-toggle");
    const menu = this.querySelector(".mobile-menu");

    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        toggle.classList.toggle("is-open"); // Clase para animar el icono (si es un 'x')
      });

      // Extra: Cerrar el menú al hacer clic en un enlace (Mobile UX)
      menu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
              menu.classList.remove('active');
              toggle.classList.remove('is-open');
          });
      });
    }
  }

  handleLogout() {
    // Buscamos todos los botones de logout (uno en el dropdown y uno en el mobile-menu)
    const logoutBtns = this.querySelectorAll("#logout");

    logoutBtns.forEach(logoutBtn => {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del 'a'
        localStorage.removeItem("userName");
        location.reload(); // Recarga para mostrar el nav de no logueado
      });
    });
  }

  render() {
    const user = localStorage.getItem("userName");

    this.innerHTML = /* html */ `
      <link rel="stylesheet" href="../../css/nav.css">
      <nav class="navbar">
        <div class="logo">Hotel Rincón del Mar</div>

        <div class="nav-links">
          <a href="index.html">Inicio</a>
          <a href="reservas.html">Reservas</a>
          <a href="contacto.html">Contacto</a> </div>

        ${
          user
            ? `
            <div class="user-menu">
              <span>Hola, ${user.split(' ')[0]} 👋</span>
              <div class="dropdown">
                <a href="#">Mi perfil</a>
                <a href="#" id="logout">Cerrar sesión</a>
              </div>
            </div>
            `
            : `
            <div class="auth-buttons">
              <button class="btn btn-login" onclick="location.href='login.html'">Login</button>
              <button class="btn btn-register" onclick="location.href='registro.html'">Registro</button>
            </div>
            `
        }

        <div class="menu-toggle" aria-label="Abrir menú">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
      </nav>

      <div class="mobile-menu">
        <a href="index.html">Inicio</a>
        <a href="reservas.html">Reservas</a>
        <a href="contacto.html">Contacto</a>
        ${
          user
            ? `<a href="#" id="logout">Cerrar sesión</a>`
            : `<a href="login.html">Login</a>
               <a href="registro.html">Registro</a>`
        }
      </div>
    `;
  }
}

customElements.define("nav-component", NavComponent);