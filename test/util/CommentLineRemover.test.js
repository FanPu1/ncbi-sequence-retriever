const CommentLineRemover = require("./../../src/util/CommentLineRemover");


const fastaFileString = ">sequence_Id\r\n;this is a comment line.\n;this is another comment line/\nCATATG";
const expectedOutputString = ">sequence_Id\nCATATG";
/**
 * Test that removeCommentLine(string) method can remove comment from a string representive of a FASTA sequence.
 */
test("test removeCommentLine method", ()=>{
  const remover = new CommentLineRemover();
  expect(remover.removeCommentLine(fastaFileString)).toBe(expectedOutputString);
});