import React, { useState, useEffect } from "react";
import axios from "axios";

import FirstExercice from "./FirstExercice.jsx";

const FirstChallenge = () => {
  const [fetchChallengeData, setfetchChallengeData] = useState({
    quations: [],
  });

  useEffect(() => {
    fetchChallenges();
  });

  const fetchChallenges = () => {
    axios.get("http://localhost:8000/api/challenge/1").then(({ data }) => {
      setfetchChallengeData(data);
    });
  };

  // const oneQuiz = () => {
  //   for(var i=0; i<fetchChallengeData.quations.length;i++){

  //   }
  // }

  return (
    <div>
      <FirstExercice questions={fetchChallengeData.quations} />

      <button>Next</button>
    </div>
  );
};

export default FirstChallenge;
