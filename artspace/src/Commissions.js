import React, { useEffect, useState } from "react";
import "./styles/Commissions.css";
import { db, auth, storage } from "./Firebase/Firebase.js";
import { doc, onSnapshot, addDoc, collection, query, where, getDocs, getDoc, Firestore, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { reload } from "firebase/auth";

//get doc and setdoc from firebase

const Commissions = () => 
{
    const [commComponents, setCommComponents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentComm, setCurrentComm] = useState(null);

    const handleCommComponents = (newComm) => {
        setCommComponents(newComm);
    };

    // todo, read in the commissions as a list or something to display properly.

    const pholderTitle = "Title of the commission";
    const pholderDescription = "What do you want made?\nIs there a special occassion?\nWhat is the art going to be about?\nWhatever you want the artist to know!"
    const pholderArtType = "What artstyle do you want?\nAny color themes?\n(e.g. waterpaint, anime-style, monotone, lots of blue)"

    const title = "";
    const description = "";
    const artType = "";
    const postDate = "";
    const completeDate = "";
    // user.uid to get the user's ID
    const clientUserID = "";
    const clientUsername = "";
    const artistUserID = "";
    const artistUsername = "";
    const commissionID = "";

    const [isApplyConfirmationPopupOpen, setIsApplyConfirmationPopupOpen] = useState(false);
    const [isCommCreatePopupOpen, setIsCommCreatePopupOpen] = useState(false);
    const [commTitle, setCommCreateTitle] = useState(title);
    const [commDescription, setCommCreateDescription] = useState(description);
    const [commArtType, setCommCreateArtType] = useState(artType);
    const [commPostDate, setCommCreatePostDate] = useState(postDate);
    const [commCompleteDate, setCommCreateCompleteDate] = useState(completeDate);
    const [commCurrentUserID, setCommCreateCurrentUserID] = useState(null);
    const [commCurrentUsername, setCommCreateCurrentUsername] = useState(null);

    useEffect(() => {
        const fetchCommissions = async () => {
            await getDocs(collection(db, "Commissions")).then((querySnapshot)=>{
                const newComm = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
                handleCommComponents(newComm);
                handleDisplayCommission(newComm[0]);
                for (var i = 0; i < newComm.length; i++) {
                    if (newComm[i].status === 0) {
                        handleDisplayCommission(newComm[i]);
                        break;
                    }
                }
                setLoading(false);
            });
        }


        fetchCommissions();

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) { 
                //get the userid for future use
                setCommCreateCurrentUserID(user.uid);
                const userDocRef = doc(db, "Portfolio", user.uid);
                const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
                    if (doc.exists()) {
                        const userData = doc.data();
                        setCommCreateCurrentUsername(userData.name);
                    }
                    else {
                        console.log("No such document!");
                    }
                });
                return () => unsubscribeSnapshot();
            }
            else {
                setCommCreateCurrentUserID(null);
            }
        });
        return () => unsubscribe();
    }, []);

    function changeBorderColor(elementID, color) {
        document.getElementById(elementID).style.border = '5px solid ' + color;
    }

    const handleCommCreateButtonOpen = () => {
        setIsCommCreatePopupOpen(true);
        setCommCreateTitle(commTitle);
        setCommCreateDescription(commDescription);
        setCommCreateArtType(commArtType);
        setCommCreatePostDate(commPostDate);
        setCommCreateCompleteDate(commCompleteDate);
        setCommCreateCurrentUserID(commCurrentUserID);
        setCommCreateCurrentUsername(commCurrentUsername);
    }

    const handleCommCreateButtonCreate = async () => {
        const storageRef = ref(storage, `${commCurrentUserID}/profile-picture.jpg`);
        const downloadURL = await getDownloadURL(storageRef);
        if (commTitle && commDescription && commArtType && commCompleteDate)
        {
            try {
                const commDocRef = await addDoc(collection(db, "Commissions"), {
                    clientUsername: commCurrentUsername,
                    clientUserID: commCurrentUserID,
                    title: commTitle,
                    desc: commDescription,
                    artType: commArtType,
                    postDate: commPostDate,
                    completeDate: commCompleteDate,
                    artistUserID: null, //there is no artist at the time of creation
                    artistUsername: null, //there is no artist at the time of creation
                    status: 0,
                    type: "commission",
                    pfp: downloadURL,
                    collabArtists: [null],
                })
                console.log("Document written with ID: ", commDocRef.id);
            } 
            catch (error) {
                console.error("Error adding document: ", error);
            }
            handleCommCreateButtonCancel();
        }
        else
        {
            if (!commTitle) { changeBorderColor("create-title", "red"); }
            if (!commDescription) { changeBorderColor("create-description", "red"); }
            if (!commArtType) { changeBorderColor("create-arttype", "red"); }
            if (!commCompleteDate) { changeBorderColor("create-completedate", "red"); }
        }
        
    };

    const handleCommCreateButtonCancel = () => {
        setIsCommCreatePopupOpen(false);
        setCommCreateTitle(title);
        setCommCreateDescription(description);
        setCommCreateArtType(artType);
        setCommCreatePostDate(postDate);
        setCommCreateCompleteDate(completeDate);
    };

    const handleCommCreateTitle = (event) => {
        changeBorderColor("create-title", "black");
        setCommCreateTitle(event.target.value);
    };

    const handleCommCreateDescription = (event) => {
        changeBorderColor("create-description", "black");
        setCommCreateDescription(event.target.value);
    };

    const handleCommCreateArtType = (event) => {
        changeBorderColor("create-arttype", "black");
        setCommCreateArtType(event.target.value);
    };

    const handleCommCreateCompleteDate = (event) => {
        changeBorderColor("create-completedate", "black");
        setCommCreateCompleteDate(event.target.value);
        setCommCreatePostDate(dateToday);
    };

    const handleDisplayCommission = (comm) => {
        setCurrentComm(comm);
    }

    const handleCommApplyButtonOpen = (comm) => {
        applyCommission(comm);
        setIsApplyConfirmationPopupOpen(true);
    }

    const applyCommission = async (comm) => {
        await updateDoc(doc(db, "Commissions", comm.id), {
            artistUserID: commCurrentUserID,
            artistUsername: commCurrentUsername,
            status: 1
        });
    }


    //https://stackoverflow.com/questions/73476564/how-do-i-disable-future-dates-in-react-js-while-selecting-dates
    var dateToday = new Date().toISOString().split('T')[0];


    function CommissionListing({title, date, pfp, singleCommComp }) {
        return (
            <a href="#" class="commissions-listing" onClick={() => handleDisplayCommission(singleCommComp)}>
                <div>
                    <h1 class="commission-title">{title}</h1>
                    <h2 class="date-created">{date}</h2>
                </div>
                <img class="pfp commissions-listing-pfp" src={pfp} alt="Profile Generic"/>
            </a>
        );
    };

    const commissionCluster = () => {
        // fix this up, find out how to create a list w/ getElementByID or something
        return (
            <div id="commission-cluster-list">
                {commComponents.map((singleComm) => {
                    if ((singleComm.status === 0) && (singleComm.clientUserID !== null)) {
                        return (
                            <CommissionListing 
                                key={singleComm.id}
                                title={singleComm.title}
                                date={singleComm.postDate}
                                pfp={singleComm.pfp}
                                singleCommComp={singleComm}
                            />
                        );
                    }
                })}
            </div>
        )
    }

    const commissionInfo = () => {
        return (
            <div class="commissions-info">
                <h1 class="commissions-info-title bottom-border">
                    {currentComm.title}
                </h1>   
                <p class="commissions-info-description bottom-border">
                    {currentComm.desc}
                </p>
                <p class="commissions-info-arttype bottom-border">
                    {currentComm.artType}
                </p>
                <div class="commissions-info-client-container">
                    <img class="pfp" src={currentComm.pfp} alt="Profile Generic"/>
                   
                    <div class="commissions-info-client-rating">
                    <span class="commissions-info-client-name">
                        {currentComm.clientUsername}
                    </span>
                    </div>
                    <span class="commissions-info-date">
                        Post Date: {currentComm.postDate}
                    </span>
                    <span class="commissions-info-date">
                        Complete by: {currentComm.completeDate}
                    </span>
                </div>
                <div class="commissions-button-container">
                    <button type="apply" class="commissions-create-btn" onClick={() => handleCommApplyButtonOpen(currentComm)} disabled={currentComm.clientUserID === null}>Apply</button>
                </div>
            </div>
        )
    }

    /*
    <div class="search-container">
        <button type="filter" class="commissions-filter-btn">Filter</button>
        <input type="text" class="commissions-search-bar" placeholder="Search..." />
        <button type="submit" class="commissions-search-btn">Submit</button>
    </div>
    */


    // for loading so that data can be loaded properly before
    if (loading) {
        return <h1>LOADING...</h1>;
    }
    else {
    

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
                        <textarea id="create-title" class="comm-input-title" type="text" value={commTitle} onChange={handleCommCreateTitle} placeholder={pholderTitle} required></textarea>
                        <label>Description</label>
                        <textarea id="create-description" class="comm-input-description" type="text" value={commDescription} onChange={handleCommCreateDescription} placeholder={pholderDescription} required/>
                        <label>Art Type</label>
                        <textarea id="create-arttype" class="comm-input-arttype" type="text" value={commArtType} onChange={handleCommCreateArtType} placeholder={pholderArtType} required/>
                        <label>Complete by Date</label>
                        <input id="create-completedate" class="comm-input-completedate" type="date" value={commCompleteDate} onChange={handleCommCreateCompleteDate} min={dateToday} required/>
                        <button class="commissions-create-btn" onClick={handleCommCreateButtonCancel}>
                            Cancel
                        </button>
                        <button class="commissions-create-btn" onClick={handleCommCreateButtonCreate}>
                            Create
                        </button>
                    </div>
                </div>
            )}
            {isApplyConfirmationPopupOpen && (
                <div class="comm-create-popup thank-you-popup">
                    <h2 class="create-commission">Thank you for applying to the commission!</h2> 
                    <button class="commissions-create-btn" onClick={() => setIsApplyConfirmationPopupOpen(false)}>Close</button>
                </div>
            )}
            <div class="commissions-cluster">
                <div class="commissions-listing-container">
                    <ul id="commission-cluster-list">
                        {commissionCluster()}
                    </ul>
                </div>
                <div class="commissions-info-container">
                    {commissionInfo()}
                </div>
            </div>
        </div>

    );
}
}

export default Commissions;
