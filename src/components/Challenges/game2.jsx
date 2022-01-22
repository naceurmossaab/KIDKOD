import React from "react";
import "../../style/game2.css";

class Game2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
 <img
              className="challenge-close icon"
              src="https://cdn3d.iconscout.com/3d/premium/thumb/close-4112733-3408782@0.png"
              onClick={()=>{this.props.close()}}            />     <iframe style={{width: 800 , height: 800 , "max-height": "90vh", "border-style": "solid", "border-width": "2px", "border-color": "#888"}}  src="https://www.addictinggames.com/embed/html5-games/23974" title="Jigsaw Puzzle">Jigsaw Puzzle</iframe>
        {/* <FirstChallenge /> */}
      </div>
    );
  }
}

export default Game2;
