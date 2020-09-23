import React, { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../Carousel";
import { carouselContext } from "../context";
import isEmpty from "lodash.isempty";
import "./index.css";

function Quiz() {
  const [questionsList, setQuestionsList] = useState(getQuestionsList());
  const [isFlipped, setIsFlipped] = useState(false);//the isFlipped state value initially be  false because we want to show front side by default, until we click the card 
  const [index, setIndex] = useState(0);//with an initial value of 0

  function handleFlip() {
    setIsFlipped(!isFlipped);//and when the function fires state will change to true 
  }
  function getQuestionsList() {
    const storageQuestionsList = window.localStorage.getItem("questionsList");
    return storageQuestionsList ? JSON.parse(storageQuestionsList) : [];//if it is question we will return it after we parse it back from string to being an array, if isn't any question we return an empty array
  }
  function handleClickRight() {
    setIndex((index +1) % questionsList.length);//if the index of the array becomes the array's length that means we want the index turn back to being 0
  }
  function handleClickLeft() {
    index === 0 ? setIndex(questionsList.length - 1) : setIndex(index - 1);//if index === 0,  that means we are standing on the first element, so instead of just (index - 1) we setIndex to be the last accessible element of the array (questionsList.length - 1)
  }
  function handleDeleteCard() {
    const newQuestionList = questionsList.filter((_,i) => index !== i);//keep all questions and delete the one that have(index === i) because that's the one we don't want anymore
    if (index >= newQuestionList || index <0) setIndex(0);//set the index back to 0 if the index ever exceed its boundaries
    setQuestionsList(newQuestionList);
    window.localStorage.setItem(
      "questionList", JSON.stringify(newQuestionList)
    );
  }

  const carouselContextValue = {
    handleFlip,
    isFlipped,
    questionsList,
    index,
    handleClickRight,
    handleClickLeft
  };

  return (
    <div>
      {
        !isEmpty(questionsList) ? (//if the questionList is empty or not ?
          <div>
            <carouselContext.Provider value={carouselContextValue}>
              <Carousel />
            </carouselContext.Provider>
            <button className="delete-button" onClick={handleDeleteCard}>Delete</button>
          </div>//if is not empty, the question should be shown 
        ) : (
          <div className="flip-card front">
            There are no questions available, please click <Link to="/form">here</Link> to add some
          </div>//and if it is empty we show this message that, There are no questions
        )
      }
    </div>
  );
}

export default Quiz;
