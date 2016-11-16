import fs from 'fs';
import Combinatorics from 'js-combinatorics';

const INPUT = 'egac';

const WordList = new Set(fs.readFileSync('./src/sowpods.txt').toString().split("\n"));
console.log(`Dictionary parsed. Word count: ${WordList.size}`);

const indexedInput = INPUT.split('')
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

const resolvedWords = allCombinations.filter(indexedWordMap => WordList.has(objectToWord(indexedWordMap)));

console.log('resolved words\n');
console.log(resolvedWords);
console.log(resolvedWords.map(indexedWordMap => objectToWord(indexedWordMap)));