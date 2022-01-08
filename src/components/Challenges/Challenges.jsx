import axios from "axios";
import React from "react";
import "../../style/Challenges.css";
import SingleQuiz from "./SingleQuiz";

class Challenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.fetchChallenges();
  }

  fetchChallenges() {
    axios.get("http://localhost:8000/api/quation/find").then(({ data }) => {
      this.setState({
        questions: data,
      });
    });
  }

  render() {
    return (
      <div>
        {/* <SingleQuiz questions={this.state.questions} /> */}
        {/* <div>
          {this.props.questions.map((oneChall, index) => (
            <SingleQuiz key={index} oneChall={oneChall} />
          ))}
        </div> */}
        <h1>wassim</h1>
      </div>
    );
  }
}

export default Challenges;
