// Queueing system page
// for ideas

import React from "react";
import "./styles/Queue.css";
import {ProgressBar} from "./ProgressBarArtist"

const Queue = ({comms, userID}) => {
    function QueueList({title, completeDate, status}) {
        return (
            <li class="queue-listing">
                <div class="queue-title-date-container">
                    <label class="queue-title">{title}</label>
                    <br></br>
                    <label class="queue-complete-date">{completeDate}</label>
                </div>
                <div class="queue-progress-bar">
                    <ProgressBar currentStep={status}/>
                </div>
            </li>
        )
    };

    const queueCluster = () => {
        return (
            <div id="commission-cluster-list">
                {comms.map((singleComm) => {
                    console.log(comms.length);
                    if ((singleComm.status !== 0) && (singleComm.artistUserID === userID) && (singleComm.status !== "complete")) {
                        return (
                            <QueueList 
                                key={singleComm.id}
                                title={singleComm.title}
                                completeDate={singleComm.completeDate}
                                status={singleComm.status}
                            />
                        );
                    }}
                )}
            </div>
        )
    };

    return (
        <div class="queue-container"> 
            <ul>
                {queueCluster()}
            </ul>
        </div>
    );
}

export default Queue;