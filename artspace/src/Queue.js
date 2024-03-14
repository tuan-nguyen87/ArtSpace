// Queueing system page
// for ideas

import React from "react";
import "./styles/Queue.css";
import {ProgressBar} from "./ProgressBarArtist"

const Queue = () => {
    const progBarArtist = () => {
        return (
            <div>
                <ProgressBar />
            </div>
        )
    }

    const queueList = (queueTitle, queueCompleteDate) => {
        return (
            <li class="queue-listing">
                <div class="queue-title-date-container">
                    <label class="queue-title">{queueTitle}</label>
                    <br></br>
                    <label class="queue-complete-date">{queueCompleteDate}</label>
                </div>
                <div class="queue-progress-bar">
                    {progBarArtist()}
                </div>
            </li>
        )
    }

    const testing = "Anime Drawing"

    return (
        <div class="queue-container"> 
            <ul>
                {queueList(testing, "May 10, 2024")}
                {queueList("Portrait of Me", "August 10, 2025")}
                {queueList("Pikachu", "December 1, 2024")}
                {queueList("School Building AI", "June 25, 2025")}
                {queueList("AI Generated", "May 4th, 2024")}
            </ul>
        
        
        </div>


    );
}

export default Queue