import React from "react";

function Info({ handleHideInfo }) {
  return (
    <div className="info-container" onClick={handleHideInfo}>
      <div className="info">
        <div className="circle">
          <img src={require("../Media/myPic.jpeg")} alt="my picture" />
        </div>
        <h3 style={{ color: "darkblue" }}> Ehab Hosam</h3>
        <h5 style={{ color: "#555555" }}> Frontend Web Develper</h5>
        <div className="socialIcons">
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/ehabhosam/">
                <img src={require("../Media/linkedin.png")}></img>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCy6PPDG9HyWhkGs4ltLNzvQ">
                <img src={require("../Media/youtube.png")}></img>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/ehab7osam">
                <img src={require("../Media/twitter.png")}></img>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/ehab7osam/">
                <img src={require("../Media/instagram.png")}></img>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Info;
