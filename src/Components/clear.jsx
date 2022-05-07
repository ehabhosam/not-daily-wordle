import React from "react";

function Clear({ handleHideClear, Initialize }) {
  return (
    <div className="info-container" onClick={handleHideClear}>
      <h2>Do you want to erase all data?</h2>
      <br />
      <button onClick={Initialize}>Yes</button>
    </div>
  );
}

export default Clear;
