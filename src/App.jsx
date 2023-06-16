import React, { useState } from "react";
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

const toLocaleString = (num) => {
  return num.toLocaleString(undefined, { maximumFractionDigits: 12 });
};

const removeSpaces = (num) => {
  return num.toString().replace(/\s/g, "");
};

const App = () => {
  const [calc, setCalc] = useState({
    num: 0,
    sign: "",
    result: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    let value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        result: !calc.sign ? 0 : calc.result,
      });
    }
  };

  const dotHandler = (e) => {
    e.preventDefault();
    let value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signHandler = (e) => {
    e.preventDefault();
    let value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      result: !calc.result && calc.num ? calc.num : calc.result,
      num: 0,
    });
  };

  const equalsHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) => {
        // eslint-disable-next-line no-unused-expressions
        return sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "*"
          ? a * b
          : a / b;
      };

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      result: calc.result ? toLocaleString(removeSpaces(calc.result) * -1) : 0,
      sign: "",
    });
  };

  const percentageHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let result = calc.result ? parseFloat(removeSpaces(calc.result)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      result: (result /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetHandler = () => {
    setCalc({
      ...calc,
      num: 0,
      result: 0,
      sign: "",
    });
  };

  return (
    <Calculator>
      <Screen value={calc.num ? calc.num : calc.result} />
      <ButtonWrapper>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetHandler
                  : btn === "+-"
                  ? invertHandler
                  : btn === "%"
                  ? percentageHandler
                  : btn === "="
                  ? equalsHandler
                  : btn === "/" || btn === "+" || btn === "-" || btn === "*"
                  ? signHandler
                  : btn === "."
                  ? dotHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonWrapper>
    </Calculator>
  );
};

export default App;
