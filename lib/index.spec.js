/* eslint-env jest */

const cases = require("./index");

describe("when creating test cases", () => {
  let describeSpy;
  let testSpy;

  beforeEach(() => {
    describeSpy = jest
      .spyOn(global, "describe")
      .mockImplementation((title, fn) => {
        fn();
      });

    testSpy = jest.spyOn(global, "test").mockImplementation((name, fn) => {
      // Callbacks passed to test should be provided a done function when they
      // they have an arity.
      if (fn.length) {
        fn(() => {});
      } else {
        fn();
      }
    });
  });

  it("creates a describe entry", () => {
    cases("my case", [], () => {});

    expect(describeSpy).toHaveBeenCalledTimes(1);
    expect(describeSpy.mock.calls[0][0]).toEqual("my case");
    expect(typeof describeSpy.mock.calls[0][1]).toEqual("function");
  });

  it("creates a describe.only entry", () => {
    describeSpy.only = jest.fn((title, fn) => fn());

    cases.only("my case", [], () => {});

    expect(describeSpy.only).toHaveBeenCalledTimes(1);
    expect(describeSpy.only.mock.calls[0][0]).toEqual("my case");
    expect(typeof describeSpy.only.mock.calls[0][1]).toEqual("function");
  });

  it("creates a describe.skip entry", () => {
    describeSpy.skip = jest.fn((title, fn) => fn());

    cases.skip("my case", [], () => {});

    expect(describeSpy.skip).toHaveBeenCalledTimes(1);
    expect(describeSpy.skip.mock.calls[0][0]).toEqual("my case");
    expect(typeof describeSpy.skip.mock.calls[0][1]).toEqual("function");
  });

  it("create a test entry", () => {
    cases("my case", [0], () => {});

    expect(testSpy).toHaveBeenCalledTimes(1);
    expect(testSpy.mock.calls[0][0]).toEqual("case 0");
    expect(typeof testSpy.mock.calls[0][1]).toEqual("function");
  });

  it("creates named test entry", () => {
    cases("my case", { "my test": [0] }, () => {});

    expect(testSpy).toHaveBeenCalledTimes(1);
    expect(testSpy.mock.calls[0][0]).toEqual("my test");
    expect(typeof testSpy.mock.calls[0][1]).toEqual("function");
  });

  it("create a test entry without a describe entry", () => {
    cases.inline([0], () => {});

    expect(describeSpy).toHaveBeenCalledTimes(0);

    expect(testSpy).toHaveBeenCalledTimes(1);
    expect(testSpy.mock.calls[0][0]).toEqual("case 0");
    expect(typeof testSpy.mock.calls[0][1]).toEqual("function");
  });

  it("create a test.skip entry without a describe entry", () => {
    testSpy.skip = jest.fn((title, fn) => fn());

    cases.inline.skip([0], () => {});

    expect(describeSpy).toHaveBeenCalledTimes(0);

    expect(testSpy.skip).toHaveBeenCalledTimes(1);
    expect(testSpy.skip.mock.calls[0][0]).toEqual("case 0");
    expect(typeof testSpy.skip.mock.calls[0][1]).toEqual("function");
  });

  it("create a test.only entry without a describe entry", () => {
    testSpy.only = jest.fn((title, fn) => fn());

    cases.inline.only([0], () => {});

    expect(describeSpy).toHaveBeenCalledTimes(0);

    expect(testSpy.only).toHaveBeenCalledTimes(1);
    expect(testSpy.only.mock.calls[0][0]).toEqual("case 0");
    expect(typeof testSpy.only.mock.calls[0][1]).toEqual("function");
  });

  it("calls test entries with parameters", () => {
    const fn = jest.fn();
    const params = [0, 1];

    cases("my case", params, fn);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn.mock.calls[0].length).toEqual(1);
    expect(fn.mock.calls[1].length).toEqual(1);
    expect(fn.mock.calls[0][0]).toEqual(params[0]);
    expect(fn.mock.calls[1][0]).toEqual(params[1]);
  });

  it("calls async callback based test entries with params and done callback", () => {
    const fn = jest.fn((params, done) => {});
    const params = [0];

    cases("my case", params, fn);

    expect(fn.mock.calls[0].length).toEqual(2);
    expect(fn.mock.calls[0][0]).toEqual(params[0]);
    expect(typeof fn.mock.calls[0][1]).toEqual("function");
  });
});

describe("when executing test cases", () => {
  cases("synchronous", [0], input => {
    expect(input).toEqual(input);
  });

  cases("async callback", [0], (input, done) => {
    setTimeout(() => {
      expect(input).toEqual(input);
      done();
    }, 50);
  });

  cases("async/await", [0], async input => {
    function identity(_) {
      return new Promise(resolve => {
        setTimeout(() => resolve(_), 50);
      });
    }

    const expected = await identity(input);

    expect(expected).toEqual(input);
  });
});
