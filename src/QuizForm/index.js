import React, { useState, useEffect } from "react";
import isEmpty from "lodash.isempty";
import "./index.css";

function QuizQuestionForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionEntity, setQuestionEntity] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    if (!question || !answer) return;//we check that if have valid question and answer input or not ?!! if we don't then return ,we will not continue
    setQuestionEntity({ question, answer });//Each time we submit a question this object(questionEntity) changes to  reflect this new question and answer
    setQuestion("");
    setAnswer("");
  }

  function getQuestionsList() {
    const storedQuestionsList = window.localStorage.getItem("questionsList");//get the existing items from the localStorage
    if (storedQuestionsList)// check if that item from localStorage exist
      return [...JSON.parse(storedQuestionsList), questionEntity];//get all the previous items from the localStorage and then, append new questionEntity to that array
      //*before appending to the new questionEntity, we need to first parse it from string to an array*
    return [questionEntity];//when there is no questionEntity in the localStorage(meaning that either the localStorage get cleared or this the first time using the app) then return it
  }
  function setLocalStorage() {
  if(!questionEntity || isEmpty(questionEntity)) return;//if the questionEntity is valid for addition to the localStorage or not, if it isn't we will return from the function 
  const questionsList = getQuestionsList();
  window.localStorage.setItem("questionsList", JSON.stringify(questionsList));//stuff saved in the localStorage are string, so we have to stringify it before we use it
  }
  useEffect(setLocalStorage, [questionEntity]);//it call the localStorage only when the questionEntity changes

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question-input">Question</label>
        <input 
          type="text" 
          id="question-input" 
          className="display-block" 
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <label htmlFor="question-input">Answer</label>
        <textarea 
          id="answer-input"
          rows="4" 
          cols="50" 
          className="display-block" 
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default QuizQuestionForm;
