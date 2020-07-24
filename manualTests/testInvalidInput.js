const retriever = require("../index");

// Different scenarios:
retriever.retrieveNucleotideSequences([]).then(console.log);
// Output Error: No Ids. User should put at least one Id in the input array

// retriever.retrieveNucleotideSequences().then(console.log);
// Output Error: Input Ids are not an array.

// retriever.retrieveNucleotideSequences(["badId"]).then(console.log);