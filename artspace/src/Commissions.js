import React from "react";
import "./styles/Commissions.css";
function Commissions() {
  return (
    <div class="commissions-container">
      <div class="commissions-header">
        <div class="commissions-top-navigator">
          <span class="explore-sect">Explore</span>
          <span>|</span>
          <span class="commissions-sect">Commission Listings</span>
        </div>
        <div className="search-bar commissions-search">
          <input type="text" placeholder="Search..." />
          <button type="submit"></button>
        </div>
        <div class="create"></div>
      </div>
      <div class="commissions-cluster">
        <div class="commissions-listing-container">
          <ul>
            <li class="commissions-listing commissions-selected">
              <div>
                <h1 class="commission-title">Commission 1</h1>
                <h2 class="date-created">May 7th, 2024</h2>
              </div>
              <div class="pfp commissions-listing-pfp"></div>
            </li>
            <li class="commissions-listing">
              <div>
                <h1 class="commission-title">Commission 2</h1>
                <h2 class="date-created">May 7th, 2024</h2>
              </div>
              <div class="pfp commissions-listing-pfp"></div>
            </li>
            <li class="commissions-listing">
              <div>
                <h1 class="commission-title">Commission 3</h1>
                <h2 class="date-created">May 7th, 2024</h2>
              </div>
              <div class="pfp commissions-listing-pfp"></div>
            </li>
            <li class="commissions-listing">
              <div>
                <h1 class="commission-title">Commission 4</h1>
                <h2 class="date-created">May 7th, 2024</h2>
              </div>
              <div class="pfp commissions-listing-pfp"></div>
            </li>
            <li class="commissions-listing">
              <div>
                <h1 class="commission-title">Commission 5</h1>
                <h2 class="date-created">May 7th, 2024</h2>
              </div>
              <div class="pfp commissions-listing-pfp"></div>
            </li>
          </ul>
        </div>
        <div class="commissions-info-container">
          <div class="commissions-info">
              <h1 class="commissions-info-title bottom-border">
                Commission 1
              </h1>   
              <p className="commissions-info-description bottom-border">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="commissions-info-arttype bottom-border">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <div className="commissions-info-client-container">
                <div className="pfp">

                </div>
                <div className="commissions-info-client-rating">
                  <span className="commissions-info-client-name">
                    Alex
                  </span>
                  <div className="commissions-info-rating">
                    * * * * *
                  </div>
                </div>
                <span className="commissions-info-date">
                  Date Posted: May 7th, 2024
                </span>
              </div>
              <div className="commissions-button-container">
                <button>Apply</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commissions;
