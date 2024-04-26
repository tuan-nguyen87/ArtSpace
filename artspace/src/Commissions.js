import React, { useState } from "react";
import "./styles/Commissions.css";

const Commissions = () => 
{
    const pholderTitle = "Title of the commission";
    const pholderDescription = "What do you want made?\nIs there a special occassion?\nWhat is the art going to be about?\nWhatever you want the artist to know!"
    const pholderArtType = "What artstyle do you want?\nAny color themes?\n(e.g. waterpaint, anime-style, monotone, lots of blue)"

    const title = "";
    const description = "";
    const artType = "";
    const postDate = "";
    const completeDate = "";
    // user.uid to get the user's ID
    const userID = "";

    const [isCommCreatePopupOpen, setIsCommCreatePopupOpen] = useState(false);
    const [commTitle, setCommCreateTitle] = useState(title); //
    const [commDescription, setCommCreateDescription] = useState(description);
    const [commArtType, setCommCreateArtType] = useState(artType);
    const [commPostDate, setCommCreatePostDate] = useState(postDate);
    const [commCompleteDate, setCommCreateCompleteDate] = useState(completeDate);
    // const [userID, setCommCreateUserID] = userState(commUserID);


    const handleCommCreateButtonOpen = () => {
        setIsCommCreatePopupOpen(true);
        setCommCreateTitle(commTitle);
        setCommCreateDescription(commDescription);
        setCommCreateArtType(commArtType);
        setCommCreatePostDate(commPostDate);
        setCommCreateCompleteDate(commCompleteDate);
        // setCommCreateUserID(userID)
    }

    const handleCommCreateButtonCreate = () => {
        // these will be sent to the database
        // console.log(userID);
        console.log(commTitle);
        console.log(commDescription);
        console.log(commArtType);
        console.log(commPostDate);
        console.log(commCompleteDate);
        handleCommCreateButtonCancel();
    }

    const handleCommCreateButtonCancel = () => {
        setIsCommCreatePopupOpen(false);
        setCommCreateTitle(title);
        setCommCreateDescription(description);
        setCommCreateArtType(artType);
        setCommCreatePostDate(postDate);
        setCommCreateCompleteDate(completeDate);
    }

    const handleCommCreateTitle = (event) => {
        setCommCreateTitle(event.target.value);
    }

    const handleCommCreateDescription = (event) => {
        setCommCreateDescription(event.target.value);
    }

    const handleCommCreateArtType = (event) => {
        setCommCreateArtType(event.target.value);
    }

    const handleCommCreateCompleteDate = (event) => {
        setCommCreateCompleteDate(event.target.value);
        setCommCreatePostDate(dateToday);
    }

    //https://stackoverflow.com/questions/73476564/how-do-i-disable-future-dates-in-react-js-while-selecting-dates
    var dateToday = new Date().toISOString().split('T')[0];


    return (
        <div class="commissions-container">
            <div class="commissions-header">
                <div class="commissions-top-navigator">
                    <a href="/Explore">
                        <span class="explore-sect">Explore</span>
                    </a>
                    <span>|</span>
                    <a href="/Commissions">
                        <span class="commissions-sect">Commission Listings</span>
                    </a>
                </div>
                <div class="search-container">
                <button type="filter" class="commissions-filter-btn">Filter</button>
                <input type="text" class="commissions-search-bar" placeholder="Search..." />
                <button type="submit" class="commissions-search-btn">Submit</button>
                </div>
                <div class="create-container">
                    <button type="create" class="commissions-create-btn" onClick={handleCommCreateButtonOpen}>
                        Create
                    </button>
                </div>
            </div>
            {isCommCreatePopupOpen && (
                <div class="comm-create-popup">
                    <h2 class="create-commission">Create Commission</h2>
                    <div class="create-commission-form">
                        <label>Title</label>
                        <textarea class="comm-input-title" type="text" value={commTitle} onChange={handleCommCreateTitle} placeholder={pholderTitle}/>
                        <label>Description</label>
                        <textarea class="comm-input-description" type="text" value={commDescription} onChange={handleCommCreateDescription} placeholder={pholderDescription}/>
                        <label>Art Type</label>
                        <textarea class="comm-input-arttype" type="text" value={commArtType} onChange={handleCommCreateArtType} placeholder={pholderArtType}/>
                        <label>Complete by Date</label>
                        <input class="comm-input-completedate" type="date" value={commCompleteDate} onChange={handleCommCreateCompleteDate} min={dateToday}/>
                        <button class="commissions-create-btn" onClick={handleCommCreateButtonCancel}>
                            Cancel
                        </button>
                        <button class="commissions-create-btn" onClick={handleCommCreateButtonCreate}>
                            Create
                        </button>
                    </div>
                </div>
            )}
            <div class="commissions-cluster">
                <div class="commissions-listing-container">
                <ul>
                    <li class="commissions-listing commissions-selected">
                    <div>
                        <h1 class="commission-title">Watercolor painting of my dog</h1>
                        <h2 class="date-created">May 7th, 2024</h2>
                    </div>
                    <div class="pfp commissions-listing-pfp"></div>
                    </li>
                    <li class="commissions-listing">
                    <div>
                        <h1 class="commission-title">Picture of my Anime Waifu</h1>
                        <h2 class="date-created">May 7th, 2024</h2>
                    </div>
                    <div class="pfp commissions-listing-pfp"></div>
                    </li>
                    <li class="commissions-listing">
                    <div>
                        <h1 class="commission-title">Realistic painting of my mom</h1>
                        <h2 class="date-created">May 7th, 2024</h2>
                    </div>
                    <div class="pfp commissions-listing-pfp"></div>
                    </li>
                    <li class="commissions-listing">
                    <div>
                        <h1 class="commission-title">Give me whatever you want!</h1>
                        <h2 class="date-created">May 7th, 2024</h2>
                    </div>
                    <div class="pfp commissions-listing-pfp"></div>
                    </li>
                    <li class="commissions-listing">
                    <div>
                        <h1 class="commission-title">Profile picture for Discord</h1>
                        <h2 class="date-created">May 7th, 2024</h2>
                    </div>
                    <div class="pfp commissions-listing-pfp"></div>
                    </li>
                </ul>
                </div>
                <div class="commissions-info-container">
                <div class="commissions-info">
                    <h1 class="commissions-info-title bottom-border">
                        Commission 1
                    </h1>   
                    <p class="commissions-info-description bottom-border">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p class="commissions-info-arttype bottom-border">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div class="commissions-info-client-container">
                        <div class="pfp">

                        </div>
                        <div class="commissions-info-client-rating">
                        <span class="commissions-info-client-name">
                            Alex
                        </span>
                        <div class="commissions-client-rating">
                            * * * * *
                        </div>
                        </div>
                        <span class="commissions-info-date">
                        Date Posted: May 7th, 2024
                        </span>
                    </div>
                    <div class="commissions-button-container">
                        <button>Apply</button>
                    </div>
                </div>
                </div>
            </div>
            <div class="commissions-footer">
                <div class="commissions-footer-border"></div>
                <div class="commissions-pagination">
                <a href="#">&laquo;</a>
                <a class="commissions-page-active" href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>       
                <a href="#">&raquo;</a> 
                </div>
            </div>
        </div>

    );
}

export default Commissions;
