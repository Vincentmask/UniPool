class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <div class="topnav">
      <a class="active" href="/index.html">Home</a>
      <!-- <a href="#Classes">Classes</a> -->
      <div class="dropdown">
        <button class="dropbtn">
          Tools
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a href="/Resources.html">Resources</a>
          <a href="/Campus Map.html">Campus Map</a>
          <a href="/Schoolarships.html">Schoolarships</a>
          <a href="/On-campus Jobs.html">On-campus Jobs</a>
        </div>
      </div>
      <a href="#">About Us</a>
    </div>
    `;
  }
}

customElements.define('header-component', Header);
