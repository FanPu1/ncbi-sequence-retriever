const fs = require("fs");
const FastaSeq = require("./../../src/fasta/FastaSeq");
const DataType = require("./../../src/constants/DataType");

// Below are three individule sequences extracted from fastaDNASequence1.txt manually.
const unnamedSequence1 = "TTTCCCAACAGGATCTCCCACCAGCCCAGCTTTTCTATATAGGCTCTGACCTCTGGTCATCCAAGTTGCAGGATGTCGATGACAGACTTGCTCAGCGCTGAGGACATCAAGAAGGCGATAGGAGCCTTTACTGCTGCAGACTCCTTCGACCACAAAAAGTTCTTCCAGATGGTGGGCCTGAAGAAAAAGAGTGCGGATGATGTGAAGAAGGTGTTCCACATTCTGGACAAAGACAAAAGTGGCTTCATTGAGGAGGATGAGCTGGGGTCCATTCTGAAGGGCTTCTCCTCAGATGCCAGAGACTTGTCTGCTAAGGAAACAAAGACGCTGATGGCTGCTGGAGACAAGGACGGGGACGGCAAGATTGGGGTTGAAGAATTCTCCACTCTGGTGGCCGAAAGCTAAGTGGCGCTGACTGCTTGGGTCTCCCACCTCTCCACCCCCCATGCCCCATCTCAGCCCTTCTCGCGGCCCTCCTGGGTTTCTGTTCAGTTTGTTTATGTTATTTTTTACTCCCCCATCCTTTATGGCCCTCGAATGACACCACTCTTCTGGAAAATGCTGGAGAAACAATAAAGGCTGTACCCATCGGACACCACCTGTAGGGAGGACCCAGGCCTGGTAGGTGTTGGTTTGGCAAGTTTTTCCGGACAGCAGTGGGGGTATAGTAGAAAAAGTGAGAGAGAGCGAAGGACCACGCCCTGATATTTCCTGCCTGCTTGGTACCGAGTGGTCACGTGGGCCACCTTGTTCAGTCTTTGTGCCTTTCCTACAAGGGGATGGGATGGCGCAGGGGATTTTAAAGATGCAGAAACTGCCTTTTAAAGAGCAGAACGGAAGGGGCTGAGTCCACAGGTGATTACTTTATGTCCCTGAGGAATAACTAGGTCGAAGGACTCAAATGACACTCTATCAATTGCTTTTGACTTTGCTGTGATAAAATTCCTGATAAGAGAAACTT";
const sampleSequence2 = "AAACTCCTCTTTGATTCTTCTAGCTGTTTCACTATTGGGCAACCAGACACCAGAATGAGTACTAAAAAGTCTCCTGAGGAACTGAAGAGGATTTTTGAAAAATATGCAGCCAAAGAAGGTGATCCAGACCAGTTGTCAAAGGATGAACTGAAGCTATTGATTCAGGCTGAATTCCCCAGTTTACTCAAAGGTCCAAACACCCTAGATGATCTCTTTCAAGAACTGGACAAGAATGGAGATGGAGAAGTTAGTTTTGAAGAATTCCAAGTATTAGTAAAAAAGATATCCCAGTGAAGGAGAAAACAAAATAGAACCCTGAGCACTGGAGGAAGAGCGCTGTGCTGTGGTCTTATCCTATGTGGAATCCCCCAAAGTCTCTGGTTTAATTCTTTGCAATTATAATAACCTGGCTGTGAGGTTCAGTTATTATTAATAAAGAAATTACTAGACATAC";
const unnamedSequence2 = "TTCGGCCGGC"; 

/**
 * Test {FastaSeq} contains the expected attributes initialized by {BioinformaticsApp}.
 */
test("test FastaSeq constructor and its attributes", () => {
  fs.readFile("./test/seeds/fastaDNASequence1.txt", (err, data) => {
    const fastaSequenceString = data.toString(); 
    const fastaSeq = new FastaSeq("DNA",fastaSequenceString);
    
    // assert data type
    expect(fastaSeq.dataType).toBe(DataType.DNA);
    // assert the orginal fasta sequence saved in the BioinformaticsApp 
    expect(fastaSeq.fastaSequencesString).toBe(fastaSequenceString);
    // assert {SeqMap} inside of {FastaSeq}
    const seqMap = fastaSeq.seqMap;
    expect(seqMap.size).toBe(3);
    expect(seqMap.has("Unnamed sequence 1")).toBe(true);
    expect(seqMap.has("Sample sequence 2")).toBe(true);
    expect(seqMap.has("Unnamed sequence 2")).toBe(true);
    // assert the first sequence in the fasta file
    expect(seqMap.get("Unnamed sequence 1")["sequence"]).toBe(unnamedSequence1);
    expect(seqMap.get("Unnamed sequence 1")["sequenceId"]).toBe("Unnamed sequence 1");
    // assert the sequence in the fasta file
    expect(seqMap.get("Sample sequence 2")["sequence"]).toBe(sampleSequence2);
    expect(seqMap.get("Sample sequence 2")["sequenceId"]).toBe("Sample sequence 2");
    // assert the third sequence in the fasta file
    expect(seqMap.get("Unnamed sequence 2")["sequence"]).toBe(unnamedSequence2);
    expect(seqMap.get("Unnamed sequence 2")["sequenceId"]).toBe("Unnamed sequence 2");
  });
});

/**
 * Test methods in FastaSeq object.
 */
test("test methods in FastSeq if input FASTA string is not blank or empty", () => {
  fs.readFile("./test/seeds/fastaDNASequence1.txt", (err, data) => {
    const fastaSequenceString = data.toString(); 
    const fastaSeqObj = new FastaSeq("DNA",fastaSequenceString);
    const expectedSequenceIds = ["Unnamed sequence 1", "Sample sequence 2", "Unnamed sequence 2"];
    
    // assert that getAllsequenceId() method returns all sequence Ids.
    expect(fastaSeqObj.getAllSequenceIds().sort()).toEqual(expectedSequenceIds.sort());

    // assert that size() method returns 3.
    expect(fastaSeqObj.size()).toBe(3);

    // assert getSequenceById(id) method returns expected sequence.
    expect(fastaSeqObj.getSequenceById("Unnamed sequence 1")).toBe(unnamedSequence1);
    expect(fastaSeqObj.getSequenceById("Unnamed sequence 2")).toBe(unnamedSequence2);
    expect(fastaSeqObj.getSequenceById("Sample sequence 2")).toBe(sampleSequence2);
    expect(()=>{
      fastaSeqObj.getSequenceById("an invalid sequence id");
    }).toThrow("This sequence id is not valid. sequenceId = " + "an invalid sequence id");

    // assert getSequencesWithIds() method returns expected sequences using id as indeces. 
    const expectedSequencesByIdsObjected = {};
    expectedSequencesByIdsObjected["Unnamed sequence 1"] = unnamedSequence1;
    expectedSequencesByIdsObjected["Unnamed sequence 2"] = unnamedSequence2;
    expectedSequencesByIdsObjected["Sample sequence 2"] = sampleSequence2;
    expect(fastaSeqObj.getAllSequencesWithIds()).toEqual(expectedSequencesByIdsObjected);
  });
});

/**
 * Test unnamed FASTA sequence starting with >.
 */
test("test unnamed FASTA sequence and related methods", ()=>{
  const inputSequence = ">    \n ATATATA";
  const expectedSequenceId = "Unnamed sequence 1";
  const expectedSequenceAfterCleanUp = "ATATATA";
  const fastaSequenceObject = new FastaSeq("DNA", inputSequence);
  expect(fastaSequenceObject.fastaSequencesString).toEqual(inputSequence);
  expect(fastaSequenceObject.getAllSequenceIds()).toEqual([expectedSequenceId]);
  expect(fastaSequenceObject.getSequenceById(expectedSequenceId)).toEqual(expectedSequenceAfterCleanUp);
  expect(fastaSequenceObject.size()).toEqual(1);
  expect(fastaSequenceObject.getAllSequencesWithIds()[expectedSequenceId]).toBe(expectedSequenceAfterCleanUp);
  expect(()=>{
    fastaSequenceObject.getSequenceById("ABCD");
  }).toThrow("This sequence id is not valid. sequenceId = ABCD");
});

/**
 * Test that the sequence do no contains any sequenceId.
 */
test ("Test that the sequence do no contains any sequenceId.", ()=>{
  const inputSeq = "DKDGNGY\r\nDKDKCTGAC";
  const inputSeq2 = ">id1\r\nDKDGNGY\r\nDKDKCTGAC";
  const expectedSequenceId = "Unnamed sequence 1";
  const expectedSequenceAfterCleanUp = "DKDGNGYDKDKCTGAC";
  let fastaSeqObject = new FastaSeq("DNA", inputSeq);
  expect(fastaSeqObject.getSequenceById(expectedSequenceId)).toBe(expectedSequenceAfterCleanUp);
  fastaSeqObject = new FastaSeq("DNA", inputSeq2);
  expect(fastaSeqObject.getSequenceById("id1")).toBe(expectedSequenceAfterCleanUp);
});