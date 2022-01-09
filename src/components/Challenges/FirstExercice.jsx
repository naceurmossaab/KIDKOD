import React from "react";

class FirstExercice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props.questions);
  }
  render() {
    return (
      <div>
        {/* <h1>{this.props.questions[0].announcement}</h1>
        <ul>
          <li>{this.props.questions[0].choices[0]}</li>
          <li>{this.props.questions[0].choices[1]}</li>
          <li>{this.props.questions[0].choices[2]}</li>
        </ul> */}
        <h1>sss</h1>
      </div>
    );
  }
}

export default FirstExercice;
