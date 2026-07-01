class NavBar extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = this.getTemplate();
    this.initLogic();

    await this.loadUser();
  }

  getTemplate(user = null) {
    return `
      <div class="overlay"></div>
      <div class="tab-section">
        <i class="fa-solid fa-bars menu-icon"></i>
        <img class="amazon-logo"
          src="amazon-images/amazon-logo-1.png"
          alt="Amazon-Logo">
        <p class="amazon-tlevel-team-logo">
          T-Level Team
        </p>
      </div>

      <div class="dropdown-menu">
        <a href="landing-page.html">Home</a>
        <a href="amazon-tlevel-explore.html">Explore Placements</a>
        <a href="">T-Level Community</a>
        <a href="student-reviews.html">Student Reviews</a>

        ${this.isAdmin ? `
          <a href="/dashboard" class="admin-link">
            Admin Dashboard
          </a>
        ` : ""}

        <div id="auth-section">
          ...
        </div>
      </div>
    `;
  }

  async loadUser() {
    try {
      const res = await fetch("http://localhost:5501/api/me", {
        credentials: "include"
      });

      if (!res.ok) {
        this.user = null;
        this.isAdmin = false;
        this.updateAuthUI();
        return;
      }

      const data = await res.json();
      this.user = data.user;

      // check admin status
      const adminRes = await fetch("http://localhost:5501/api/isadmin", {
        credentials: "include"
      });

      if (adminRes.ok) {
        const adminData = await adminRes.json();
        this.isAdmin = adminData.admin === true;
      } else {
        this.isAdmin = false;
      }

      this.innerHTML = this.getTemplate(this.user);
      this.initLogic();
      this.updateAuthUI();
    } catch (err) {
      this.user = null;
      this.isAdmin = false;
      this.updateAuthUI();
    }
  }

  updateAuthUI() {
    const dropdownMenu = this.querySelector(".dropdown-menu");
    const oldAuth = this.querySelector("#auth-section");

    if (!dropdownMenu) return;

    const temp = document.createElement("div");
    temp.innerHTML = `
      <div id="auth-section">
        ${
          this.user
            ? `
              <div class="user-box">
                <img class="profile-picture-icon" src="amazon-images/profile-picture-icon.png">
                <span>${this.user.username}</span>
                <button id="logoutBtn">Logout</button>
              </div>
            `
            : `
              <a class="register-interest-link" href="https://eu-north-1q4ytophb9.auth.eu-north-1.amazoncognito.com/login?client_id=26stabed70jpkmp5i4qkca4456&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A5501%2Fapi%2FcognitoCallback">
                <button class="register-interest">Register your Interest</button>
              </a>
            `
        }
      </div>
    `;

    if (oldAuth) {
      oldAuth.replaceWith(temp.firstElementChild);
    }

    this.attachAuthEvents();
  }

  attachAuthEvents() {
    const logoutBtn = this.querySelector("#logoutBtn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        await fetch("http://localhost:5501/api/logout", {
          method: "POST",
          credentials: "include"
        });

        this.user = null;
        this.updateAuthUI();
      });
    }
  }

  initLogic() {
    const menuIcon = this.querySelector('.menu-icon');
    const dropdownMenu = this.querySelector('.dropdown-menu');
    const overlay = this.querySelector('.overlay');
    const logo = this.querySelector('.amazon-logo');
    const teamLogo = this.querySelector('.amazon-tlevel-team-logo');

    [logo, teamLogo].forEach((el) => {
      el.addEventListener('click', () => {
        window.location.href = 'landing-page.html';
      });
    });

    menuIcon.addEventListener('click', () => {
      dropdownMenu.classList.toggle('open');
      overlay.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    overlay.addEventListener('click', () => {
      dropdownMenu.classList.remove('open');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  }
}

customElements.define('nav-bar', NavBar);