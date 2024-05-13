import React, { useEffect, useState } from "react";
import "./styles/Commissions.css";
import {ProgressBar, ProgressBarArtist} from "./ProgressBarArtist"
import Queue from "./Queue"
import { db, auth } from "./Firebase/Firebase.js";
import { doc, onSnapshot, addDoc, collection, query, where, getDocs, getDoc, Firestore, updateDoc, push, ref } from "firebase/firestore";

const MyCommissions = () => 
{
    const [commComponents, setCommComponents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentComm, setCurrentComm] = useState(null);
    const [isProgBarActive, setIsProgBarActive] = useState(false);
    const [isQueueActive, setIsQueueActive] = useState(false);
    const [isAddCollabActive, setIsAddCollabActive] = useState(false);
    const [collabArtistID, setCollabArtistID] = useState("");

    // stores the commissions into commComponents 
    const handleCommComponents = (newComm) => {
        setCommComponents(newComm);
    };

    const [commCurrentUserID, setCommCreateCurrentUserID] = useState(null);
    const [commCurrentUsername, setCommCreateCurrentUsername] = useState(null);

    // sets the current commission that is displayed
    const handleDisplayCommission = (comm) => {
        setCurrentComm(comm);
    }

    const handleDisplayQueue = (state) => {
        setIsQueueActive(state);
    }

    // finish commission (only works if progress bar is maxed)
    const handleCompleteCommission = async () => {
        await updateDoc(doc(db, "Commissions", currentComm.id), {
            status: 6
        })
        // function to notify ?
        setIsProgBarActive(false);
    }

    const handleAddCollabButton = (state) => {
        setIsProgBarActive(false);
        setIsAddCollabActive(state);
        if ((state === false) && (collabArtistID.length !== 0)) {
            // store / append the collabArtist to the list
            addCollabArtist();
        }
        setCollabArtistID("");
    }

    const addCollabArtist = async () => {
        if (currentComm.collabArtists[0] === null) {
            currentComm.collabArtists[0] = collabArtistID;
        }
        else {
            currentComm.collabArtists.push(collabArtistID);
        }
        
        await updateDoc(doc(db, "Commissions", currentComm.id), {
            collabArtists: currentComm.collabArtists,
            type: "collab"
        });        
    }

    const handleAddCollabID = (event) => {
        setCollabArtistID(event.target.value);
    };

    const handleClientCompleteCommission = async (comm) => {
        console.log("goes through");
        await updateDoc(doc(db, "Commissions", currentComm.id), {
            status: 7
        })
    }

    useEffect(() => {
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
        
        const fetchCommissions = async () => {
            await getDocs(collection(db, "Commissions")).then((querySnapshot)=>{
                const newComm = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
                handleCommComponents(newComm);
                handleDisplayCommission(newComm[0]);
                for (var i = 0; i < newComm.length; i++) {
                    if ((newComm[i].status !== 0) && (newComm[i].artistUserID === commCurrentUserID) && (newComm[i].artistUserID !== null)) {
                        handleDisplayCommission(newComm[i]);
                        break;
                    }
                }
                setLoading(false);
            });
        }

        fetchCommissions();

        return () =>  {
            unsubscribe();
        }
    }, []);

    const handleDisplayProgressBar = (status) => {
        setIsProgBarActive(status);
        if (status === false) {
            updateCommissionStatus(currentComm);
        }
    }

    const getCurrentStep = (comm) => {
        currentComm.status = comm;
    }

    const updateCommissionStatus = async (comm) => {
        await updateDoc(doc(db, "Commissions", comm.id), {
            status: currentComm.status
        })
    }

    function MyCommissionListing({title, date, pfp, singleCommComp }) {
        return (
            <a href="#" class="commissions-listing" onClick={() => handleDisplayCommission(singleCommComp)}>
                <div>
                    <h1 class="commission-title">{title}</h1>
                    <h2 class="date-created">{date}</h2>
                </div>
                <div class="commissions-button-container comm-progress-bar comm-queue-container-listings">
                    <ProgressBar currentStep={singleCommComp.status} />
                </div>
                <img class="pfp commissions-listing-pfp" src={pfp} alt="Profile Generic"/>
            </a>
        );
    };

    const commissionCluster = () => {
        return (
            <div id="commission-cluster-list">
                {commComponents.map((singleComm) => {
                    if ((singleComm.status !== 0) && 
                            (((singleComm.status !== 6) && (singleComm.artistUserID === commCurrentUserID)) || 
                            ((singleComm.status !== 7) && (singleComm.clientUserID === commCurrentUserID)))) {
                        return (
                            <MyCommissionListing 
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
                <div class="commissions-button-container comm-progress-bar">
                    <ProgressBar currentStep={currentComm.status} />
                {(currentComm.artistUserID === commCurrentUserID) && (                
                    <button type="update" class="commissions-create-btn" onClick={() => handleDisplayProgressBar(true)} disabled={(currentComm.artistUserID === null) || (currentComm.clientUserID === commCurrentUserID)}>Update</button>
                )}
                {(currentComm.clientUserID === commCurrentUserID) && (
                    <a href={"/Payment/" + currentComm.id}>
                        <button type="complete" class="commissions-create-btn" onClick={() => handleClientCompleteCommission(currentComm)} disabled={(currentComm.status !== 6)}>Complete</button>
                    </a>
                )}
                </div>
            </div>
        )
    }

    if (loading) {
        console.log("LOADING...");
        return <h1>LOADING...</h1>;
    }
    else {
    

    return (
        <div class="commissions-container">
            <div class="commissions-header">
                <div class="commissions-top-navigator">
                    <a href="/ProfilePage">
                        <span class="explore-sect">Profile</span>
                    </a>
                    <span>|</span>
                    <a href="/MyCommissions">
                        <span class="commissions-sect">My Commissions</span>
                    </a>
                </div>
                <div class="search-container">

                </div>
                <div class="create-container">
                    <button type="create" class="commissions-create-btn" onClick={() => handleDisplayQueue(true)}>
                        Queue
                    </button>
                </div>
            </div>
            {isProgBarActive && (
                <div class="comm-progress-bar-container">
                    <ProgressBarArtist commStep={currentComm.status} getCurrentStep={getCurrentStep}/>
                    <div class="update-buttons-container">
                        <button class="commissions-update-close-btn" onClick={() => handleAddCollabButton(true)} disabled={currentComm.collabArtists.length === 3}>Add Collab</button>
                        <button class="commissions-update-close-btn" onClick={() => handleDisplayProgressBar(false)}>Close</button>
                        <button class="commissions-update-close-btn" onClick={() => handleCompleteCommission()} disabled={currentComm.status !== 5}>Complete</button>
                    </div>

                </div>
            )}
            {isAddCollabActive && (
                <div class="comm-progress-bar-container">
                    <div class="create-commission-form">
                        <label>Collaborator's ID</label>
                        <textarea id="collab-id" class="collab-input-box" type="text" value={collabArtistID} onChange={handleAddCollabID} placeholder={"NA"} required></textarea>
                        <div class="update-buttons-container">
                            <button class="commissions-update-close-btn" onClick={() => handleAddCollabButton(false)}>Close</button>
                        </div>
                    </div>
                </div>

            )}
            {isQueueActive && (
                <div class="comm-queue-container">
                    <Queue comms={commComponents} userID={commCurrentUserID}/>
                    <button class="commissions-create-btn" onClick={() => handleDisplayQueue(false)}>
                        Close
                    </button>
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

export default MyCommissions;
