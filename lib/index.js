/* eslint-env jest */

// Binding the entries at parse them makes them impossible to later mock.
function make(describeEntry, testEntry, describeEntryTitle, cases, callback) {
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
    describeEntry(describeEntryTitle, () => {
      createTests();
    });
  } else {
    createTests();
  }
}

/**
 * Utility to create data-driven test variants.
 *
 * @function cases
 * @param  {string}  describeEntryTitle  The title given to the `describe`
 * entry.
 * @param  {object|array} cases  An object of `test` name to parameters or an
 * array of test parameters.
 * @param  {function} callback The callback responsible for assertions.
 * @return {void} Triggers side effects, returns nothing.
 *
 * @example <caption>Generate test names automatically</caption>
 * // Assert sums equal to 42. Names the created tests `case 0` and `case 1`
 * cases("sums of 42", [[40, 2], [21, 21]], ([i, j]) =>
 *   expect(i + j).toEqual(42)
 * );
 *
 * @example <caption>Provide bespoke names for tests</caption>
 * // Assert day of week is < 7. Names the created tests `mon` and `tues`
 * cases("days of week", { sun: 0, mon: 1 }, (dayOfWeek) =>
 *   expect(dayOfWeek < 7)
 * );
 *
 * @example <caption>Use async/await</caption>
 * cases("async/await", ['config.json', 'config.yaml'], async url => {
 *   const response = await readFile(url);
 *   expect(response).toMatchSnapshot();
 * });
 *
 * @example <caption>Use the done callback</caption>
 * cases("async callback", [100, 200], (delay, done) => {
 *   const start = Date.now();
 *   setTimeout(() => {
 *     expect(Date.now() - start).toBeGreaterThanOrEqual(delay);
 *     done();
 *   }, delay);
 * });
 *
 */
const cases = (...rest) => make(describe, test, ...rest);

/**
 * A variation of `cases` that will output a `describe.only` entry. The
 * arguments accepted and behaviors are identical to `cases`.
 *
 * @see {@link cases}
 */
cases.only = (...rest) => make(describe.only, test, ...rest);

/**
 * A variation of `cases` that will output a `describe.skip` entry. The
 * arguments accepted and behaviors are identical to `cases`.
 *
 * @see {@link cases}
 */
cases.skip = (...rest) => make(describe.skip, test, ...rest);

/**
 * A variation of `cases` that avoids outputting a `describe` entry. Instead
 * `test` entries are outputted inline. This is useful to nest tests within an
 * existing `describe` entry.
 *
 * @param  {object|array} cases  An object of `test` name to parameters or an
 * array of test parameters.
 * @param  {function} callback The callback responsible for assertions.
 * @return {void} Triggers side effects, returns nothing.
 *
 * @example <caption>Generate test names automatically</caption>
 * // Assert sums equal to 42. Names the created tests `case 0` and `case 1`
 * cases.inline([[40, 2], [21, 21]], ([i, j]) => { expect(i + j).toEqual(42); });
 *
 * @example <caption>Provide bespoke names for tests</caption>
 * // Assert day of week is < 7. Names the created tests `mon` and `tues`
 * cases.inline({ sun: 0, mon: 1 }, (dayOfWeek) => { expect(dayOfWeek < 7); });
 *
 */
cases.inline = (...rest) => make(null, test, null, ...rest);

/**
 * A variation of `cases.inline` that will output a `test.only` entry. The
 * arguments accepted and behaviors are identical to `cases`.
 *
 * @see {@link cases.inline}
 */
cases.inline.only = (...rest) => make(null, test.only, null, ...rest);

/**
 * A variation of `cases.inline` that will output a `test.skip` entry. The
 * arguments accepted and behaviors are identical to `cases`.
 *
 * @see {@link cases.inline}
 */
cases.inline.skip = (...rest) => make(null, test.skip, null, ...rest);

module.exports = cases;
