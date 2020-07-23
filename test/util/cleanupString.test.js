const cleanup = require("./../../src/util/cleanUpString");

/**
 * Test that cleanup() method returns expected string.
 */
test("test cleanup() method returns expected string", () => {
  const inputString = "asdfasdfa adsfasdf adsf 12 asdf -- * adsfas";
  const expectedString = "asdfasdfaadsfasdfadsfasdf--*adsfas";
  expect(cleanup(inputString)).toBe(expectedString);
});

/**
 * Test that an expection is thrown by clean up method when the sequence contains illeagle charactors
 */
test("test string contains illeage charactors", ()=> {
  inputString = "SDFASFDn;sdfadsf";
  expect(()=>{
    cleanup(inputString);
  }).toThrow("Sequence contains invalid characters. Sequence: " + inputString);
});

/**
 * Test that an expection is thrown by cleanup() method when the sequence only contains blanks
 */
test("test string contains illeage charactors", ()=> {
  inputString = "    \n    \r     ";
  expect(()=>{
    cleanup(inputString);
  }).toThrow("Invalid sequence: " + inputString);
});