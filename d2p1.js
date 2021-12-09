const { readLines } = require('./utils');

const d2p1 = (commands) => commands
  .map(command => ({
    direction: command.split(' ')[0],
    value: parseInt(command.split(' ')[1], 10)
  }))
  .reduce(
    (pos, command) => {
      if (command.direction === 'forward') {
        pos.horizontal += command.value;
      } else if (command.direction === 'up') {
        pos.depth -= command.value;
      } else if (command.direction === 'down') {
        pos.depth += command.value;
      }

      return pos;
    },
    { depth: 0, horizontal: 0 }
  );

const input = readLines('./d2input.txt');

const result = d2p1(input);
const answer = result.depth * result.horizontal;

console.log({ result, answer });
