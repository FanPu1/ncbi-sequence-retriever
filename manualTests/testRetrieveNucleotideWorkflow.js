const NcbiSeqRetriever = require("../index");

const nucleotidesIds = ["M65068.1"];

const retriever = new NcbiSeqRetriever();
retriever.retrieveNucleotideSequences(nucleotidesIds).then(console.log);
retriever.retrieveNucleotideSequences(nucleotidesIds, "JSON").then(console.log);