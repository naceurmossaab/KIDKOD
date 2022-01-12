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
            <img onClick={()=>{this.props.close()}} id="close" src="https://findicons.com/files/icons/1064/3d_cartoon_icons_ii/300/windows_close.png"/>
        <FirstChallenge />
      </div>
    );
  }
}

export default Challenges;
