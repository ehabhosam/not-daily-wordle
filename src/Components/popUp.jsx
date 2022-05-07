import React from "react";

function PopUp({
  handleNewWordle,
  isRunning,
  currentStreak,
  maxStreak,
  gamesPlayed,
}) {
  let view = isRunning ? "none" : "block";
  return (
    <div className="popUp" style={{ display: view }}>
      <h1>Game State</h1>
      <table>
        <tbody>
          <tr>
            <th>Current Streak</th>
            <th>Max Streak</th>
            <th>Games Played</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>{currentStreak}</td>
            <td>{maxStreak}</td>
            <td>{gamesPlayed}</td>
          </tr>
        </tbody>
      </table>
      <button className="new-wordle-button" onClick={() => handleNewWordle()}>
        New Wordle
      </button>
    </div>
  );
}

export default PopUp;
