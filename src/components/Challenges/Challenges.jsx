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
    {/* // <iframe style={{width: "100%" , height: 600 , "max-height": "90vh", "border-style": "solid", "border-width": "2px", "border-color": "#888"}}  src="https://www.jigsawexplorer.com/online-jigsaw-puzzle-player.html?frm=1&url=aHR0cHM6Ly93d3cuZnJlZWljb25zcG5nLmNvbS90aHVtYnMvY29tcHV0ZXItcG5nLWhkL2NvbXB1dGVyLWRlc2t0b3AtcGMtcG5nLXRyYW5zcGFyZW50LTMxLnBuZw~~&nop=8&color=lavender" title="Jigsaw Puzzle">Jigsaw Puzzle</iframe> */}
        <FirstChallenge />
      </div>
    );
  }
}

export default Challenges;
