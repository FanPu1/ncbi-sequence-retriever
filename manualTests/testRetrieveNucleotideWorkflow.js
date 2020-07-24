const retriever = require("../index");

const nucleotidesIds = ["M65068.1"];

retriever.retrieveNucleotideSequences(nucleotidesIds).then((sequences)=>{
  console.log(sequences);
});

retriever.retrieveNucleotideSequences(nucleotidesIds, "JSON").then((sequences)=>{
  console.log(sequences);
});