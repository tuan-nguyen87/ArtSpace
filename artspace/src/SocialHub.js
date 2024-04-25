import React, { useState, useEffect } from "react";
import './styles/SocialHub.css';
import { db } from "./Firebase/Firebase";
import { collection, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";

const SocialHub = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [responses, setResponses] = useState({});
  const [replyIndex, setReplyIndex] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [newQuestionCategory, setNewQuestionCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [categories, setCategories] = useState([
    'General',
    'Portfolio',
    'Profile',
    'Messaging',
    'Commissions',
    'Collaborations',
    'Showroom',
    'Daily Challenges',
    'Arena',
    'Other',
  ]);
 
  
  useEffect(() => {
    // Initialize filteredQuestions with all questions initially
    setFilteredQuestions(questions);
  }, [questions]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "questions"), (snapshot) => {
      const fetchedQuestions = [];
      snapshot.forEach((doc) => {
        fetchedQuestions.push({ id: doc.id, ...doc.data() });
      });
      setQuestions(fetchedQuestions);
    });
    return () => unsubscribe();
  }, []);

  const handleAskQuestions = async () => {
    if (newQuestion.trim() !== '' && newQuestionCategory.trim() !== '') {
      const newQuestionObject = {
        question: newQuestion,
        category: newQuestionCategory,
        responses: [],
      };
  
      try {
        const docRef = await addDoc(collection(db, "questions"), newQuestionObject);
        const questionWithId = { id: docRef.id, ...newQuestionObject }; 
        console.log("Question added with ID: ", docRef.id);
        setQuestions([...questions, questionWithId]); 
      } catch (error) {
        console.error("Error adding question: ", error);
      }
  
      // Add the new question to filteredQuestions as well
      if (selectedCategory === '' || selectedCategory === newQuestionCategory) {
        setFilteredQuestions([...filteredQuestions, newQuestionObject]);
      }
  
      setNewQuestion('');
      setNewQuestionCategory('');
    }
  };
  
  
  

  const handleFilterQuestions = () => {
    // Filter questions based on the selected category
    const filteredQuestions = questions.filter(question => {
      if (selectedCategory === '') {
        return true; // Show all questions if no category selected
      } else {
        return question.category === selectedCategory;
      }
    });

    setFilteredQuestions(filteredQuestions);
  };



  const handleToggleReply = (questionIndex) => {
    setReplyIndex(replyIndex === questionIndex ? null : questionIndex);
  };

  const handleRespond = async (questionIndex, response) => {
    try {
      // Ensure questionIndex is valid
      if (questionIndex < 0 || questionIndex >= questions.length) {
        console.error('Invalid question index:', questionIndex);
        return;
      }
  
      // Ensure questions array is populated
      if (!questions || questions.length === 0) {
        console.error('Questions array is empty or not initialized.');
        return;
      }
  
      // Get the question at the specified index
      const question = questions[questionIndex];
  
      // Ensure question is not undefined
      if (!question) {
        console.error('Question at index', questionIndex, 'is undefined.');
        return;
      }
  
      // Ensure question has an ID
      if (!question.id) {
        console.error('Question ID is undefined or null.');
        return;
      }
  
      // Update Firestore document with the response
      const questionRef = doc(db, "questions", question.id);
      await updateDoc(questionRef, {
        responses: [...question.responses, response]
      });
  
      // Update local state to reflect the change
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].responses.push(response);
      setQuestions(updatedQuestions);
      setResponses({ ...responses, [questionIndex]: '' });
      setReplyIndex(null);
    } catch (error) {
      console.error("Error adding response: ", error);
    }
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
          <select 
            value={newQuestionCategory}
            onChange={(e) => setNewQuestionCategory(e.target.value)}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <button onClick={handleAskQuestions}>Ask</button>
        </div>
      </div>

      <div className="right-section">
      <h2>Recent Questions</h2>
      <div className="filter-section">
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="General">General</option>
          <option value="Portfolio">Portfolio</option>
          <option value="Profile">Profile</option>
          <option value="Messaging">Messaging</option>
          <option value="Commissions">Commissions</option>
          <option value="Collaborations">Collaborations</option>
          <option value="Showroom">Showroom</option>
          <option value="Daily Challenge">Daily Challenge</option>
          <option value="Arena">Arena</option>
          <option value="Other">Other</option>
          
        </select>
        <button id="filterButton" onClick={handleFilterQuestions}>Filter</button>
      </div>

      <div className="question-list">
        {filteredQuestions.map((question, index) => (
          <div key={index} className="question-card">
            <div className="question-details">
              <div className="question-header">Category: {question.category}</div>
              <p>{question.question}</p>
            </div>
            <div className="response-list">
              {showReplies[index] &&
                question.responses.map((response, responseIndex) => (
                  <p key={responseIndex} className="response-item">
                    {response}
                  </p>
                ))}
            </div>
            <div className="reply-section">
              <button onClick={() => handleToggleReply(index)}>
                {replyIndex === index ? 'Cancel Reply' : 'Reply'}
              </button>
              {question.responses.length > 0 && (
                <button onClick={() => setShowReplies({ ...showReplies, [index]: !showReplies[index] })}>
                  {showReplies[index] ? 'Close Replies' : 'Show Replies'}
                </button>
              )}
              {replyIndex === index && (
                <div className="response-form">
                  <textarea
                    id="reply-box"
                    className="r-box"
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
