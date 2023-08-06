import React, { useState } from "react";
import { questions } from "./Questions";

function App() {
  const [currentQsnIndex, updateIndex] = useState(0);
  const currentQsn = questions[currentQsnIndex];
  let [score, setScore] = useState(0);

  function validateOption(e) {
    var ans = +e.target.value;
    
      if (ans === questions[currentQsnIndex].correctAnswer) {
        const radioButtons = document.getElementsByName("options");
        for (let i = 0; i < radioButtons.length; i++) {
          if (radioButtons[i].checked) {
            setScore(++score);
          } 
        }
      } 

  }

  function deselectOption() {
    const radioButtons = document.getElementsByName("options");

    for (let i = 0; i < radioButtons.length; i++) {
      radioButtons[i].checked = false;
    }
  }



  if (currentQsnIndex < questions.length) {
    return (
      <div>
        <h1> React Quiz </h1>
        <img src="https://th.bing.com/th/id/OIP.O5TtputgI0PbmDwQ-9Nu9wHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt='quizApp-logo' />
        <div id="questionForm">
          <h3>{currentQsn.question}</h3></div>
          <div id="optionForm">
          <ul>
            {currentQsn.answers.map((a, i) => (
              <li key={"qsn_" + i}><input className="radioInput" type="radio" name="options" id={i} value={i} onClick={(e) => { validateOption(e) }} required />{a}</li>
            ))}
          </ul>
        </div>
        <div id="buttons">

          <button onClick={() => {
            updateIndex(prevIndex => prevIndex + 1);
            deselectOption();
            const radioButtons = document.getElementsByName("options");
            for (let i = 0; i < radioButtons.length; i++) {
              radioButtons[i].disabled = false;
            }
          }} >Next</button>

        </div>
      </div>
    );
  } else {
    if(score >= 7){
      document.body.style.background = "green";
    }
    else{
      document.body.style.background = "red";
    }
    return (

      <div id="result">
        <h1> Score </h1>
        <h3> You scored {score} out of 10.</h3>
        <button className="retake" onClick={() => { updateIndex(0); }}>Retake the test</button>
      </div>

    );
  }


}

export default App;