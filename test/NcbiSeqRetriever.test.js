/* eslint-disable no-unused-vars */

const retriever= require("./../index");
const nucleotidesIds = ["M65068.1"];
const proteinids = ["AAA49004.1","AAK64208.1","NP_033918.1","NP_033919.1"];
const apiKey = "fake_key";

/**
 * Test validateIds(ids) method.
 */
test("test validateIds(ids) method.", ()=>{
  expect(()=>{
    retriever.validateIds("not array");
  }).toThrow(/not an array/);
  expect(()=>{
    retriever.validateIds();
  }).toThrow(/not an array/);
  expect(()=>{
    retriever.validateIds([]);
  }).toThrow(/No Ids/);
  expect(()=>{
    const ids = Array.from({length: 1000}, () => Math.floor(Math.random() * 1000));
    retriever.validateIds(ids);
  }).toThrow(/Too many Ids/);
});

/**
 * Test retrieveNucleotideSequences (ids, api_key) method.
 * I got console.error 
 * Error: Cross origin http://localhost forbidden when perform this test.
 * So I cannot tests these methods:
 * retrieveNucleotideSequences()
 * retrieveProteinSequences()
 * retrieveNCBISequences()
 * The NcbiSeqRetriever is valdated manually through "/manualIntetrationTest/NcbiSeqRetriever.js"
test("test retrieveNucleotideSequences (ids, api_key)", ()=>{
  retriever.retrieveNucleotideSequences(nucleotidesIds, apiKey).then(
    (val)=>{
      return expect(val);
    }
  );
});
*/