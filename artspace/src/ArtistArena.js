import React from 'react';
import "./styles/ArtistArena.css";

//attempt at reducing repetitions
const CompetitionCard = ({ title, imageSrc, date, intro, description }) => {
    return (
        <div className="card">
            <img className="card-image" src={imageSrc} alt=""/>
            <div className="card-header">
                <h3>{title}</h3>
            </div>
            <div className="card-content">
                <p>{intro}</p>
                <div className="popbox">
                    <a className="popbutton" href={`#popup-${title}`}>Compete!</a>
                </div>
                <div id={`popup-${title}`} className="overlay">
                    <div className="popup">
                        <div className="left-content">
                            <img className="popimages" src={imageSrc} alt=""/>
                            <p>Date: {date}</p>
                            <p>1st Prize: <img src="/Market art/coin.png" className="coin" alt="Coin" /> Some #</p>
                        </div>
                        <a className="close" href="#">&times;</a>
                        <div className="right-content">
                            <h2>{title}</h2>
                            <p className="desc">{description}</p>
                            <div className="buttons">
                                <button className="upload">Image Upload</button>
                                <button className="vote">Vote!</button> {/*Link to vote page*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

//Winners Card component populated with winner data -- firstPlaceImage, secondPlaceImage, thirdPlaceImage, winner1, description1 
const WinnerCard = ({ title, coverImageSrc, intro, winners}) => {
    return (
        <div className="card">
            <img className="card-image" src={coverImageSrc} alt=""/>
            <div className="card-header">
                <h3>{title}</h3>
            </div>
            <div className="card-content">
                <p>{intro}</p>
                <div className="popbox">
                    <a className="popbutton" href={`#popup-${title}`}>View!</a>
                </div>
                <div id={`popup-${title}`} className="overlay">
                    <div className="popup">
                        <div className="content">
                            {winners.map((winner, index) => (
                                <div key={index} className="place-sec">
                                    <div className="left-content">
                                        <h2>{index + 1}st Place</h2>
                                        <img className="popimages" src={winner.image} alt=""/>
                                    </div>
                                    <div className="right-content">
                                        <h2>{winner.name}</h2>
                                        <p>{winner.description}</p>
                                        <img className="winner-image" src={winner.pimage}></img>
                                        {/* Additional winner information */}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a className="close" href="#">&times;</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArtistArena = () => {
    return(
        <div className="arena-bg">
            <div className="arena-container">
                <div className="arena-section-header">
                    Interact | Artist Arena
                </div>

                <div className="section-label">
                    <div className="timeframe-line-top"></div>
                    <h3>This Week</h3>
                    <div className="timeframe-line-bottom"></div>
                    <CompetitionCard
                        title="4 Panel Comic"
                        imageSrc="/Arena art/4-Panel-Life.png"
                        date="Mar 9, 2024"
                        intro="Tell a story in 4 pictures!"
                        description="A picture is worth a thousand words. What can you say in four?
                        Tell us your story using only four pannels!"
                    />
                    
                    <CompetitionCard
                        title="Character Design"
                        imageSrc="/Arena art/Char-Design.png"
                        date="Mar 9, 2024"
                        intro="Characters that leap off the page!"
                        description="Dive into the depths of your creativity and bring 
                        forth a character that resonates with you. 
                        Consider their appearance, quirks, and backstory, 
                        allowing their personality to shine through."
                    />

                    <CompetitionCard
                        title="Mythical Creatures"
                        imageSrc="/Arena art/creature.png"
                        date="Mar 10, 2024"
                        intro="Creatures, big and small, cute and creepy!"
                        description="Bring creatures of myth to life! 
                        Be they original creations or legends of old, 
                        challenge yourself to create creatures that inspire!"
                    />
                </div>
                
                <div className="section-label">
                    <div className="timeframe-line-top"></div>
                    <h3>Upcoming</h3>
                    <div className="timeframe-line-bottom"></div>

                    <CompetitionCard
                        title="March of Robots"
                        imageSrc="Arena art/robomarch.jpg"
                        date="Mar 31, 2024"
                        intro="The robot uprising is underway! How many unique robots can you build?"
                        description="A robot a day keeps the people away! Grow your 
                        army of unique robots and forward march!"
                    />

                    <CompetitionCard
                        title="Wizard April"
                        imageSrc="/Arena art/WIZARD.png"
                        date="April 30, 2024"
                        intro="Wands, potions, and pointy hats! Showcase the magic of your creativity!"
                        description="Let Wizard April ignite your creativity, 
                        as you delve into the realms of fantasy, 
                        weaving spells with your brush or pen to bring 
                        captivating tales of sorcery and wonder to life 
                        on canvas or paper. Don your wizard's hat, 
                        wield your artistic wand, and embark on an 
                        enchanting adventure that will leave a lasting 
                        mark on both your artistry and imagination."
                    />

                    <CompetitionCard
                        title="Inky April"
                        imageSrc="/Arena art/inkyapril.png"
                        date="April 30, 2024"
                        intro="Pen to paper! Create inky masterpieces!"
                        description="Immerse yourself in the captivating world of ink 
                        and pen! Challenge your artistic skills by 
                        embracing the simplicity and boldness of these 
                        traditional tools, allowing your imagination to 
                        flow freely as you create intricate and mesmerizing 
                        artworks that truly come to life on paper."
                    />
                </div>
                <div className="section-label">
                    <div className="timeframe-line-top"></div>
                    <h3>Winners</h3>
                    <div className="timeframe-line-bottom"></div>

                    <WinnerCard
                        title="Best Comic Covers"
                        coverImageSrc="/Arena art/best-comic.png"
                        intro="This cycles voted best comic cover artists!"
                        winners={[
                            { name: "Jessica Bail", image: "/Arena art/cover1.jpg", description:"Superman", pimage:"/Arena art/User_Icon.png" },
                            { name: "John Doe", image: "/Arena art/cover2.png", description:"Spider-Punk", pimage:"/Arena art/User_Icon.png" },
                            { name: "Jane Doe", image: "/Arena art/cover3.jpg", description:"Godzilla", pimage:"/Arena art/User_Icon.png" },
                            // Add more winners as needed
                        ]}
                    
                    />

                    {/* <WinnerCard
                        title="Best Design"
                        coverImageSrc="/Arena art/design.jpg"
                        intro="This cycles voted best design artists!"
                        firstPlaceImage="/Arena art/design1.jpg"
                        secondPlaceImage="/Arena art/design2.png"
                        thirdPlaceImage="/Arena art/design3.png"
                        winner1="Tammy Thompson"
                        description1="The Wolf"
                    /> */}

                    {/* <div class="card">
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
                                        <div class="place-sec">
                                        <p>1st Place</p>
                                            <img class="popimages" src="/Arena art/cover1.jpg"/>
                                            <img class="winner-image" src="/Arena art/User_Icon.png" />
                                        </div>
                                        <div class="place-sec">
                                        <p>2nd Place</p>
                                            <img class="popimages" src="/Arena art/design2.png"/>
                                            <img class="winner-image" src="/Arena art/User_Icon.png"/>
                                        </div>
                                        <div class="place-sec">
                                        <p>3rd Place</p>
                                            <img class="popimages" src="/Arena art/design3.png"/>
                                            <img class="winner-image" src="/Arena art/User_Icon.png"/>
                                        </div>
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
                    </div> */}
                </div>
            </div> 
        </div>
    ); 
};

export default ArtistArena;