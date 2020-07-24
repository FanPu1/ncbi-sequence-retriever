const retriever = require("../index");

const proteinids = ["AAA49004.1","AAK64208.1"];

retriever.retrieveProteinSequences(proteinids).then((sequences)=>{
  console.log(sequences);
});

retriever.retrieveProteinSequences(proteinids, "JSON").then((sequences)=>{
  console.log(sequences);
});