import React from "react";

import "./sidebar.css";
import bgLogo from "./bg_icon.jpg";
function Sidebar() {
  return (
    <div>
      <nav id="sidebar">
        <div className="sidebar-header">
          {/* <!-- <div className="text-center logo-section"> <img alt="logo-img" width="100px" src="/assets/bg.png"></div> --> */}
          <div className="logo-icon">
            <img alt="logo-img" width="50px" src={bgLogo} />
          </div>
          <ul>
            <li>
              <a href="#">Dashboard</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
