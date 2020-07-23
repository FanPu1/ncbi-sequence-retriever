const NcbiSeqRetriever = require("../index");

const proteinids = ["AAA49004.1","AAK64208.1","NP_033918.1","NP_033919.1","bad_id"];

const retriever = new NcbiSeqRetriever();
retriever.retrieveProteinSequences(proteinids).then(console.log);
retriever.retrieveProteinSequences(proteinids, "JSON").then(console.log);