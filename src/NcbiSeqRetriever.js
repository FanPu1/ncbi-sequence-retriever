const axios = require("axios");
const FastaSeq = require("./fasta/FastaSeq");

/**
 * A wapper class to retrieve peotein or nucleotide sequences from NCBI through EUtil.
 * More about EUtil:
 * https://www.ncbi.nlm.nih.gov/books/NBK25499/table/chapter4.T._valid_values_of__retmode_and/
 */
class NcbiSeqRetriever {
  constructor () {
    this.baseUrl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi";
    this.nucleotideDB = "nuccore";
    this.proteinDB = "protein";
  }

  /**
   * Retrieves necleotide sequence from NCBI nucleotide database (nuccore). https://www.ncbi.nlm.nih.gov/nuccore/
   * @param {Array} ids, an string array of ACCESSION Ids in NCBI nucleotide database.
   * @param {String} format, the format of the returned sequences. Default input "FASTA". change to "JSON" if user want to return sequences as javascript object.
   * @param {String} api_key, a possibly null or undefined string of api_key. More rules about api_key can be found in this link:
   * https://www.ncbi.nlm.nih.gov/books/NBK25497/#chapter2.Coming_in_December_2018_API_Key
   * @returns {String}, one or multiple sequences in FASTA format retrieved from NCBI nucore database.
   * @throws an error if maximium number of requests per second is reached (https://www.ncbi.nlm.nih.gov/books/NBK25497/#chapter2.Coming_in_December_2018_API_Key),
   * or if retrieve data from NCBI encounter an error, or if the input id is not valid.
   */
  async retrieveNucleotideSequences (ids, format = "FASTA", api_key = undefined) {
    if(Array.isArray(ids) && ids.length > 10) throw new Error ("The maxium number of ids should be less than 10.");
    const outputString = await this.retrieveNCBISequences(this.nucleotideDB, ids, api_key);
    if (format !== "JSON") return outputString;
    if (outputString.length > 20000000) throw new Error("The returned sequences is longer than 20,000,000 charactors. Please use less ids");
    return new FastaSeq("nucleotide", outputString).getAllSequencesWithIds();
  }

  /**
   * Retrieves protein sequence from NCBI protein database. https://www.ncbi.nlm.nih.gov/protein/
   * @param {Array} ids, an string array of ACCESSION Ids in NCBI protein database.
   * @param {String} format, the format of the returned sequences. Default input "FASTA". change to "JSON" if user want to return sequences as javascript object.
   * @param {String} api_key, a possibly null or undefined string of api_key. More rules about api_key can be found in this link:
   * https://www.ncbi.nlm.nih.gov/books/NBK25497/#chapter2.Coming_in_December_2018_API_Key
   * @returns {String}, one or multiple sequences in FASTA fromat retrieved from NCBI protein database.
   * @throws an error if maximium number of requests per second is reached (https://www.ncbi.nlm.nih.gov/books/NBK25497/#chapter2.Coming_in_December_2018_API_Key),
   * or if retrieve data from NCBI encounter an error, or if the input id is not valid.
   */
  async retrieveProteinSequences (ids, format = "FASTA", api_key = undefined) {
    const outputString = await this.retrieveNCBISequences(this.proteinDB, ids, api_key);
    if (format !== "JSON") return outputString;
    return new FastaSeq("nucleotide", outputString).getAllSequencesWithIds();
  }

  /**
   * Validates input Id array.
   * @param {Array} ids, an string array of ACCESSION Ids in NCBI nucleotide database.
   * @throws an error is input id array is not valid.
   */
  validateIds(ids) {
    if (!Array.isArray(ids)) {
      throw new Error ("Input Ids are not an array.");
    }
    if (ids.length === 0) {
      throw new Error ("No Ids. User should put at least one Id in the input array");
    } 
    const set = new Set(ids);
    if (set.size > 100) {
      throw new Error ("Too many Ids. The maxium number of protein ids should be less than 50.");
    }
  }

  /**
   * Retrieves sequence from NCBI databases.
   * @db {String}, the name of the database. Example: "protein", "nuccore"
   * @param {Array} ids, an string array of ACCESSION Ids in NCBI database.
   * @param {String} api_key, a possibly null or undefined string of api_key. More rules about api_key can be found in this link:
   * https://www.ncbi.nlm.nih.gov/books/NBK25497/#chapter2.Coming_in_December_2018_API_Key
   * @returns {String}, one or multiple sequences in FASTA format retrieved from NCBI databases.
   * @throws an error if maximium number of requests per second is reached (https://www.ncbi.nlm.nih.gov/books/NBK25497/#chapter2.Coming_in_December_2018_API_Key),
   * or if retrieve data from NCBI encounter an error. 
   */
  async retrieveNCBISequences(db, ids, api_key) {
    this.validateIds(ids);
    const set = new Set(ids);
    const idString = Array.from(set).join(",");
    // http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=' + DNAId + '&rettype=fasta&retmode=text' + 'api_key=' + api_key
    let url = this.baseUrl + "?db=" + db + "&id=" + idString + "&rettype=fasta&retmode=text";
    if (api_key) {
      url = url + "api_key=" + api_key; 
    }
    console.log(url);
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error("Retrieve sequence failed: "+ error);
    }
  }
}

module.exports = NcbiSeqRetriever;