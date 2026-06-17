class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
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
        <a href="">T-Level Guide</a>
        <a href="">Student Reviews</a>
        <button class="register-interest">Register your Interest</button>
      </div>

      <div class="navigation">
        <input class="navigation-bar" type="text"
          placeholder="Search for placements by title or keyword">
        <button class="search-button">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        
      </div>
    `;

    this.initLogic();
  }

  initLogic() {
    const menuIcon = this.querySelector('.menu-icon');
    const dropdownMenu = this.querySelector('.dropdown-menu');
    const overlay = this.querySelector('.overlay');

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

    const tlevelOptionsIcon = this.querySelector('.tlevels-info');
    const tleveldropdownMenu = this.querySelector('#t-level-dropdownMenu');

    if (tlevelOptionsIcon && tleveldropdownMenu) {
      tlevelOptionsIcon.addEventListener('click', () => {
        tleveldropdownMenu.classList.toggle('open');
      });

      document.addEventListener('click', (event) => {
        if (
          !tleveldropdownMenu.contains(event.target) &&
          !tlevelOptionsIcon.contains(event.target)
        ) {
          tleveldropdownMenu.classList.remove('open');
        }
      });
    }
  }
}

customElements.define('nav-bar', NavBar);
