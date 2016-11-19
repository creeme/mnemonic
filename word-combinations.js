import fs from 'fs';
import Combinatorics from 'js-combinatorics';

export function unscrambleWord(word) { // returns array of integers
  const WordList = new Set(fs.readFileSync('./src/sowpods.txt').toString().split("\n"));
  console.log(`Dictionary parsed. Word count: ${WordList.size}`);

  const indexedInput = word
    .map((letter, index) => {
      let sorting = {};
      sorting[letter] = index;
      return sorting;
    });

  function objectToWord(indexedWordMap) {
    return indexedWordMap
      .map(charData => Object.getOwnPropertyNames(charData).join(''))
      .join('');
  }
  // regardless of combinations or permutations, you're going to have duplicates
  // because words with two of the same letter will have identical matches.
  const unfilteredComb = Combinatorics.permutation(indexedInput);
  const referenceList = new Set(unfilteredComb
    .map(indexedWordMap => objectToWord(indexedWordMap)));
  // the reference set is now a unique word list.
  const allCombinations = unfilteredComb.filter(indexedWordMap => {
    const word = objectToWord(indexedWordMap);
    const hasWord = referenceList.has(word);
    if (hasWord) referenceList.delete(word);
    return hasWord;
  });

  return allCombinations.filter(wordMap => WordList.has(objectToWord(wordMap).toLowerCase()))
    .map(combination => combination.map(pair => pair[Object.keys(pair)]));
    // output the order.

}
