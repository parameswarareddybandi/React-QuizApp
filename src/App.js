import React, { useState } from "react";
import { questions } from "./Questions";

function App() {
  const [currentQsnIndex, updateIndex] = useState(0);
  const currentQsn = questions[currentQsnIndex];
  const onFirstQuestion = currentQsnIndex === 0;
  const onLastQuestion = currentQsnIndex === questions.length - 1;

  function validateOption(e) {
    var ans = +e.target.value;

    if (ans === questions[currentQsnIndex].correctAnswer) {
      document.body.style.background = 'green';
      const radioButtons = document.getElementsByName("options");
      for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].disabled = true;
      }
    } else {
      document.body.style.background = 'red';
      const radioButtons = document.getElementsByName("options");
      for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].disabled = true;
      }
    }

    setTimeout(() => {
      document.body.style.background = 'rgb(69, 68, 68)';
    }, 3000);
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
              <li key={"qsn_" + i}><input type="radio" name="options" value={i} onClick={(e) => { validateOption(e) }} required />{a}</li>
            ))}
          </ul>
        </div>
        <div id="buttons">
          <button onClick={() => {
            updateIndex(prevIndex => prevIndex - 1);
            const radioButtons = document.getElementsByName("options");
            for (let i = 0; i < radioButtons.length; i++) {
              radioButtons[i].disabled = false;
            }
          }} disabled={onFirstQuestion}>Prev</button>
          <button onClick={() => {
            updateIndex(prevIndex => prevIndex + 1);
            deselectOption();
            const radioButtons = document.getElementsByName("options");
            for (let i = 0; i < radioButtons.length; i++) {
              radioButtons[i].disabled = false;
            }
          }} disabled={onLastQuestion}>Next</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Thank You</h1>
        <button onClick={() => { updateIndex(0); }}>Reset</button>
      </div>
    );
  }


}

export default App;