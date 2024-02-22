import React, { useState } from "react";
import './styles/SocialHub.css';

const SocialHub = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [responses, setResponses] = useState({});
  const [replyIndex, setReplyIndex] = useState(null);

  const handleAskQuestions = () => {
    if (newQuestion.trim() !== '') {
      setQuestions([...questions, { question: newQuestion, responses: [] }]);
      setNewQuestion('');
    }
  };

  const handleToggleReply = (questionIndex) => {
    setReplyIndex(replyIndex === questionIndex ? null : questionIndex);
  };

  const handleRespond = (questionIndex, response) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].responses.push(response);
    setQuestions(updatedQuestions);
    setResponses({ ...responses, [questionIndex]: '' });
    setReplyIndex(null);
  };

  return (
    <div className="social-page">
      <div className="s_container">
      <div className="s_left-section">
        <h2>Ask a Question</h2>
        <div className="question-form">
          <textarea 
            placeholder="Type your question here..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button onClick={handleAskQuestions}>Ask</button>
        </div>
      </div>

      <div className="right-section">
        <h2>Recent Questions</h2>
        <div className="question-list">
          {questions.map((question, index) => (
            <div key={index} className="question-card">
              <div className="question-details">
                <p>{question.question}</p>
              </div>
              <div className="response-list">
                {question.responses.map((response, responseIndex) => (
                  <p key={responseIndex} className="response-item">{response}</p>
                ))}
              </div>
              <div className="reply-section">
                <button onClick={() => handleToggleReply(index)}>
                  {replyIndex === index ? "Cancel" : "Reply"}
                </button>
                {replyIndex === index && (
                  <div className="response-form">
                    <textarea 
                      placeholder="Type your response here..."
                      value={responses[index] || ''}
                      onChange={(e) => {
                        const updatedResponses = { ...responses, [index]: e.target.value };
                        setResponses(updatedResponses);
                      }}
                    />
                    <button onClick={() => handleRespond(index, responses[index])}>Respond</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SocialHub;
