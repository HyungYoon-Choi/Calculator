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

const toLocaleString = (num) => num.toLocaleString('en-US');

const removeCommas = (strNum) => strNum.replace(/,/g, "");

const removeSpaces = (num) => num
  .toString()
  .replace(/\s/g, "");

const math = (a, b, sign) => {
  a = Number(removeCommas(a.toString()));
  b = Number(removeCommas(b.toString()));

  let result = sign === "+"
    ? a + b
    : sign === "-"
      ? a - b
      : sign === "X"
        ? a * b
        : a / b;

  return toLocaleString(result);
};

const App = () => {

  let [calc, setCalc] = useState({ sign: "", num: 0, res: 0 });

  const numClick = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeCommas(calc.num.toString()).length < 16) {
      const newNum = calc.num + value;

      setCalc({
        ...calc,
        num: toLocaleString(Number(removeCommas(newNum))),
        res: !calc.sign
          ? 0
          : calc.res
      });
    }
  };

  const resetClick = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0
    })
  }

  const inverClick = () => {
    if (calc.num) {
      let newNum = Number(removeSpaces(calc.num)) * -1;
      setCalc({
        ...calc,
        num: toLocaleString(newNum)
      });
    }
  };

  const percentClick = () => {
    if (calc.num) {
      let newNum = Number(removeSpaces(calc.num)) / 100;
      setCalc({
        ...calc,
        num: toLocaleString(newNum)
      });
    }
  };

  const signClick = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
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

  const equalsClick = () => {
    if (calc.sign && calc.num) {
      let newResult = math(
        removeCommas(calc.res.toString()),
        removeCommas(calc.num.toString()),
        calc.sign
      );

      setCalc({
        ...calc,
        res: newResult,
        num: 0,
        sign: ''
      });
    }
  };

  const comaClick = () => {
    if (!calc.num.includes(".")) {
      setCalc({
        ...calc,
        num: calc.num + ".",
        res: !calc.sign ? 0 : calc.res
      });
    }
  };

  const buttonClick = (e, btn) => {

    btn === "C"
      ? resetClick()
      : btn === "+-"
        ? inverClick()
        : btn === "%"
          ? percentClick()
          : btn === "/" || btn === "X" || btn === "-" || btn === "+"
            ? signClick(e)
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