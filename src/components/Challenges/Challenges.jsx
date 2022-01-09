import React from "react";
import "../../style/Challenges.css";
import FirstChallenge from "./FirstChallenge";

class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <FirstChallenge />
      </div>
    );
  }
}

export default Challenges;
