import React, { useState } from 'react';
import { Container, Screen, Previous, Current, Button } from './Styled';

export default function Calculator() {
  const [previous, setPrevious] = useState('');
  const [current, setCurrent] = useState('');
  const [operation, setOperation] = useState('');

  // Add a values
  const appendValue = (el) => {
    const value = el.target.getAttribute('data');
    if (value === '.' && current.includes('.')) return;
    setCurrent(current + value);
    // console.log(value);
  };

  // Delete the value from the last digit
  const handleDelete = () => {
    setCurrent(String(current).slice(0, -1));
  };

  // Delete all the digits
  const handleAllClear = () => {
    setCurrent('');
    setPrevious('');
    setOperation('');
  };

  // Choose the Operations
  const chooseOperation = (el) => {
    if (current === '') return;
    if (previous !== '') {
      let value = compute();
      setPrevious(value);
    } else {
      setPrevious(current);
    }

    setCurrent('');
    setOperation(el.target.getAttribute('data'));
  };

  // Equal
  const equals = () => {
    let value = compute();
    if (value == undefined || value == null) return;

    setCurrent(value);
    setPrevious('');
    setOperation('');
  };

  // Compute Function
  const compute = () => {
    let result;
    let previousNumber = parseFloat(previous);
    let currentNumber = parseFloat(current);

    if (isNaN(previousNumber) || isNaN(currentNumber)) return;

    switch (operation) {
      case '÷':
        result = previousNumber / currentNumber;
        break;
      case '×':
        result = previousNumber * currentNumber;
        break;
      case '+':
        result = previousNumber + currentNumber;
        break;
      case '-':
        result = previousNumber - currentNumber;
        break;
      case '%':
        result = (previousNumber * currentNumber) / 100;
        break;
      default:
        return;
    }

    return result;
  };
  return (
    <Container>
      <Screen>
        <Previous>
          {previous}
          {operation}
        </Previous>
        <Current>{current}</Current>
      </Screen>
      {/* <Button onClick={handleAllClear} gridSpan={2} control>
        AC
      </Button> */}
      <Button onClick={handleAllClear} control>
        AC
      </Button>
      <Button onClick={handleDelete} control>
        DEL
      </Button>
      <Button data={'%'} onClick={chooseOperation} operation>
        %
      </Button>
      <Button data={'÷'} onClick={chooseOperation} operation>
        ÷
      </Button>
      <Button data={'7'} onClick={appendValue}>
        7
      </Button>
      <Button data={'8'} onClick={appendValue}>
        8
      </Button>
      <Button data={'9'} onClick={appendValue}>
        9
      </Button>
      <Button data={'×'} onClick={chooseOperation} operation>
        ×
      </Button>
      <Button data={'4'} onClick={appendValue}>
        4
      </Button>
      <Button data={'5'} onClick={appendValue}>
        5
      </Button>
      <Button data={'6'} onClick={appendValue}>
        6
      </Button>
      <Button data={'+'} onClick={chooseOperation} operation>
        +
      </Button>
      <Button data={'1'} onClick={appendValue}>
        1
      </Button>
      <Button data={'2'} onClick={appendValue}>
        2
      </Button>
      <Button data={'3'} onClick={appendValue}>
        3
      </Button>
      <Button data={'-'} onClick={chooseOperation} operation>
        -
      </Button>

      <Button data={'0'} onClick={appendValue}>
        0
      </Button>
      <Button data={'00'} onClick={appendValue}>
        00
      </Button>
      <Button data={'.'} period onClick={appendValue}>
        .
      </Button>
      <Button onClick={equals} equals>
        =
      </Button>
    </Container>
  );
}
