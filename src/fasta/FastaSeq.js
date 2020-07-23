const cleanup = require("./../util/cleanUpString");
const CommentLineRemover = require("./../util/CommentLineRemover");

class FastaSeq {
  /**
   * Constructor for FastaSeq class. 
   * @param {DataType} dataType, the type of the input data (can be DNA, RNA, Protein or PDB).
   * @param {string} fastaSequecnesString, fasta sequences string.
   */
  constructor(datatype, fastaSequecnesString) {
    this.dataType = datatype;
    this.fastaSequencesString = fastaSequecnesString;
    this.seqMap = this.covertSeqToMap();
    this.seqAssistant = null;
    this.PredictionAssistant = null;
  }

  /**
   * Converts the {String} fasta sequence into a {Map}.
   * @return {Map} a map represtive of fasta sequences.
   */
  covertSeqToMap() {
    // Step 1: store each indivalue fasta sequence in to a fasta sequence unit array (fastaUnitArray). 
    const seqMap = new Map();
    // remove commentline from this string. The comment line in FASTA file start with ";"
    const commentRemover = new CommentLineRemover();
    const fastaSequecnesStringNoCommentLine = commentRemover.removeCommentLine(this.fastaSequencesString);

    // split String by ">", and keep >
    const fastaUnitArray = fastaSequecnesStringNoCommentLine.trim().split(/(?=>)/g);
    // prepare index for unnamed sequences
    let unnamedSeqIndex = 1;

    // Step 2: loop through each fasta sequence unit and split key (sequence Id) and value (DNA or protein sequence)
    for (const index in fastaUnitArray) {
      // split each line and store each line in to an array
      const lineArray = fastaUnitArray[index].split(/\r?\n/);
      
      let sequenceId;
      let sequence = "";
      // First line must start with ">" followed by sequence Id. Otherwize this fasta sequence unit 
      // do not have an id, and we want to give a id called "Unnamed sequence " + unnamedSeqIndex;
      if (lineArray[0].trim().charAt(0) === ">" && lineArray[0].trim().length > 1) { // key is available
        sequenceId = lineArray[0].trim().substring(1);     
      } else { // key is not available
        sequenceId = "Unnamed sequence " + unnamedSeqIndex;
        unnamedSeqIndex++;
        if(lineArray[0].trim().charAt(0) !== ">") { // line start ";" means comments, so ignored.
          sequence = sequence + lineArray[0].replace(/\s/g, ""); // the sequence start from the first line, so append it
        }
      }
      
      // now create the sequence from fasta unit
      for (let i = 1; i<lineArray.length; i++){
        sequence = sequence + lineArray[i].replace(/\s/g, "");
      }

      // step 3 clean up sequence before save it into my sequence map. Throw exception if the sequence is invalid.
      sequence = cleanup(sequence).toUpperCase();
      
      // Step 4: store sequenceId and sequence into a {sequenceId} object.
      const seqMapElement = {
        sequenceId: sequenceId,
        sequence: sequence,
        outputMap: new Map(),
      };
      seqMap.set(sequenceId, seqMapElement);
    }
    // once for loop finish, return seqMap
    return seqMap;
  }

  /**
   * Gets all sequence Ids from the input FASTA string (file).
   * @returns {Array} an array of sequence Ids.
   */
  getAllSequenceIds() {
    const sequenceIds = [];
    for (const key of this.seqMap.keys()) sequenceIds.push(key);
    return sequenceIds;
  }

  /**
   * Gets a specific FASTA sequence by its sequence Id.
   * @param {String} sequenceId, the sequence Id to query.
   * @returns {String} Fasta sequence (could be a empty string if fasta sequence only have title).
   * @throws An Error if the sequnceId is not valid.
   */
  getSequenceById(sequenceId) {
    const validSequenceIds = this.getAllSequenceIds();
    if (validSequenceIds.includes(sequenceId)) {
      return this.seqMap.get(sequenceId).sequence;
    }
    throw new Error("This sequence id is not valid. sequenceId = " + sequenceId);
  }

  /**
   * Gets an object contains all sequences and their their sequences Ids. 
   * For example: {"seqId1": "ATCGATC", "sequenceId3": "CCAAT", "unnamedSeqId": "AAAAG"}
   * @returns {Object} contains all sequences indexed by its Id.
   */
  getAllSequencesWithIds(){
    const sequencesByIds = {};
    this.seqMap.forEach((value, key)=>{
      sequencesByIds[key] = value.sequence;
    });
    return sequencesByIds;
  }

  /**
   * Returns {Integer} the number of individual sequences saved into the FastaSeq object.
   */
  size() {
    return this.getAllSequenceIds().length;
  }
}

module.exports = FastaSeq;