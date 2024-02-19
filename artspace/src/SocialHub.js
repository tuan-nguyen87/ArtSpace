import React, { useState } from "react";
import './styles/SocialHub.css';

const SocialHub = () => {

     const [questions, setQuestions] = useState([]);
     const [newQuestion, setNewQuestion] = useState('');

     const handleAskQuestions = () => {
        if(newQuestion.trim() !== '') {
            setQuestions([...questions, newQuestion]);
            setNewQuestion('');
        }
     };

    
return (
    <div className="s_container">
      <div className="left-section">
        <h2>Ask a Question</h2>
        <div className="question-form">
            <textarea 
              placeholder="Type your question here..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <button onClick={handleAskQuestions}>Ask</button>
        </div>
        <div className="question-list">
            <h2>Recent Questions</h2>
            <ul>
              {questions.map((question, index) => (
                <li key = {index}>{question}</li>
              ))}
            </ul>
        </div>
      </div>

      <div className="right-section">
        <h2>Chat</h2>
        {/*Include chat component here*/}
        <div className="chat-container">

        </div>
      </div>
    </div>
)
};

export default SocialHub;
