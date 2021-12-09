const { readLines } = require('./utils');

const d3p1 = (input) => {
  const numBits = input[0].length;

  const mostCommonBits = input.reduce(
    (bitCounts, num) => {
      for (let i = 0; i < numBits; i++) {
        bitCounts[i][num.charAt(i)]++;
      }

      return bitCounts;
    },
    (new Array(numBits))
      .fill(undefined)
      .map(() => ({ '0': 0, '1': 0 }))
  );

  const [gamma, epsilon] = mostCommonBits.reduce(
    ([gamma, epsilon], bitCount) => {
      if (bitCount['1'] >= bitCount['0']) {
        gamma = gamma + '1';
        epsilon = epsilon + '0';
      } else {
        gamma = gamma + '0';
        epsilon = epsilon + '1';
      }

      return [gamma, epsilon];
    },
    ['', '']
  );

  return {
    mostCommonBits,
    gamma,
    epsilon,
    power: parseInt(gamma, 2) * parseInt(epsilon, 2)
  };
};

const input = readLines('./d3input.txt');

const result = d3p1(input);

console.log(result);
