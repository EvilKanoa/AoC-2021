const fs = require('fs');

// const d1p2 = (vals) => vals.reduce(
//   ({ count, last }, curr, idx) => {
//       if (idx === 0 || idx === 1) return { count, last };
      
//       const window = curr + vals[idx - 1] + vals[idx - 2];
//       console.log({ idx, window, last, count })
      
//       if (last && window > last) count++;

//       return { count, last: window };
//   },
//   { count: 0, last: undefined }
// );

const d1p2 = (vals) => {
  const windows = vals.reduce((acc, val, idx) => {
    if (idx <= 1) return acc;
    else return [...acc, vals[idx] + vals[idx - 1] + vals[idx - 2]];
  }, []);

  const count = windows.reduce((acc, window, idx) => {
    console.log({ idx, last: idx > 0 ? windows[idx - 1] : undefined, window });
    if (idx === 0) return 0;
    else if (window > windows[idx - 1]) return acc + 1;
    else return acc;
  }, 0);

  console.log(windows)

  return count;
};

const rawInput = fs.readFileSync('./d1input.txt').toString();
const input = rawInput.split(/\n/).filter(x => !!x).map(x => parseInt(x, 10));

const result = d1p2(input);

console.log(result);

