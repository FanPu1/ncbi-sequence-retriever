const NcbiSeqRetriever = require("../index");

const nucleotidesIds = ["M65068.1"];

const retriever = new NcbiSeqRetriever();
retriever.retrieveNucleotideSequences(nucleotidesIds).then((sequences)=>{
  console.log(sequences);
});

retriever.retrieveNucleotideSequences(nucleotidesIds, "JSON").then((sequences)=>{
  console.log(sequences);
});