import React, { useState } from 'react';
import axios from 'axios';

const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD'];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');

  const handleConvert = async () => {
    try {
      const response = await axios.post('http://localhost:5001/convert', {
        amount,
        fromCurrency,
        toCurrency,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <div className="converter">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="buttons">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <button onClick={handleSwap}>⇄</button>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <button onClick={handleConvert}>Convert</button>
        </div>
      </div>
      {result && <div className="result">Converted Amount: {result}</div>}
    </div>
  );
};

export default CurrencyConverter;
