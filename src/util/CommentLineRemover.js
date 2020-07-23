class CommentLineRemover {
  /**
   * Removes the comment line in a string representative of a FASTA sequence file.
   * Fasta file with comment line example:
   * >sequnceId
   * ;this is a comment line
   * ATATATATATATATATATATGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGCCCCCCCCCCCCCCC
   * @param {String} fastaSequences, the string representitive of a FASTA sequence file possibly contains sequnces Ids, sequences, and comment line.
   * @returns the {string} representitive of a FASTA sequence file after all comment lines are removed. 
   */
  removeCommentLine (fastaSequences){
    const lineArray = fastaSequences.split(/\r?\n/);
    const lineArrayNoComments = [];
    for (let line of lineArray) {
      line = line.trim();
      if (line.charAt(0) !== ";") {
        lineArrayNoComments.push(line);
      }
    }
    return lineArrayNoComments.join("\n");
  }
}

module.exports = CommentLineRemover;