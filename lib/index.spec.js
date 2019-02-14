/* eslint-env jest */

describe("index", () => {
  it("exports the expected members", () => {
    expect(Object.keys(require("./index"))).toMatchSnapshot();
  });
});
