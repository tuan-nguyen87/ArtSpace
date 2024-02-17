import React, {useState, useEffect} from "react";
import "./styles/ArtistArena.css";

const ArtistArena = () => {

    return(
        <div className="arena-bg">
            <div class="arena-container">
                <div class="section-label">
                    <h3>This Week</h3>
                    <div class="card"> 
                        <img class="card-image" src="/public/images/4-Panel-Life.png"/>
                        <h3>4 Panel Comic</h3>
                        <div class="card-content">
                            <p>Date</p>
                            <p>Time</p>
                            <button type="submit">Compete!</button>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-image" src="/public/images/Char-Design.png"/>
                        <div class="card-header">
                            <h3>Character Design</h3>
                        </div>
                        <div class="card-content">
                            <p>Date</p>
                            <p>Time</p>
                            <button type="submit">Compete!</button>
                        </div>
                    </div>
                </div>
                <div class="section-label">
                    <h3>Upcoming</h3>
                    <div class="card">
                        <img class="card-image" src="/public/images/WIZARD.png"/>
                        <div class="card-header">
                            <h3>Wizard April</h3>
                        </div>
                        <div class="card-content">
                            <p>Join the Wizard April event and showcase your creativity!</p>
                            <p>Date</p>
                            <button type="submit">Compete!</button>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-image" src="/public/images/dynamic-figures.png"/>
                        <div class="card-header">
                            <h3>Figuary Month</h3>
                        </div>
                        <div class="card-content">
                            <p>Winners and best art from Figuary month.</p>
                            <p>Date</p>
                            <button type="submit">Compete!</button>
                        </div>
                    </div>
                </div>
                <div class="section-label">
                    <h3>Winners</h3>
                    <div class="card">
                        <img class="card-image" src="/public/images/best-comic.png"/>
                        <div class="card-header">
                            <h3>Best Comics</h3>
                        </div>
                        <div class="card-content">
                            <p>Description</p>
                            <button type="submit">View!</button>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-image" src="/public/images/design.jpg"/>
                        <div class="card-header">
                            <h3>Best Design</h3>
                        </div>
                        <div class="card-content">
                            <p>Description</p>
                            <button type="submit">View!</button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    ); 
};

export default ArtistArena;