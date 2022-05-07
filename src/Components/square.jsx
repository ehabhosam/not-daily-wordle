import React from "react";

const Square = ({ letter, colorState, word, index }) => {
  let delay = (index * 500).toString().concat(" ", "ms");
  let classes = "square";
  if (letter !== " ") {
    classes = "square letter-entry-animation";
    setTimeout(() => (classes = "square"), 210);
  }
  if (word.submitted) {
    classes = "square flip";
    setTimeout(() => (classes = "square"), 510);
  }
  const styles = {
    default: {
      backgroundColor: "transparent",
      border: `2px solid ${letter !== " " ? "#565758" : "#262627"}`,
      width: "7.3vh",
      height: "7.3vh",
    },
    right: {
      backgroundColor: "#538d4e",
      transition: `background-color ${delay}ms`,
    },
    semiRight: {
      backgroundColor: "#b59f3b",
      transition: `background-color ${delay}ms`,
    },
    wrong: {
      backgroundColor: "#3a3a3c",
      transition: `background-color ${delay}ms`,
    },
  };
  let styling =
    colorState === "right"
      ? styles.right
      : colorState === "semiRight"
      ? styles.semiRight
      : colorState === "wrong"
      ? styles.wrong
      : styles.default;
  return (
    <div style={styling} className={classes}>
      {letter.toUpperCase()}
    </div>
  );
};

export default Square;
