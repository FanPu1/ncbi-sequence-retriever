/**
 * test maximum length of the nucleotide sequence can be retreived.
 */
var retriever = require ("../index");
/*
var ids = [
  "MT773134.1", // each sequence have 29,000 bp 
  "MT773133.1",  
  "MT772297.1",
  "MT772294.1",
  "MT772271.1",
  " MT772256.1",
  "MT772253.1",
  "MT772252.1",
  "MT772240.1",
  " MT772215.1 "
];
*/
var ids= ["LT907979.1"];
retriever.retrieveNucleotideSequences(ids, "JSON").then((sequences)=>{
  // console.log(sequences);
  console.log(Object.keys(sequences).length);
});

/*
retriever.retrieveNucleotideSequences(ids).then((sequences)=>{
  console.log(sequences);
});
*/