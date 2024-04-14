//react
import React, {useState} from 'react';
import './styles/Showroom.css';

function ShowroomPage() {
    const [selectedCategory, setSelectedCategory] = useState('Featured');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
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
                        {[
                            { imageUrl: '/Showroom art/SHRMart1.png', artist: 'Jennifer', title: 'Snail' },
                            { imageUrl: '/Showroom art/SHRMart2.png', artist: 'Kevin', title: 'River' },
                            { imageUrl: '/Showroom art/SHRMart3.png', artist: 'Jennifer', title: 'Face' },
                            { imageUrl: '/Showroom art/SHRMart4.png', artist: 'Tuan', title: 'Orange' },
                            { imageUrl: '/Showroom art/SHRMart5.png', artist: 'Valerie', title: 'Portrait' },
                            { imageUrl: '/Showroom art/SHRMart6.png', artist: 'Yasmine', title: 'Mountain' },
                            { imageUrl: '/Showroom art/SHRMart7.png', artist: 'Yasmine', title: 'House' },
                            { imageUrl: '/Showroom art/SHRMart8.png', artist: 'Kevin', title: 'Flower' },
                            { imageUrl: '/Showroom art/SHRMart9.png', artist: 'Valerie', title: 'Cat' },
                            { imageUrl: '/Showroom art/SHRMart10.png', artist: 'Tuan', title: 'Shapes' },
                            { imageUrl: '/Showroom art/SHRMart11.png', artist: 'Jennifer', title: 'Shapes' },
                            { imageUrl: '/Showroom art/SHRMart12.png', artist: 'Valerie', title: 'Abstract' },
                            { imageUrl: '/Showroom art/SHRMart13.png', artist: 'Yasmine', title: 'octo' },
                            { imageUrl: '/Showroom art/SHRMart14.png', artist: 'Kevin', title: 'Colors' },
                            { imageUrl: '/Showroom art/SHRMart15.png', artist: 'Tuan', title: '3D' },
                            { imageUrl: '/Showroom art/SHRMart16.png', artist: 'Jennifer', title: 'Guitar' }
                            // Add other images
                        ].map((item, index) => (
                            <div className="artwork-item" key={index} onClick={() => handleImageClick(item.imageUrl)}>
                                <img src={item.imageUrl} alt={`Artwork ${index + 1}`} />
                                <div className="shrm-overlay">
                                    <p>Artist: {item.artist}</p>
                                    <p>Title: {item.title}</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {selectedCategory === 'Newest' && (
                    <>
                        {[
                            { imageUrl: '/Showroom art/SHRMart16.png', artist: 'Jennifer', title: 'Guitar' },
                            { imageUrl: '/Showroom art/SHRMart13.png', artist: 'Yasmine', title: 'Octo' },
                            { imageUrl: '/Showroom art/SHRMart14.png', artist: 'Kevin', title: 'Colors' },
                            { imageUrl: '/Showroom art/SHRMart15.png', artist: 'Tuan', title: '3D' },
                            { imageUrl: '/Showroom art/SHRMart12.png', artist: 'Valerie', title: 'abstract' },
                            { imageUrl: '/Showroom art/SHRMart10.png', artist: 'Tuan', title: 'Shapes' },
                            { imageUrl: '/Showroom art/SHRMart8.png', artist: 'Kevin', title: 'FLower' },
                            { imageUrl: '/Showroom art/SHRMart7.png', artist: 'Yasmine', title: 'House' },
                            // Add other images
                        ].map((item, index) => (
                            <div className="artwork-item" key={index} onClick={() => handleImageClick(item.imageUrl)}>
                                <img src={item.imageUrl} alt={`Artwork ${index + 1}`} />
                                <div className="shrm-overlay">
                                    <p>Artist: {item.artist}</p>
                                    <p>Title: {item.title}</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {selectedCategory === 'Most Views' && (
                    <>
                        {[
                            { imageUrl: '/Showroom art/SHRMart6.png', artist: 'Yasmine', title: 'Mountain' },
                            { imageUrl: '/Showroom art/SHRMart7.png', artist: 'Yasmine', title: 'House' },
                            { imageUrl: '/Showroom art/SHRMart10.png', artist: 'Tuan', title: 'Shapes' },
                            { imageUrl: '/Showroom art/SHRMart9.png', artist: 'Valerie', title: 'Cat' },
                            { imageUrl: '/Showroom art/SHRMart14.png', artist: 'Kevin', title: 'Colors' },
                            // Add other images
                        ].map((item, index) => (
                            <div className="artwork-item" key={index} onClick={() => handleImageClick(item.imageUrl)}>
                                <img src={item.imageUrl} alt={`Artwork ${index + 1}`} />
                                <div className="shrm-overlay">
                                    <p>Artist: {item.artist}</p>
                                    <p>Title: {item.title}</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {selectedCategory ==='Oldest' && (
                    <>
                        {[
                            { imageUrl: '/Showroom art/SHRMart1.png', artist: 'Jennifer', title: 'Snail' },
                            { imageUrl: '/Showroom art/SHRMart10.png', artist: 'Tuan', title: 'Shapes' },
                            { imageUrl: '/Showroom art/SHRMart14.png', artist: 'Kevin', title: 'Colors' },
                            { imageUrl: '/Showroom art/SHRMart5.png', artist: 'Valerie', title: 'Portrait' },
                            // Add other images
                        ].map((item, index) => (
                            <div className="artwork-item" key={index} onClick={() => handleImageClick(item.imageUrl)}>
                                <img src={item.imageUrl} alt={`Artwork ${index + 1}`} />
                                <div className="shrm-overlay">
                                    <p>Artist: {item.artist}</p>
                                    <p>Title: {item.title}</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
                {/* Modal for displaying the selected image */}
                {selectedImage && (
                    <div className="shrm-modal" onClick={closeModal}>
                        <div className="shrm-modal-content">
                            <span className="shrm-close" onClick={closeModal}>&times;</span>
                            <img src={selectedImage} alt="Expanded artwork" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShowroomPage;

