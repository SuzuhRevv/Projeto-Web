import React, { useState } from 'react';

function Calculator() {
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [result, setResult] = useState(null);
  const [operator, setOperator] = useState("");

  const clear = () => {
    setNum1(0);
    setNum2(0);
    setResult(0);
    setOperator("");
  };

  const calculate = () => {
    console.log(num1, num2, operator, result)
    let newResult = 0;
    switch (operator) {
      case "+":
        newResult = num1  + num2;
        //setNum1(0), setNum2(0)
        break;
      case "-":
        newResult = num1 - num2;
        break;
      case "*":
        newResult = num1 * num2;
        break;
      case "/":
        newResult = num1 / num2;
        break;
      default:
        newResult = 0;
    }
    setNum1(newResult);
    setResult(newResult);
  };
  

  return (
    <div id="calculator-container">
      <div id="calculator-context">
        <input
          type="number"
          placeholder="Insira um número aqui"
          value={num1}
          onChange={(e) => setNum1(parseFloat(e.target.value))}
        />
        <div id="operators-container">
          <button onClick={() => {
            setOperator("+");
          }}>+</button>
          <button onClick={() => setOperator("-")}>-</button>
          <button onClick={() => setOperator("*")}>*</button>
          <button onClick={() => setOperator("/")}>/</button>
        </div>
        <input
          type="number"
          placeholder="Insira um número aqui"
          value={num2}
          onChange={(e) => setNum2(parseFloat(e.target.value))}
        />
        <button onClick={calculate}>Calcular</button>
        <input
          type="number"
          placeholder="Resultado"
          value={result}
          onChange={(e) => setResult(parseFloat(e.target.value))}
        />
        <button onClick={() => clear()}>Clear</button>
      </div>
    </div>
  );
}

export default Calculator;
