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
     <iframe style={{width: 800 , height: 800 , "max-height": "90vh", "border-style": "solid", "border-width": "2px", "border-color": "#888"}}  src="https://www.addictinggames.com/embed/html5-games/24981" title="Jigsaw Puzzle">Jigsaw Puzzle</iframe>
        {/* <FirstChallenge /> */}
      </div>
    );
  }
}

export default Challenges;
