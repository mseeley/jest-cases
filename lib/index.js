/* eslint-env jest */

function make(describeEntry, testEntry, entryTitle, cases, callback) {
  const testCases = Array.isArray(cases)
    ? cases.reduce(
        (acc, params, i) => Object.assign(acc, { [`case ${i}`]: params }),
        {}
      )
    : cases;

  const createTests = () => {
    for (const name in testCases) {
      const parameters = testCases[name];

      testEntry(
        name,
        callback.length > 1
          ? done => callback(parameters, done)
          : async () => await callback(parameters)
      );
    }
  };

  if (describeEntry) {
    describeEntry(entryTitle, () => {
      createTests();
    });
  } else {
    createTests();
  }
}

// Binding the entries as parse them makes them impossible to later mock.
module.exports = (...rest) => make(describe, test, ...rest);
module.exports.only = (...rest) => make(describe.only, test, ...rest);
module.exports.skip = (...rest) => make(describe.skip, test, ...rest);
module.exports.inline = (...rest) => make(null, test, null, ...rest);
module.exports.inline.only = (...rest) => make(null, test.only, null, ...rest);
module.exports.inline.skip = (...rest) => make(null, test.skip, null, ...rest);
