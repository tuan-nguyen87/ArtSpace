import React, {useState, useEffect} from "react";
import "./DailyChallenge.css";

const DailyChallenge = () => {

    return(
        <div className="challenge-container">
            <div class="prompt-topics">
                <button type="submit" class="pBtns" id="environment-btn">Environment</button>
                <button type="submit" class="pBtns" id="char-btn">Character</button>
                <button type="submit" class="pBtns" id="creature-btn">Creature</button>
                <button type="submit" class="pBtns" id="obj-btn">Object</button>
            </div>
            <div class="prompt-box">
                <h1>Challenge of the Day</h1>
                <p id="prompt"></p>
                <br/>
                <button id="new-prompt">New Challenge</button>
            </div>
            <script src="challenge.js"></script>
        </div>
    ); 
};

export default DailyChallenge;