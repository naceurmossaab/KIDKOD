import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/FirstChallenge.css";

const FirstExercice = () => {
  const [fetchChallengeData, setfetchChallengeData] = useState({
    quations: [{ announcement: "", choices: [] }],
  });

  // variable to move between questions
  const [challNbr, setchallNbr] = useState(0);

  // option selected in a question
  const [selectedOption, setselectedOption] = useState("");

  // array of the user attempts
  const [userChallengeAnswers, setuserChallengeAnswers] = useState([]);

  // array of the correct answers
  // const [challengeCorrectAnswers, setchallengeCorrectAnswers] = useState([]);

  useEffect(() => {
    fetchChallenges();
  });

  const onValueChange = (event) => {
    setselectedOption(event.target.value);
  };

  const compareAnswers = () => {
    var array = fetchChallengeData.quations;
    var correctAnswers = [];
    if (userChallengeAnswers.length < 3) {
      userChallengeAnswers.push(selectedOption);
    }
    for (var i = 0; i < array.length; i++) {
      correctAnswers.push(array[i].correct);
    }
    // setchallengeCorrectAnswers(correctAnswers);

    console.log(correctAnswers);
    console.log(userChallengeAnswers);
    var counter = 0;
    for (var i = 0; i < correctAnswers.length; i++) {
      if (correctAnswers[i] != userChallengeAnswers[i]) {
        counter++;
      }
    }
    var challengeID = "61da00024cc951fb1aa31012";
    var userID = "61dc987ae63acf3b4959f473";
    if (counter === 0) {
      axios
        .get(`http://localhost:8000/api/answer/${challengeID}/${userID}`)
        .then(({ data }) => console.log("response data", data));
      console.log("truee");
    } else {
      axios
        .post("http://localhost:8000/api/answer/add", userChallengeAnswers)
        .then(({ data }) => console.log("response data", data));
      console.log("falsee");
    }
  };

  const passToNextChallenge = () => {
    var newChallNbr = challNbr + 1;
    if (challNbr < 2) {
      setchallNbr(newChallNbr);
    }
    if (userChallengeAnswers.length < 3) {
      userChallengeAnswers.push(selectedOption);
    }
    setselectedOption("");
    var ele = document.getElementsByName("answersRadio");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
  };

  const fetchChallenges = () => {
    axios.get("http://localhost:8000/api/challenge/1").then(({ data }) => {
      setfetchChallengeData(data);
    });
  };

  return (
    <div className="container">
    <img id="close" src="https://i1.pnghost.com/5/15/13/pngdb-logo-material-property-circle-icon-close-cross-png-R4WxA84uYQzP1Fxv8crCSgk5B_t.jpg"/>
      <div>
        <h1>{fetchChallengeData.quations[challNbr].announcement}</h1>
        <div>
          <div>
            <input
              type="radio"
              value={fetchChallengeData.quations[challNbr].choices[0]}
              name="answersRadio"
              onChange={onValueChange}
            />
            <label>{fetchChallengeData.quations[challNbr].choices[0]}</label>
          </div>
          <div>
            <input
              type="radio"
              value={fetchChallengeData.quations[challNbr].choices[1]}
              name="answersRadio"
              onChange={onValueChange}
            />
            <label>{fetchChallengeData.quations[challNbr].choices[1]}</label>
          </div>
          <div>
            <input
              type="radio"
              value={fetchChallengeData.quations[challNbr].choices[2]}
              name="answersRadio"
              onChange={onValueChange}
            />
            <label>{fetchChallengeData.quations[challNbr].choices[2]}</label>
          </div>
          <div>
            <input
              type="radio"
              value={fetchChallengeData.quations[challNbr].choices[3]}
              name="answersRadio"
              onChange={onValueChange}
            />
            <label>{fetchChallengeData.quations[challNbr].choices[3]}</label>
          </div>
        </div>
      </div>
      <div>
        <button className="challengeBTN" onClick={passToNextChallenge}>
          Next
        </button>
        <button className="challengeBTN" onClick={compareAnswers}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default FirstExercice;
