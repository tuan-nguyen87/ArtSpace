// import React, {useState, useEffect} from "react";
import "./styles/ArtistArena.css";

const ArtistArena = () => {

    return(
        <div className="arena-bg">
            <div class="arena-container">
                <div className="arena-section-header">
                    Interact | Artist Arena
                </div>

                <div class="section-label">
                    <div className="timeframe-line-top"></div>
                    <h3>This Week</h3>
                    <div className="timeframe-line-bottom"></div>
                    <div class="card"> 
                        <img class="card-image" src="/Arena art/4-Panel-Life.png" alt=""/>
                        <h3>4 Panel Comic</h3>
                        <div class="card-content">
                            <p>Tell a story in 4 pictures!</p>
                            <p>Date</p>
                            <p>Time</p>
                            <button type="submit">Compete!</button>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-image" src="/Arena art/Char-Design.png" alt=""/>
                        <div class="card-header">
                            <h3>Character Design</h3>
                        </div>
                        <div class="card-content">
                            <p>What OC's can you make?</p>
                            <p>Date</p>
                            <p>Time</p>
                            <button type="submit">Compete!</button>
                        </div>
                    </div>
                </div>
                <div class="section-label">
                    <div className="timeframe-line-top"></div>
                    <h3>Upcoming</h3>
                    <div className="timeframe-line-bottom"></div>
                    <div class="card">
                        <img class="card-image" src="/Arena art/WIZARD.png" alt=""/>
                        <div class="card-header">
                            <h3>Wizard April</h3>
                        </div>
                        <div class="card-content">
                            <p>Showcase the magic of your creativity!</p>
                            <p>Date</p>
                            <p>Time</p>
                            <button type="submit">Compete!</button>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-image" src="/Arena art/dynamic-figures.png" alt=""/>
                        <div class="card-header">
                            <h3>Figuary Month</h3>
                        </div>
                        <div class="card-content">
                            <p>It's all about dynamics! Figures in motion</p>
                            <p>Date</p>
                            <p>Time</p>
                            <button type="submit">Compete!</button>
                        </div>
                    </div>
                </div>
                <div class="section-label">
                    <div className="timeframe-line-top"></div>
                    <h3>Winners</h3>
                    <div className="timeframe-line-bottom"></div>
                    <div class="card">
                        <img class="card-image" src="/Arena art/best-comic.png" alt=""/>
                        <div class="card-header">
                            <h3>Best Comics</h3>
                        </div>
                        <div class="card-content">
                            <p>This cycles voted best comic artists!</p>
                            <button type="submit">View!</button>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-image" src="/Arena art/design.jpg" alt=""/>
                        <div class="card-header">
                            <h3>Best Design</h3>
                        </div>
                        <div class="card-content">
                            <p>This cycles voted best design artists!</p>
                            <button type="submit">View!</button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    ); 
};

export default ArtistArena;