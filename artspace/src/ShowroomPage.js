//react
import React, {useState} from 'react';
import './styles/Showroom.css';

function ShowroomPage() {
    const [selectedCategory, setSelectedCategory] = useState('Featured');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="showroom-body">
            <hr className="showroom-hr"></hr>
            <div className="showroom-section-header">
                Explore | Show Room
            </div>
            
            {/*change a anchor */}
            <div className="showroom-section-titles">
                <div className="showroom-title-line-top"></div>
                <br></br>
                <a onClick={() => handleCategoryChange('Featured')}>Featured</a>
                <a onClick={() => handleCategoryChange('Newest')}>Newest</a>
                <a onClick={() => handleCategoryChange('Most Views')}>Most Views</a>
                <a onClick={() => handleCategoryChange('Oldest')}>Oldest</a>
                <br></br>
                <div className="showroom-title-line-bottom"></div>
            </div>

            <div className="artwork-container">
                {selectedCategory === 'Featured' && (
                    <>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart1.png" alt="Artwork 1" />
                            <div className="shrm-overlay">
                                <p>Artist: Jennifer</p>
                                <p>Title: Snail</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart2.png" alt="Artwork 2" />
                            <div className="shrm-overlay">
                                <p>Artist: Kevin</p>
                                <p>Title: River</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart3.png" alt="Artwork 3" />
                            <div className="shrm-overlay">
                                <p>Artist: Jennifer</p>
                                <p>Title: Face</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart4.png" alt="Artwork 4" />
                            <div className="shrm-overlay">
                                <p>Artist: Tuan</p>
                                <p>Title: Orange</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart5.png" alt="Artwork 5" />
                            <div className="shrm-overlay">
                                <p>Artist: Valerie</p>
                                <p>Title: Portrait</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart6.png" alt="Artwork 6" />
                            <div className="shrm-overlay">
                                <p>Artist: Yasmine</p>
                                <p>Title: Mountain</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart7.png" alt="Artwork 7" />
                            <div className="shrm-overlay">
                                <p>Artist: Yasmine</p>
                                <p>Title: House</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart8.png" alt="Artwork 8" />
                            <div className="shrm-overlay">
                                <p>Artist: Kevin</p>
                                <p>Title: Flower</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart9.png" alt="Artwork 9" />
                            <div className="shrm-overlay">
                                <p>Artist: Valerie</p>
                                <p>Title: Cat</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart10.png" alt="Artwork 10" />
                            <div className="shrm-overlay">
                                <p>Artist: Tuan</p>
                                <p>Title: Shapes</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart11.png" alt="Artwork 11" />
                            <div className="shrm-overlay">
                                <p>Artist: Jennifer</p>
                                <p>Title: Shapes</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart12.png" alt="Artwork 12" />
                            <div className="shrm-overlay">
                                <p>Artist: Valerie</p>
                                <p>Title: Abstract</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart13.png" alt="Artwork 13" />
                            <div className="shrm-overlay">
                                <p>Artist: Yasmine</p>
                                <p>Title: Octo</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart14.png" alt="Artwork 14" />
                            <div className="shrm-overlay">
                                <p>Artist: Kevin</p>
                                <p>Title: Colors</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart15.png" alt="Artwork 15" />
                            <div className="shrm-overlay">
                                <p>Artist: Tuan</p>
                                <p>Title: 3D</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart16.png" alt="Artwork 16" />
                            <div className="shrm-overlay">
                                <p>Artist: Jennifer</p>
                                <p>Title: Guitar</p>
                            </div>
                        </div>
                    </>
                )}

                {selectedCategory === 'Newest' && (
                    <>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart16.png" alt="Artwork 16" />
                            <div className="shrm-overlay">
                                <p>Artist: Jennifer</p>
                                <p>Title: Guitar</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart13.png" alt="Artwork 13" />
                            <div className="shrm-overlay">
                                <p>Artist: Yasmine</p>
                                <p>Title: Octo</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart14.png" alt="Artwork 14" />
                            <div className="shrm-overlay">
                                <p>Artist: Kevin</p>
                                <p>Title: Colors</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart15.png" alt="Artwork 15" />
                            <div className="shrm-overlay">
                                <p>Artist: Tuan</p>
                                <p>Title: 3D</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart12.png" alt="Artwork 12" />
                            <div className="shrm-overlay">
                                <p>Artist: Valerie</p>
                                <p>Title: Abstract</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart10.png" alt="Artwork 10" />
                            <div className="shrm-overlay">
                                <p>Artist: Tuan</p>
                                <p>Title: Shapes</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart8.png" alt="Artwork 8" />
                            <div className="shrm-overlay">
                                <p>Artist: Kevin</p>
                                <p>Title: Flower</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart7.png" alt="Artwork 7" />
                            <div className="shrm-overlay">
                                <p>Artist: Yasmine</p>
                                <p>Title: House</p>
                            </div>
                        </div>
                    </>
                )}

                {selectedCategory === 'Most Views' && (
                    <>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart6.png" alt="Artwork 6" />
                            <div className="shrm-overlay">
                                <p>Artist: Yasmine</p>
                                <p>Title: Mountain</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart7.png" alt="Artwork 7" />
                            <div className="shrm-overlay">
                                <p>Artist: Yasmine</p>
                                <p>Title: House</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart10.png" alt="Artwork 10" />
                            <div className="shrm-overlay">
                                <p>Artist: Tuan</p>
                                <p>Title: Shapes</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart9.png" alt="Artwork 9" />
                            <div className="shrm-overlay">
                                <p>Artist: Valerie</p>
                                <p>Title: Cat</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart14.png" alt="Artwork 14" />
                            <div className="shrm-overlay">
                                <p>Artist: Kevin</p>
                                <p>Title: Colors</p>
                            </div>
                        </div>
                    </>
                )}

                {selectedCategory ==='Oldest' && (
                    <>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart1.png" alt="Artwork 1" />
                            <div className="shrm-overlay">
                                <p>Artist: Jennifer</p>
                                <p>Title: Snail</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart10.png" alt="Artwork 10" />
                            <div className="shrm-overlay">
                                <p>Artist: Tuan</p>
                                <p>Title: Shapes</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart14.png" alt="Artwork 14" />
                            <div className="shrm-overlay">
                                <p>Artist: Kevin</p>
                                <p>Title: Colors</p>
                            </div>
                        </div>
                        <div className="artwork-item">
                            <img src="/Showroom art/SHRMart5.png" alt="Artwork 5" />
                            <div className="shrm-overlay">
                                <p>Artist: Valerie</p>
                                <p>Title: Portrait</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ShowroomPage;

