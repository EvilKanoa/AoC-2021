// Next, you should verify the life support rating, which can be determined by multiplying the oxygen generator
// rating by the CO2 scrubber rating.

// Both the oxygen generator rating and the CO2 scrubber rating are values that can be found in your diagnostic
// report - finding them is the tricky part. Both values are located using a similar process that involves 
// filtering out values until only one remains. Before searching for either rating value, start with the full
// list of binary numbers from your diagnostic report and consider just the first bit of those numbers. Then:

// Keep only numbers selected by the bit criteria for the type of rating value for which you are searching.
// Discard numbers which do not match the bit criteria.
// If you only have one number left, stop; this is the rating value for which you are searching.
// Otherwise, repeat the process, considering the next bit to the right.
// The bit criteria depends on which type of rating value you want to find:

// To find oxygen generator rating, determine the most common value (0 or 1) in the current bit position,
// and keep only numbers with that bit in that position. If 0 and 1 are equally common, keep values with
// a 1 in the position being considered.
// To find CO2 scrubber rating, determine the least common value (0 or 1) in the current bit position,
// and keep only numbers with that bit in that position. If 0 and 1 are equally common, keep values with
// a 0 in the position being considered.

const { readLines } = require('./utils');

const lifeCalc = (numbers, doCO2 = false, idx = 0) => {
  if (numbers[0].length < idx) {
    console.error('lifeCalc over recurse - idx is greater than number length');
    return undefined;
  }

  // find most common value at idx in numbers
  const valueDiff = numbers.reduce(
    (diff, number) => number.charAt(idx) === '1' ? diff + 1 : diff - 1,
    0
  );

  const keepBit = (doCO2 ? valueDiff < 0 : valueDiff >= 0) ? '1' : '0';

  // remove all numbers that dont have most common
  const filteredNumbers = numbers.filter(num => num.charAt(idx) === keepBit);

  // check if a number is found
  if (filteredNumbers.length <= 1) {
    return filteredNumbers[0] || undefined;
  }

  // recurse otherwise
  return lifeCalc(filteredNumbers, doCO2, idx + 1);
};

const d3p2 = (input) => {
  const oxygenRating = lifeCalc(input, false);
  const co2Rating = lifeCalc(input, true);

  return {
    oxygenRating,
    co2Rating,
    lifeSupportRating: parseInt(oxygenRating, 2) * parseInt(co2Rating, 2)
  };
};

const input = readLines('./d3input.txt');

const result = d3p2(input);

console.log(result);
