# ncbi-sequence-retriever
*"ncbi-sequence-retriever"* is a light-weighted javascript package to fetch nucleotide or protein sequences from NCBI databases. This package is a simplified wrapper for [EFetch utility of NCBI E-utilities API](https://www.ncbi.nlm.nih.gov/books/NBK25499/#chapter4.EFetch). 

This tool can fetch upto **100** protein sequences or  upto **10 short** nuclotide sequences in one sequence retrieve call. We strongly recommend that the lenght of each nucleotide sequence for query should be less than *100,000* bp.

The retrieved sequences can be returned as a string in FASTA format, or be returned as a javascipt object.

*"ncbi-sequence-retriever"* is also a component of "NCBI-sequence" module in ["bioinformatics-hub"](https://www.npmjs.com/package/bioinformatics-hub) project.

## Installation
```
npm install ncbi-sequence-retriever --save
```

## Fetch **protein** sequences from NCBI
Here are examples to fetch mulitple protein sequences from [NCBI protein databse](https://www.ncbi.nlm.nih.gov/protein/) with user-provided ACCESSION Ids.

#### Return a string representive of sequences in FASTA format 
```
var retriever = require ("ncbi-sequence-retriever");

var proteinIds = ["AAA49004.1","AAK64208.1"];  // add upto 100 accession Ids in this array
retriever.retrieveProteinSequences(proteinIds).then((sequences)=>{
  console.log(sequences);
});
```
The output from above code: 
```
>AAA49004.1 parvalbumin, partial [Gallus gallus]
FIEEDELKFVLKGFTPDGRDLSDKETKALLAAGDKDGDGKIGVEK

>AAK64208.1 calbindin D9k [Mus musculus]
MCAEKSPAEMKSIFQKYAAKEGDPDQLSKEELKLLIQSEFPSLLKASSTLDNLFKELDKNGDGEVSYEEF
EAFFKKLSQ
```
#### Return sequences as a javascript object
```
var retriever = require ("ncbi-sequence-retriever");

var proteinIds = ["AAA49004.1","AAK64208.1"];  // add upto 100 accession Ids in this array
retriever.retrieveProteinSequences(proteinIds, "JSON").then((sequences)=>{
  console.log(sequences);
});
```
The output from above code: 
```
{ 'AAA49004.1 parvalbumin, partial [Gallus gallus]': 
    'FIEEDELKFVLKGFTPDGRDLSDKETKALLAAGDKDGDGKIGVEK',
  'AAK64208.1 calbindin D9k [Mus musculus]':
    'MCAEKSPAEMKSIFQKYAAKEGDPDQLSKEELKLLIQSEFPSLLKASSTLDNLFKELDKNGDGEVSYEEFEAFFKKLSQ' 
}
```

## Fetch **nucleotide** sequences
Here are examples to fetch one mRNA sequence from [NCBI nucleotide databse](https://www.ncbi.nlm.nih.gov/nuccore/) with user-provided ACCESSION Ids:

#### Return a string representive of sequences in FASTA format 
```
var retriever = require ("ncbi-sequence-retriever");

var nucleotidesIds = ["M65068.1"];  // add upto 10 accession Ids in this array
retriever.retrieveNucleotideSequences(nucleotidesIds).then((sequences)=>{
  console.log(sequences);
});
```
The output from above code: 
```
>M65068.1 Chicken parvalbumin mRNA, partial cds
TTTATTGAGGAGGATGAGCTAAAGTTTGTACTGAAGGGCTTTACCCCAGATGGCAGAGACCTATCAGACA
AAGAGACAAAGGCTCTTCTGGCTGCTGGAGATAAGGACGGTGATGGCAAAATCGGCGTGGAAAAA
```
#### Return sequences as a javascript object
```
var retriever = require ("ncbi-sequence-retriever");

var nucleotidesIds = ["M65068.1"];  // add upto 10 accession Ids in this array
retriever.retrieveNucleotideSequences(nucleotidesIds, "JSON").then((sequences)=>{
  console.log(sequences);
});
```
The output from above code: 
```
{
  'M65068.1 Chicken parvalbumin mRNA, partial cds': 
    'TTTATTGAGGAGGATGAGCTAAAGTTTGTACTGAAGGGCTTTACCCCAGATGGCAGAGACCTATCAGACAAAGAGACAAAGGCTCTTCTGGCTGCTGGAGATAAGGACGGTGATGGCAAAATCGGCGTGGAAAAA' 
}
```

## Optional API key
`retriever.retrieveNucleotideSequences()` and `retriever.retrieveProteinSequences()` methods can take a string API key as the third input parameter. This is optional. This parameter is set to be undefined by default. Adding an valid API key as the third input parameter can increase the number of sequence retrieve calls per second.

*On December 1, 2018, NCBI will begin enforcing the use of API keys that will offer enhanced levels of supported access to the E-utilities. After that date, any site (IP address) posting more than 3 requests per second to the E-utilities without an API key will receive an error message. By including an API key, a site can post up to 10 requests per second by default.* More rules about API key can be found in this link: https://www.ncbi.nlm.nih.gov/books/NBK25497/#chapter2.Coming_in_December_2018_API_Key

Sample code with API key as the third input arguement:
```
var retriever = require ("ncbi-sequence-retriever");

var nucleotidesIds = ["M65068.1"];  
var apiKey = "fake_api_key";  // if you have a valid API key, set up in this line.
retriever.retrieveNucleotideSequences(nucleotidesIds, "JSON", apiKey).then((sequences)=>{
  console.log(sequences);
});
```

## Limitation
* Due to the NCBI API key policy, any IP address is limited to use `retriever.retrieveNucleotideSequences()` and `retriever.retrieveProteinSequences()` methods for no more than 3 times per second.
* This package is **NOT** designed to retrieve whole genome sequences or other sequences longer than 575,161 bp. 
We tested the capacity of the package on retrieving the longest nucleotide sequence. The longest sequence we successfully retrieved is 
[Cedratvirus lausannensis genome assembly, chromosome: cClCRIB-75](https://www.ncbi.nlm.nih.gov/nuccore/LT907979.1), which has a length of 575,161 bp. We retrieved this sequence using the code shown below.
  ```
  var retriever = require ("ncbi-sequence-retriever");

  var ids= ["LT907979.1"];
  retriever.retrieveNucleotideSequences(ids, "JSON").then((sequences)=>{
    console.log(sequences);
  });
  ```
## Version Change
- 1.1.2
  - Fix a bug related with making request using http insteady of https.
- 1.1.1 
  - Fix a bug related with an error when using react.
- 1.1.0 
  - Official relase version.