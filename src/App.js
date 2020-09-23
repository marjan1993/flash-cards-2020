import React from "react";
import QuizQuestionForm from "./QuizForm";
import Quiz from "./Quiz";
import "./App.css";
import { 
  BrowserRouter as Router,
  Route,
  Link,
  Redirect 
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/quiz" className="link">
            <h2>Quiz</h2>
          </Link>
          <Link to="form" className="link">
            <h2>Add Questions</h2>
          </Link>
        </header>
        <Route exact path="/" render={() => <Redirect to="/quiz" /> } />
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/form" component={QuizQuestionForm} />
      </div>
    </Router>
  );
}

export default App;
