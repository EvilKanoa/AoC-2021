const fs = require('fs');

module.exports = {
  readLines: (filename, delim = /\n/) => {
    const raw = fs.readFileSync(filename).toString();

    if (raw) {
      return raw.split(delim).filter(x => !!x);
    } else {
      return undefined;
    }
  },
  parseDecimal: (str) => parseInt(str, 10),
  truthy: (x) => !!x,
  unique: (val, idx, self) => self.indexOf(val) === idx,
};
