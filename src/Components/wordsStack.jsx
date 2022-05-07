import React from "react";
import Word from "./word";

const WordsStack = ({ wordsArray, solution }) => {
  return (
    <div className="stack">
      {wordsArray.map((word, index) => {
        return <Word word={word} key={index} solution={solution} />;
      })}
    </div>
  );
};

export default WordsStack;
