import React, { useEffect, useState } from "react";
import "./styles/Collaborations.css";
import {ProgressBar, ProgressBarArtist} from "./ProgressBarArtist"
import { db, auth } from "./Firebase/Firebase.js";
import { doc, onSnapshot, addDoc, collection, query, where, getDocs, getDoc, Firestore, updateDoc } from "firebase/firestore";




const Collaborations = () => {
    const [commComponents, setCommComponents] = useState([]);
    const [profileComponents, setProfileComponents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentComm, setCurrentComm] = useState(null);
    const [isProgBarActive, setIsProgBarActive] = useState(false);
    const [isQueueActive, setIsQueueActive] = useState(false);
    const [isAddCollabActive, setIsAddCollabActive] = useState(false);
    const [collabArtistID, setCollabArtistID] = useState("");
    const [currentCollaborators, setCurrentCollaborators] = useState(["na", "na"]);

    /* stores the commissions into commComponents 
    redundant, may not need
    const handleCommComponents = (newComm) => {
        setCommComponents(newComm);
    };
    */
    const [commCurrentUserID, setCommCreateCurrentUserID] = useState(null);
    const [commCurrentUsername, setCommCreateCurrentUsername] = useState(null);

    // sets the current commission that is displayed
    const handleDisplayCollab = (comm) => {
        setCurrentComm(comm);
        searchCurrentCollaborators(comm);
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
                setCommComponents(newComm);
                handleDisplayCollab(newComm[0]);
                setLoading(false);
            });
            fetchCollabProfiles();
        }

        fetchCommissions();

        const fetchCollabProfiles = async () => {
            await getDocs(collection(db, "Portfolio")).then((querySnapshot)=> {
                const profiles = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
                setProfileComponents(profiles);
            });
        }

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

    const searchCurrentCollaborators = (comm) => {
        const profileArr = comm.collabArtists;
        var currentProfArr = [];
        if (profileArr[0] === null) {
            currentProfArr = [[null]];
        }
        else {
            profileArr.forEach((prof) => {
                profileComponents.forEach((profComp) => {
                    if (profComp.id === prof) {
                        currentProfArr.push([profComp.name, profComp.id])
                    }
                }) 
            })
        }
        setCurrentCollaborators(currentProfArr);
        
    }

    function MyCollabListing({title, date, pfp, singleCommComp}) {
        return (
            <a href="#" class="collab-listing" onClick={() => handleDisplayCollab(singleCommComp)}>
                <div>
                    <h1 class="collab-title">{title}</h1>
                    <h2 class="date-created">{date}</h2>
                </div>
                <div class="collab-button-container collab-progress-bar collab-queue-container-listings">
                    <ProgressBar currentStep={singleCommComp.status} />
                </div>
                <img class="pfp collab-listing-pfp" src={pfp} alt="Profile Generic"/>
            </a>
        );
    }

    const collabCluster = () => {
        return (
            <div id="collab-cluster-list">
                {commComponents.map((singleComm) => {
                    if ((singleComm.status !== 0) && (singleComm.collabArtists.includes(commCurrentUserID)) && (singleComm.status !== "complete")) {
                        return (
                            <MyCollabListing 
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

    const collabArtistsCluster = () => {
        return (
            <div id="collab-artist-cluster">
                <h3>Collaborators</h3>
                {currentCollaborators.map((singleProf) => {
                    if (singleProf[0] !== null) {
                        return (
                            <div class="collab-info-artists">
                                <span>{singleProf[0]}</span>
                                <label class="collab-artist-info-uid">{singleProf[1]}</label>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

    const collabInfo = () => {
        return (
            <div class="collab-info">
                <h1 class="collab-info-title bottom-border">
                    {currentComm.title}
                </h1>
                <div class="collab-info-artists-container bottom-border">
                    {collabArtistsCluster()}
                </div>
                <p class="collab-info-description bottom-border">
                    {currentComm.desc}
                </p>
                <p class="collab-info-arttype bottom-border">
                    {currentComm.artType}
                </p>
                <div class="collab-info-client-container">
                    <img class="pfp" src={currentComm.pfp} alt="Profile Generic"/>
                   
                    <div class="collab-info-client-rating">
                    <span class="collab-info-client-name">
                        {currentComm.clientUsername}
                    </span>
                    </div>
                    <span class="collab-info-date">
                        Post Date: {currentComm.postDate}
                    </span>
                    <span class="collab-info-date">
                        Complete by: {currentComm.completeDate}
                    </span>
                </div>
                <div class="collab-button-container collab-progress-bar">
                    <ProgressBar currentStep={currentComm.status} />
                </div>
            </div>
        )
    }

    if (loading) {
        return <h1>LOADING...</h1>
    }
    else {
    return (
        <div class="collab-container">
            <div class="collab-header-container">
                <div class="collab-top-nav">
                    <a href="/ProfilePage">
                        <span class="profile-sect">Profile</span>
                    </a>
                    <span>|</span>
                    <a href="/Collaborations">
                        <span class="collab-sect">Collaborations</span>
                    </a>
                </div>
                <div class="search-container">
                </div>
                <div class="update-container">
                </div>
            </div>
            <div class="collab-cluster">
                <div class="collab-listing-container">
                    <ul id="collab-cluster-list">
                        {collabCluster()}
                    </ul>
                </div>
                <div class="collab-info-container">
                    {collabInfo()}
                </div>
            </div>
            <div class="collab-footer">
                <div class="collab-footer-border"></div>
            </div>
        </div>
    );
}
}

export default Collaborations;