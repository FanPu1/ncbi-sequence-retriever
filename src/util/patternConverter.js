/**
 * A helper function to convert a motif (pattern) string into the regular expression.
 * Example 
 *  input: 
 *    [DNS]-x-[DNS]-{FLIVWY}-[DNESTG]-[DNQGHRK]-{GP}-[LIVMC]-[DENQSTAGC]-x(2)-[ED]
 *  output: 
 *    [DNS][\w][DNS][^FLIVWY][DNESTG][DNQGHRK][^GP][LIVMC][DENQSTAGC][\w][\w][ED]
 * 
 * Precedures to convert motif (pattern) to regular expression string:
 * - remove all - outside of [].
 * - replace x -x x- with [\w].
 * - replace { with [^.
 * - replace } with ].
 * - deal with (2): replace ( with { and replace ) with }.
 * - replace < with ^.
 * - replace > with $.
 * 
 * @param {String}, a string form of a protein or nucleotide motif (pattern).
 * @returns {String}, the converted string used to {RegExp} search.
 * @throws an error if the input patternString is null, undefined, an empty string, or a blank string.
 */
function convertPatternToRegExp(patternString) {
  if (patternString === null || patternString === undefined) {
    throw new Error("The input patterns cannot be null or undefined.");
  }
  if(patternString.trim() === "") {
    throw new Error("The input patterns cannot be blank string or an empty string.");
  }
  return patternString.replace(/[\s-]/g,"").replace(/x/g, "\\w").replace(/{/g, "[^").replace(/}/g, "]").replace(/\(/g, "{").replace(/\)/g, "}").replace(/</g, "^").replace(/>/g, "$");
}

module.exports = convertPatternToRegExp;


