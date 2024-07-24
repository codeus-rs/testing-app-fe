import React, { useState } from 'react';
import axios from 'axios';
// const axios = require('axios');

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleCalculate = async () => {
    try {
      const response = await axios.post('http://localhost:5001/calculate', {
        expression: input,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error calculating:', error);
    }
  };

  return (
    <div className="container">
      <h1>Calculator</h1>
      <div className="calculator">
        <input type="text" value={input} readOnly data-testid="input-field" />
        <div className="buttons">
          {'1234567890+-*/'.split('').map((char) => (
            <button key={char} onClick={() => handleClick(char)}>
              {char}
            </button>
          ))}
          <button onClick={handleClear} data-testid="button-C">
            C
          </button>
          <button onClick={handleCalculate}>=</button>
        </div>
      </div>
      {result && <div className="result">Result: {result}</div>}
    </div>
  );
};

export default Calculator;
