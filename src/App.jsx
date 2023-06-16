import React from "react";
import Calculator from "./components/Calculator";
import Button from "./components/Button";
import Screen from "./components/Screen";
import ButtonWrapper from "./components/ButtonWrapper";
import "./App.css";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const App = () => {
  return (
    <Calculator>
      <Screen value={0} />
      <ButtonWrapper>
        {btnValues.flat().map((btn, key) => {
          <Button
            key={key}
            className={btn === "=" ? "equals" : ""}
            value={btn}
            onClick={() => {
              console.log("clicked");
            }}
          />;
        })}
      </ButtonWrapper>
    </Calculator>
  );
};

export default App;
