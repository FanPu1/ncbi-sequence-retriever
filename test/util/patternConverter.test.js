const convertPatternToRegExp = require("./../../src/util/patternConverter");

/**
 * Test convertPatternToRegExp() return expected {RegExp} string.
 */
test("test convertPatternToRegExp() happy flow", ()=>{
  const pattern = "<[DNS]-x-[DNS]-{FLIVWY}-[DNESTG]-[DNQGHRK]-{GP}-[LIVMC]-[DENQSTAGC]-x(2)-[ED]>";
  const expectedOutput = "^[DNS]\\w[DNS][^FLIVWY][DNESTG][DNQGHRK][^GP][LIVMC][DENQSTAGC]\\w{2}[ED]$";
  expect(convertPatternToRegExp(pattern)).toEqual(expectedOutput);
});

/**
 * Test convertPatternToRegExp() when error when input is not valid.
 */
test("test convertPatternToRegExp() when error when input is not valid", ()=>{
  expect(()=>{
    convertPatternToRegExp();
  }).toThrow("The input patterns cannot be null or undefined.");
  expect(()=>{
    convertPatternToRegExp(null);
  }).toThrow("The input patterns cannot be null or undefined.");
  expect(()=>{
    convertPatternToRegExp(undefined);
  }).toThrow("The input patterns cannot be null or undefined.");
  expect(()=>{
    convertPatternToRegExp("");
  }).toThrow("The input patterns cannot be blank string or an empty string.");
  expect(()=>{
    convertPatternToRegExp("    \r\n   ");
  }).toThrow("The input patterns cannot be blank string or an empty string.");
});