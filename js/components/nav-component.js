export class NavComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    setTimeout(() => {
      this.handleScroll();
      this.handleMenu();
      this.handleLogout();
    }, 0);
  }

  disconnectedCallback() {
    window.removeEventListener("scroll", this.scrollHandler);
  }

  scrollHandler = () => {
    const nav = this.querySelector(".navbar");
    if (!nav) return; 

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
        toggle.classList.toggle("is-open"); 
      });

      menu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
              menu.classList.remove('active');
              toggle.classList.remove('is-open');
          });
      });
    }
  }

  handleLogout() {
    const logoutBtns = this.querySelectorAll("#logout");

    logoutBtns.forEach(logoutBtn => {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault(); 
        localStorage.removeItem("userName");
        location.reload();
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