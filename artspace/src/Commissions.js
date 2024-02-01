import React from "react"
import "./styles/Commissions.css"
function Commissions() {
    return (
        <div>
            <div class="navbar">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div class="commissions-header">
                <div class="section">
                    <span class="explore-sect">Explore</span>
                    <span>|</span>
                    <span class="commissions-sect">
                        Commission Listings
                    </span>
                </div>
                <div class="searchbar">
                    <input type="text" placeholder="Search..." />
                    <button type="submit">Go</button>
                </div>
                <div class="create">

                </div>
            </div>
            <div class="commissions-cluster">
                <div class="commissions-list">
                    <ul>
                        <li class="commissions-listing commissions-selected">
                            <div>
                                <h1 class="commission-title">Commission 1</h1>
                                <h2 class="date-created">May 7th, 2024</h2>
                            </div>
                            <div class="pfp"></div>
                        </li>
                        <li class="commissions-listing">
                            <div>
                                <h1 class="commission-title">Commission 2</h1>
                                <h2 class="date-created">May 7th, 2024</h2>
                            </div>
                            <div class="pfp"></div>
                        </li>
                        <li class="commissions-listing">
                            <div>
                                <h1 class="commission-title">Commission 3</h1>
                                <h2 class="date-created">May 7th, 2024</h2>
                            </div>
                            <div class="pfp"></div>                        
                        </li>
                        <li class="commissions-listing">
                            <div>
                                <h1 class="commission-title">Commission 4</h1>
                                <h2 class="date-created">May 7th, 2024</h2>
                            </div>
                            <div class="pfp"></div>
                        </li>
                        <li class="commissions-listing">
                            <div>
                                <h1 class="commission-title">Commission 5</h1>
                                <h2 class="date-created">May 7th, 2024</h2>
                            </div>
                            <div class="pfp"></div>
                        </li>
                    </ul>
                </div>
                <div class="commissions-info-block">
                    <div class="commissions-info">

                    </div>
                </div>
            </div>

        </div>
    )
}


export default Commissions