import React, { useState } from 'react';
import Wrapper from './component/Wrapper';
import Screen from './component/Screen';
import ButtonBox from './component/ButtonBox';
import Button from './component/Button';

const btnValuees = [
  [
    "C", "+-", "%", "/"
  ],
  [
    7, 8, 9, 'X'
  ],
  [
    4, 5, 6, '-'
  ],
  [
    1, 2, 3, '+'
  ],
  [
    0, '.', '='
  ]
];

const toLocaleString = (num) => String(num).replace(
  /(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,
  "$1 "
);
const removeSpaces = (num) => num
  .toString()
  .replace(/\s/g, "");
const math = (a, b, sign) => sign === "+"
  ? a + b
  : sign === "-"
    ? a - b
    : sign === "X"
      ? a * b
      : a / b;

const App = () => {

  let [calc, setCalc] = useState({ sign: "", num: 0, res: 0 });

  const numClick = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num: removeSpaces(calc.num) % 1 === 0 && !calc
          .num
          .toString()
          .includes(".")
          ? toLocaleString(Number(removeSpaces(calc.num + value)))
          : toLocaleString(calc.num + value),
        res: !calc.sign
          ? 0
          : calc.res
      })
    }
  }

  const resetClick = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0
    })
  }
  const inverClick = () => { }
  const percentClick = () => { }
  const signClick = (e) => {
    setCalc({
      ...calc,
      sigh: e.target.innerHTML,
      num: 0,
      res: !calc.num
        ? calc.res
        : !calc.res
          ? calc.num
          : toLocaleString(
            math(Number(removeSpaces(calc.res)), Number(!removeSpaces(calc.num)), calc.sign)
          )
    })
  }
  const equalsClick = () => { }
  const comaClick = () => { }
  const buttonClick = (e, btn) => {

    btn === "C"
      ? resetClick()
      : btn === "+-"
        ? inverClick()
        : btn === "%"
          ? percentClick()
          : btn === "/" || btn === "X" || btn === "-" || btn === "+"
            ? signClick()
            : btn === "="
              ? equalsClick()
              : btn === "."
                ? comaClick()
                : numClick(e)

  }

  return (
    <Wrapper>
      <Screen
        value={calc.num
          ? calc.num
          : calc.res} />
      <ButtonBox>
        {
          btnValuees
            .flat()
            .map((btn, i) => (
              <Button
                key={i}
                className={btn === "="
                  ? "equals"
                  : ""}
                value={btn}
                onClick={(e) => buttonClick(e, btn)} />
            ))
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;