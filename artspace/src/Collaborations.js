import React from "react";
import ProgressBarArtist from "./ProgressBarArtist"
import ProgressBarClient from "./ProgressBarClient"
import "./styles/Collaborations.css";

const Collaborations = () => {
    return (
        <div class="collab-container">
            <div class="collab-header-container">
                <div class="collab-top-nav">
                    <span class="profile-sect">Profile</span>
                    <span>|</span>
                    <span class="collab-sect">Collaborations</span>
                </div>
                <div class="search-container">
                    <button type="filter" class="collab-filter-btn">Filter</button>
                    <input type="text" class="collab-search-bar" placeholder="Search..." />
                    <button type="submit" class="collab-search-btn">Submit</button>
                </div>
                <div class="update-container">
                </div>
            </div>
            <div class="collab-cluster-container">
                <div class="collab-listing-container">
                    <ul>
                        <li class="collab-listing collab-selected">
                            <div class="collab-title-date-container">
                                <h1 class="collab-title">Art and Friends</h1>
                                <h2 class="date-created">May 7th, 2024</h2>
                            </div>
                            <div class="collab-progress-bar">
                                ==Progress Bar==
                            </div>
                            <div class="pfp collab-listing-pfp"></div>
                            <div class="pfp collab-listing-pfp"></div>

                        </li>
                        <li class="collab-listing">
                            <div class="collab-title-date-container">
                                <h1 class="collab-title">Draw Together</h1>
                                <h2 class="date-created">May 7th, 2024</h2>
                            </div>
                            <div class="collab-progress-bar">
                                ==Progress Bar==
                            </div>
                            <div class="pfp collab-listing-pfp"></div>
                        </li>
                        <li class="collab-listing">
                            <div class="collab-title-date-container">
                                <h1 class="collab-title">Wedding for Emily</h1>
                                <h2 class="date-created">May 7th, 2024</h2>
                            </div>
                            <div class="collab-progress-bar">
                                ==Progress Bar==
                            </div>
                            <div class="pfp collab-listing-pfp"></div>
                            <div class="pfp collab-listing-pfp"></div>
                            <div class="pfp collab-listing-pfp"></div>

                        </li>
                        <li class="collab-listing">
                            <div class="collab-title-date-container">
                                <h1 class="collab-title">Birthday Gift</h1>
                                <h2 class="date-created">May 7th, 2024</h2>
                            </div>
                            <div class="collab-progress-bar">
                                ==Progress Bar==
                            </div>
                            <div class="pfp collab-listing-pfp"></div>
                            <div class="pfp collab-listing-pfp"></div>
                            <div class="pfp collab-listing-pfp"></div>
                            <div class="pfp collab-listing-pfp"></div>
                        </li>
                        <li class="collab-listing">
                            <div class="collab-title-date-container">
                                <h1 class="collab-title">Doodling for fun</h1>
                                <h2 class="date-created">May 7th, 2024</h2>
                            </div>
                            <div class="collab-progress-bar">
                                ==Progress Bar==
                            </div>
                            <div class="pfp collab-listing-pfp"></div>
                            <div class="pfp collab-listing-pfp"></div>
                            <div class="pfp collab-listing-pfp"></div>
                            <div class="pfp collab-listing-pfp"></div>

                        </li>
                    </ul>
                </div>
                <div class="collab-info-container">
                    <div class="collab-info">
                        <h1 class="collab-info-title bottom-border">
                            Art and Friends
                        </h1>
                        <div class="collab-info-artists-container bottom-border">
                            <div></div>
                            <div>
                                <div class="pfp collab-info-artist-pfp"></div>
                                <div>======</div>
                            </div>
                            <div>
                                <div class="pfp collab-info-artist-pfp"></div>
                                <div>======</div>
                            </div>
                            <div>
                                <div class="pfp collab-info-artist-pfp"></div>
                                <div>======</div>
                            </div>
                            <div>
                                <div class="pfp collab-info-artist-pfp"></div>
                                <div>======</div>
                            </div>
                            <div></div>
                        </div>
                        <p class="collab-info-description bottom-border">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <div class="collab-info-preview bottom-border">
                            <img src="images/zelda.jpg"></img>
                        </div>
                        <div class="collab-info-client-container">
                            <div class="pfp">
                                
                            </div>
                            <div class="collab-info-client-rating">
                                <span class="collab-info-client-name">
                                    Amy
                                </span>
                                <div class="collab-client-rating">
                                    * * * *
                                </div>
                            </div>
                            <span class="collab-info-date">
                                Date Posted: May 7th, 2024
                            </span>
                        </div>
                        <div class="collab-button-container">
                            <button>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="commissions-footer">
                <div class="commissions-footer-border"></div>
                <div class="commissions-pagination">
                <a href="#">&laquo;</a>
                <a class="commissions-page-active" href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>       
                <a href="#">&raquo;</a> 
                </div>
            </div>
        </div>
    );
}

export default Collaborations;