const { readLines, parseDecimal } = require('./utils');

const parseInput = (input) => input.map(line => {
  const parts = line.split(' -> ');
  const startParts = parts[0].split(',').map(parseDecimal);
  const endParts = parts[1].split(',').map(parseDecimal);

  return {
    x1: startParts[0],
    y1: startParts[1],
    x2: endParts[0],
    y2: endParts[1]
  };
});

const d5p1 = () => {};

const rawInput = readLines('./d5sampleinput.txt');
const parsedInput = parseInput(rawInput);

const result = d5p1(parsedInput);

console.log({ parsedInput, result });
