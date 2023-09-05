import React from "react";
import "./Header.css";
import adminLogo from "../../assets/psc-user-pro.svg";
import logoutLogo from "../../assets/psc-logout.png";
import bgLogo from "../../assets/bg.png";
function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarSupportedContent"
          >
            <div className="logo-icon mr-auto">
            <img alt="logo-img" src={bgLogo} />
          </div>
            {/* <ul className="nav navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link admin-img" href="#">
                  <img alt="user-img" width="40px" src={adminLogo} /> Admin
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link logout-img" href="#">
                  <img alt="logout-img" width="30px" src={logoutLogo} /> Logout
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
