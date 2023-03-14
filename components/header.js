class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style="background-color: #03b680"
      ;
    >
      <a class="navbar-brand" href="/UniPool/index.html">
        <img src="/images/logo-no-background.png" height="50" width="50" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/UniPool/index.html">Home </a>
          <li class="nav-item">
            <a class="nav-link" href="/UniPool/src/Events.html">Events</a>
          </li>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/UniPool/src/Resources.html">Resources</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/UniPool/src/Campus Map.html">Campus Map</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/UniPool/src/Scholarships.html">Scholarships</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/UniPool/src/On-campus Jobs.html"
              >On-campus Jobs</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/UniPool/src/about.html">About Us</a>
          </li>
        </ul>
      </div>
    </nav>

    `;
  }
}

customElements.define('header-component', Header);

// <div class='dropdown'>
//   <button class='dropbtn'>
//     Tools
//     <i class='fa fa-caret-down'></i>
//   </button>
//   <div class='dropdown-content'>
//     <a href='/Resources.html'>Resources</a>
//     <a href='/Campus Map.html'>Campus Map</a>
//     <a href='/Schoolarships.html'>Schoolarships</a>
//     <a href='/On-campus Jobs.html'>On-campus Jobs</a>
//   </div>
// </div>;

/* <div class='topnav'>
  <img src='/images/logo-no-background.png' alt='Test' height='50' width='50' />
  <a class='active' href='/index.html'>
    Home
  </a>
  <a href='/Resources.html'>Resources</a>
  <a href='/Campus Map.html'>Campus Map</a>
  <a href='/Schoolarships.html'>Schoolarships</a>
  <a href='/On-campus Jobs.html'>On-campus Jobs</a>
  <a href='#'>About Us</a>
</div>; */
