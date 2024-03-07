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
                            {/* <button type="submit">Compete!</button> */}
                            <div class ="popbox">
                                <a class="popbutton" href="#popup1">Compete!</a>
                            </div>
                            <div id="popup1" class="overlay">
                                <div class="popup">
                                    <h2>4 Pannel Comics</h2>
                                    <a class="close" href="#">&times;</a>
                                    <div class="content">
                                        <p>A picture is worth a thousand words. What can you say in four?
                                        Tell us your four pannel story! </p>
                                        <button type="submit">Image Upload Placeholder</button>
                                    </div>
                                </div>
                            </div>
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
                            {/* <button type="submit">Compete!</button> */}
                            <div class ="popbox">
                                <a class="popbutton" href="#popup2">Compete!</a>
                            </div>
                            <div id="popup2" class="overlay">
                                <div class="popup">
                                    <h2>Character Design</h2>
                                    <a class="close" href="#">&times;</a>
                                    <div class="content">
                                        <p>Dive into the depths of your creativity and bring 
                                            forth a character that resonates with you. 
                                            Consider their appearance, quirks, and backstory, 
                                            allowing their personality to shine through. </p>
                                        <button type="submit">Image Upload Placeholder</button>
                                    </div>
                                </div>
                            </div>
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
                            {/* <button type="submit">Compete!</button> */}
                            <div class ="popbox">
                                <a class="popbutton" href="#popup3">Compete!</a>
                            </div>
                            <div id="popup3" class="overlay">
                                <div class="popup">
                                    <h2>Wizard April</h2>
                                    <a class="close" href="#">&times;</a>
                                    <div class="content">
                                        <p> Let Wizard April ignite your creativity, 
                                            as you delve into the realms of fantasy, 
                                            weaving spells with your brush or pen to bring 
                                            captivating tales of sorcery and wonder to life 
                                            on canvas or paper. Don your wizard's hat, 
                                            wield your artistic wand, and embark on an 
                                            enchanting adventure that will leave a lasting 
                                            mark on both your artistry and imagination.</p>
                                        <button type="submit">Image Upload Placeholder</button>
                                    </div>
                                </div>
                            </div>
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
                            {/* <button type="submit">Compete!</button> */}
                            <div class ="popbox">
                                <a class="popbutton" href="#popup4">Compete!</a>
                            </div>
                            <div id="popup4" class="overlay">
                                <div class="popup">
                                    <h2>Figuary Month</h2>
                                    <a class="close" href="#">&times;</a>
                                    <div class="content">
                                        <p> Embrace the challenge of capturing dynamic poses, 
                                            expressing emotion, and refining your artistic skills 
                                            alongside a supportive community of fellow creators. 
                                            Let Figuary inspire you to push your boundaries, 
                                            hone your craft, and unleash your creativity as you 
                                            embark on this captivating journey of artistic growth and 
                                            discovery.</p>
                                        <button type="submit">Image Upload Placeholder</button>
                                    </div>
                                </div>
                            </div>
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