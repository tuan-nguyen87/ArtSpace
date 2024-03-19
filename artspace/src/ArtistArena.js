//import React, { useState } from 'react';
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
                            {/* Will find a better way to implement due date in future */}
                            {/* <button type="submit">Compete!</button> */}
                            {/* I've changed the button to a popup */}
                            <div class ="popbox">
                                <a class="popbutton" href="#popup1">Compete!</a>
                            </div>
                            <div id="popup1" class="overlay">
                                <div class="popup">
                                    <div class="left-content">
                                        <img class="popimages" src="/Arena art/4-Panel-Life.png" />
                                        <p>Date: Mar 9, 2024</p>
                                        <p>1st Prize: <img src="/Market art/coin.png" className="coin" alt="Coin" /> Some #</p>
                                    </div>
                                    <a class="close" href="#">&times;</a>
                                    <div class="content">
                                        <h2>4 Pannel Comics</h2>
                                        <p class="desc">A picture is worth a thousand words. What can you say in four?
                                        Tell us your story using only four pannels! </p>
                                        {/* This submission is a placeholder */}
                                        {/* Will change to store image in database */}
                                        <div class="buttons">
                                            <button class="upload">Image Upload</button>
                                            <button class="vote">Vote!</button> {/*Link to vote page*/}
                                        </div>
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
                            <p>Characters that leap off the page! </p>
                            <div class ="popbox">
                                <a class="popbutton" href="#popup2">Compete!</a>
                            </div>
                            <div id="popup2" class="overlay">
                                <div class="popup">
                                    <div class="left-content">
                                        <img class="popimages" src="/Arena art/Char-Design.png" />
                                        <p>Date: Mar 9, 2024</p>
                                        <p>1st Prize: <img src="/Market art/coin.png" className="coin" alt="Coin" /> Some #</p>
                                    </div>
                                    <a class="close" href="#">&times;</a>
                                    <div class="content">
                                        <h2>Character Design</h2>
                                        <p class="desc">Dive into the depths of your creativity and bring 
                                            forth a character that resonates with you. 
                                            Consider their appearance, quirks, and backstory, 
                                            allowing their personality to shine through. </p>
                                        <div class="buttons">
                                            <button class="upload">Image Upload</button>
                                            <button class="vote">Vote!</button> {/*Link to vote page*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-image" src="/Arena art/creature.png" alt=""/>
                        <div class="card-header">
                            <h3>Mythical Creatures</h3>
                        </div>
                        <div class="card-content">
                            <p>Creatures, big and small, cute and creepy!</p>
                            <div class ="popbox">
                                <a class="popbutton" href="#popup7">Compete!</a>
                            </div>
                            <div id="popup7" class="overlay">
                                <div class="popup">
                                    <div class="left-content">
                                        <img class="popimages" src="/Arena art/creature.png" />
                                        <p>Date: Mar 10, 2024</p> 
                                        <p>1st Prize: <img src="/Market art/coin.png" className="coin" alt="Coin" /> Some #</p>
                                    </div>
                                    <a class="close" href="#">&times;</a>
                                    <div class="content">
                                        <h2>Mythical Creatures</h2>
                                        <p class="desc">
                                            Bring creatures of myth to life! 
                                            Be they original creations or legends of old, 
                                            challenge yourself to create creatures that inspire! 
                                        </p>
                                        <div class="buttons">
                                            <button class="upload">Image Upload</button>
                                            <button class="vote">Vote!</button> {/*Link to vote page*/}
                                        </div>
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
                        <img class="card-image" src="/Arena art/robomarch.jpg" alt=""/>
                        <div class="card-header">
                            <h3>March of Robots!</h3>
                        </div>
                        <div class="card-content">
                            <p>The robot uprising is underway!</p>
                            <div class ="popbox">
                                <a class="popbutton" href="#popup4">Compete!</a>
                            </div>
                            <div id="popup4" class="overlay">
                                <div class="popup">
                                    <div class="left-content">
                                        <img class="popimages" src="/Arena art/robomarch.jpg" />
                                        <p>Date: March 31, 2024</p>
                                        <p>1st Prize: <img src="/Market art/coin.png" className="coin" alt="Coin" /> Some #</p>
                                    </div>
                                    <a class="close" href="#">&times;</a>
                                    <div class="content">
                                        <h2>March of Robots!</h2>
                                        <p class="desc">
                                            A robot a day keeps the people away! Grow your 
                                            army of unique robots and forward march!
                                        </p>
                                        <div class="buttons">
                                            <button class="upload">Image Upload</button>
                                            <button class="vote">Vote!</button> {/*Link to vote page*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-image" src="/Arena art/WIZARD.png" alt=""/>
                        <div class="card-header">
                            <h3>Wizard April</h3>
                        </div>
                        <div class="card-content">
                            <p>Showcase the magic of your creativity!</p>
                            {/* <button type="submit">Compete!</button> */}
                            <div class ="popbox">
                                <a class="popbutton" href="#popup5">Compete!</a>
                            </div>
                            <div id="popup5" class="overlay">
                                <div class="popup">
                                    <div class="left-content">
                                        <img class="popimages" src="/Arena art/WIZARD.png" />
                                        <p>Date: April 30, 2024</p>
                                        <p>1st Prize: <img src="/Market art/coin.png" className="coin" alt="Coin" /> Some #</p>
                                    </div>
                                    <a class="close" href="#">&times;</a>
                                    <div class="content">
                                        <h2>Wizard April</h2>
                                        <p class="desc">
                                            Let Wizard April ignite your creativity, 
                                            as you delve into the realms of fantasy, 
                                            weaving spells with your brush or pen to bring 
                                            captivating tales of sorcery and wonder to life 
                                            on canvas or paper. Don your wizard's hat, 
                                            wield your artistic wand, and embark on an 
                                            enchanting adventure that will leave a lasting 
                                            mark on both your artistry and imagination.
                                        </p>
                                        <div class="buttons">
                                            <button class="upload">Image Upload</button>
                                            <button class="vote">Vote!</button> {/*Link to vote page*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-image" src="/Arena art/inkyapril.png" alt=""/>
                        <div class="card-header">
                            <h3>Inky April</h3>
                        </div>
                        <div class="card-content">
                            <p>Pen to paper! Create inky masterpieces!</p>
                            {/* <button type="submit">Compete!</button> */}
                            <div class ="popbox">
                                <a class="popbutton" href="#popup6">Compete!</a>
                            </div>
                            <div id="popup6" class="overlay">
                                <div class="popup">
                                    <div class="left-content">
                                        <img class="popimages" src="/Arena art/inkyapril.png" />
                                        <p>Date: April 30, 2024</p>
                                        <p>1st Prize: <img src="/Market art/coin.png" className="coin" alt="Coin" /> Some #</p>
                                    </div>
                                    <a class="close" href="#">&times;</a>
                                    <div class="content">
                                        <h2>Inky April</h2>
                                        <p class="desc">
                                            Immerse yourself in the captivating world of ink 
                                            and pen! Challenge your artistic skills by 
                                            embracing the simplicity and boldness of these 
                                            traditional tools, allowing your imagination to 
                                            flow freely as you create intricate and mesmerizing 
                                            artworks that truly come to life on paper.
                                        </p>
                                        <div class="buttons">
                                            <button class="upload">Image Upload</button>
                                            <button class="vote">Vote!</button> {/*Link to vote page*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section-label">
                    <div className="timeframe-line-top"></div>
                    <h3>Winners</h3>
                    {/* Tentative: Contain either links to pages with finished competition
                        winners, or links to pages where users can vote and see winners */}
                    <div className="timeframe-line-bottom"></div>
                    <div class="card">
                        <img class="card-image" src="/Arena art/best-comic.png" alt=""/>
                        <div class="card-header">
                            <h3>Best Comic Covers</h3>
                        </div>
                        <div class="card-content">
                            <p>This cycles voted best comic cover artists!</p>
                            <div class ="popbox">
                                <a class="popbutton" href="#popup8">View!</a>
                            </div>
                            <div id="popup8" class="overlay">
                                <div class="popup">
                                    <div class="left-content">
                                        <p>1st Place</p>
                                        <img class="popimages" src="/Arena art/cover1.jpg"/>
                                        <img class="winner-image" src="/Arena art/User_Icon.png" />
                                    </div>
                                    <a class="close" href="#">&times;</a>
                                    <div class="content">
                                        <h2>Winner Name</h2>
                                        <p class="desc">
                                            Image name/description
                                        </p>
                                    </div>
                                    <div class="buttons">
                                        <button class="mentions">Honorable Mentions</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-image" src="/Arena art/design.jpg" alt=""/>
                        <div class="card-header">
                            <h3>Best Design</h3>
                        </div>
                        <div class="card-content">
                            <p>This cycles voted best design artists!</p>
                            <div class ="popbox">
                                <a class="popbutton" href="#popup9">View!</a>
                            </div>
                            <div id="popup9" class="overlay">
                                <div class="popup">
                                    <div class="left-content">
                                        <p>1st Place</p>
                                        <img class="popimages" src="/Arena art/design1.jpg"/>
                                        <img class="winner-image" src="/Arena art/User_Icon.png"/>

                                        <p>2nd Place</p>
                                        <img class="popimages" src="/Arena art/design2.jpg"/>
                                        <img class="winner-image" src="/Arena art/User_Icon.png"/>
                                    </div>
                                    <a class="close" href="#">&times;</a>
                                    <div class="content">
                                        <h2>Winner Name</h2>
                                        <p class="desc">
                                            Image name/description
                                        </p>
                                    </div>
                                    <div class="buttons">
                                        <button class="mentions">Honorable Mentions</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    ); 
};

export default ArtistArena;