//react
import React from 'react';
import './styles/Showroom.css';

function ShowroomPage() {
    return (
        <div className="showroom-body">
            <hr className="showroom-hr"></hr>
            <div className="showroom-section-header">
                Explore | Show Room
            </div>

            <div className="showroom-section-upload">
                <a>Upload</a>
            </div>

            <div className="showroom-section-titles">
                <div className="showroom-title-line-top"></div>
                <br></br>
                <a>Featured</a>
                <a>Newest</a>
                <a>Most Views</a>
                <a>Oldest</a>
                <br></br>
                <div className="showroom-title-line-bottom"></div>
            </div>
      
            <div className="artwork-container">
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart1.png" alt="Artwork 1" />
                    <div className="overlay">
                        <p>Artist: Jennifer</p>
                        <p>Title: Snail</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart2.png" alt="Artwork 2" />
                    <div className="overlay">
                        <p>Artist: Kevin</p>
                        <p>Title: River</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart3.png" alt="Artwork 3" />
                    <div className="overlay">
                        <p>Artist: Jennifer</p>
                        <p>Title: Face</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart4.png" alt="Artwork 4" />
                    <div className="overlay">
                        <p>Artist: Tuan</p>
                        <p>Title: Orange</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart5.png" alt="Artwork 5" />
                    <div className="overlay">
                        <p>Artist: Valerie</p>
                        <p>Title: Portrait</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart6.png" alt="Artwork 6" />
                    <div className="overlay">
                        <p>Artist: Yasmine</p>
                        <p>Title: Mountain</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart7.png" alt="Artwork 7" />
                    <div className="overlay">
                        <p>Artist: Yasmine</p>
                        <p>Title: House</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart8.png" alt="Artwork 8" />
                    <div className="overlay">
                        <p>Artist: Kevin</p>
                        <p>Title: Flower</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart9.png" alt="Artwork 9" />
                    <div className="overlay">
                        <p>Artist: Valerie</p>
                        <p>Title: Cat</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart10.png" alt="Artwork 10" />
                    <div className="overlay">
                        <p>Artist: Tuan</p>
                        <p>Title: Shapes</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart11.png" alt="Artwork 11" />
                    <div className="overlay">
                        <p>Artist: Jennifer</p>
                        <p>Title: Shapes</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart12.png" alt="Artwork 12" />
                    <div className="overlay">
                        <p>Artist: Valerie</p>
                        <p>Title: Abstract</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart13.png" alt="Artwork 13" />
                    <div className="overlay">
                        <p>Artist: Yasmine</p>
                        <p>Title: Octo</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart14.png" alt="Artwork 14" />
                    <div className="overlay">
                        <p>Artist: Kevin</p>
                        <p>Title: Colors</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart15.png" alt="Artwork 15" />
                    <div className="overlay">
                        <p>Artist: Tuan</p>
                        <p>Title: 3D</p>
                    </div>
                </div>
                <div className="artwork-item">
                    <img src="/Showroom art/SHRMart16.png" alt="Artwork 16" />
                    <div className="overlay">
                        <p>Artist: Jennifer</p>
                        <p>Title: Guitar</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowroomPage;