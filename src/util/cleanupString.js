/**
 * Remove numbers and blanks from the fasta sequence. If the sequence contains characters
 * other than A-Z, a-z, "*"", "-"", an exception will be throw.
 * FASTA sequence format: 
 * https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp
 * @param {String} sequence, a DNA/RNA or protein sequence to be clean up. 
 * @returns {String} a sequence after remove numbers. 
 * @throws Error if the sequence is empty after numbers and blanks are removed.
 * @throws Error if the sequence (after numbers and blanks are removed) contains characters
 * other than A-Z, a-z, "*", "-".
 */
function cleanup(string) {
  // step 1: Remove numbers and blanks
  let outputString = string.replace(/\d|\s/g, "");
  // step 2: Check if the output string is empty.
  if (!outputString || outputString.length === 0) {
    throw new Error("Invalid sequence: " + string);
  }
  // Step 3: If the output string not only contains letters, "*", or "-", then thrown a expection
  const expectedRegExp = new RegExp("[^a-zA-Z-*]");
  if (expectedRegExp.test(outputString)) {
    throw new Error("Sequence contains invalid characters. Sequence: " + string);
  }
  return outputString;
}

module.exports = cleanup;