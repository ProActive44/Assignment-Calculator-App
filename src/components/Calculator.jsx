import React from "react";
import "./Calculator.css";
import { useState } from "react";
const calculateResult = (expression) => {
  const operators = ["+", "-", "*", "/"];
  const tokens = expression.match(/(\d+(\.\d+)?)|([+\-*/])/g) || [];
  const stack = [];
  const postfix = [];

  const getPrecedence = (operator) => {
    switch (operator) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      default:
        return 0;
    }
  };

  for (const token of tokens) {
    if (!isNaN(token)) {
      postfix.push(parseFloat(token));
    } else if (operators.includes(token)) {
      while (
        stack.length > 0 &&
        getPrecedence(stack[stack.length - 1]) >= getPrecedence(token)
      ) {
        postfix.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length > 0) {
    postfix.push(stack.pop());
  }

  const evaluatePostfix = () => {
    const evalStack = [];

    for (const token of postfix) {
      if (!isNaN(token)) {
        evalStack.push(token);
      } else if (operators.includes(token)) {
        const operand2 = evalStack.pop();
        const operand1 = evalStack.pop();
        switch (token) {
          case "+":
            evalStack.push(operand1 + operand2);
            break;
          case "-":
            evalStack.push(operand1 - operand2);
            break;
          case "*":
            evalStack.push(operand1 * operand2);
            break;
          case "/":
            evalStack.push(operand1 / operand2);
            break;
          default:
            break;
        }
      }
    }

    return evalStack[0];
  };

  return evaluatePostfix();
};

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        setResult(eval(input));
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult(0);
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
    "C",
  ];

  return (
    <div className="calculator">
      <div className="display">
        <input type="text" value={input} readOnly />
      </div>
      <div className="buttons">
        {buttons.map((button) => (
          <button key={button} onClick={() => handleButtonClick(button)}>
            {button}
          </button>
        ))}
      </div>
      <div className="result">
        <p>Result: {result}</p>
      </div>
    </div>
  );
};

export default Calculator;
