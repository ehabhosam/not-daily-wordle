import React from "react";

const KeyboardButton = ({ keyLetter, handleKeyboardClick, enteredLetters }) => {
  let colorState = "default";
  if (keyLetter !== "enter" && keyLetter !== "backspace") {
    colorState = enteredLetters.right.includes(keyLetter)
      ? "right"
      : enteredLetters.semiRight.includes(keyLetter)
      ? "semiRight"
      : enteredLetters.wrong.includes(keyLetter)
      ? "wrong"
      : "default";
  }
  return keyLetter === "enter" ? (
    <div
      onClick={() => handleKeyboardClick(keyLetter)}
      style={{ cursor: "pointer", width: "9vh", backgroundColor: "#818384" }}
      className="keyboardbutton"
    >
      {keyLetter.toUpperCase()}
    </div>
  ) : keyLetter === "backspace" ? (
    <div
      onClick={() => handleKeyboardClick(keyLetter)}
      style={{ cursor: "pointer", width: "9vh", backgroundColor: "#818384" }}
      className="keyboardbutton"
    >
      <img src={require("../Media/backspace.png")} alt="backspace" />
    </div>
  ) : (
    <div
      onClick={() => handleKeyboardClick(keyLetter)}
      style={
        colorState === "right"
          ? styles.right
          : colorState === "semiRight"
          ? styles.semiRight
          : colorState === "wrong"
          ? styles.wrong
          : styles.default
      }
      className="keyboardbutton keyboard-letter"
    >
      {keyLetter.toUpperCase()}
    </div>
  );
};

export default KeyboardButton;

const styles = {
  default: {
    backgroundColor: "#818384",
  },
  right: {
    backgroundColor: "#538d4e",
  },
  semiRight: {
    backgroundColor: "#b59f3b",
  },
  wrong: {
    backgroundColor: "#3a3a3c",
  },
};
