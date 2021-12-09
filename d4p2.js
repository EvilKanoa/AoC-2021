const { readLines, parseDecimal, truthy, unique } = require('./utils');

// returns a positive score if the board has won and -1 otherwise
const getBoardScore = (board, draws = []) => {
  let hasWon = false;

  // check horizontal lines
  for (let i = 0; i < 5 && !hasWon; i++) {
    if (board[i].every(val => draws.includes(val))) {
      hasWon = true;
      break;
    }
  }

  // check vertical lines
  for (let i = 0; i < 5 && !hasWon; i++) {
    const line = board.map((col) => col[i]);
    if (line.every(val => draws.includes(val))) {
      hasWon = true;
      break;
    }
   }

   if (hasWon) {
    const boardValues = board.flat().filter(unique);
    const unmarked = boardValues.filter(val => !draws.includes(val));
    const sum = unmarked.reduce((a, b) => a + b);
    const lastDraw = draws[draws.length - 1];

    return sum * lastDraw;
   }

   return -1;
};

const parseInput = (input) => {
  const draws = input[0].split(',').filter(truthy).map(parseDecimal);
  const numBoards = (input.length - 1) / 5;
  const boards = [];

  for (let b = 0; b < numBoards; b++) {
    boards.push([
      input[(b * 5) + 1].split(' ').filter(truthy).map(parseDecimal),
      input[(b * 5) + 2].split(' ').filter(truthy).map(parseDecimal),
      input[(b * 5) + 3].split(' ').filter(truthy).map(parseDecimal),
      input[(b * 5) + 4].split(' ').filter(truthy).map(parseDecimal),
      input[(b * 5) + 5].split(' ').filter(truthy).map(parseDecimal),
    ]);
  }

  return { draws, boards };
};

const d4p1 = ({ draws, boards }) => {
  let activeBoards = [...boards];

  for (let i = 1; i <= draws.length; i++) {
    const currentDraws = draws.slice(0, i);

    if (activeBoards.length === 1) {
      const lastBoardScore = getBoardScore(activeBoards[0], currentDraws);
      if (lastBoardScore !== -1) {
        return {
          drawNum: i,
          score: lastBoardScore
        };
      }
    }

    // remove all boards that won at this draw
    activeBoards = activeBoards.filter(board => getBoardScore(board, currentDraws) === -1);
  }

  return {
    drawNum: draws.length,
    score: undefined,
  };
};

const rawInput = readLines('./d4input.txt');
const parsedInput = parseInput(rawInput);

const results = d4p1(parsedInput);

console.log({ parsedInput, results });
