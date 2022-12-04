const fs = require("fs");
const items = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .trim()
  .split("\n");

function hasRepeats(str) {
  return /(.).*\1/.test(str);
}

const alphabetLower = "abcdefghijklmnopqrstuvwxyz".split("");
let alphabetLowerObj = {};
alphabetLower.map((letter, index) => {
  alphabetLowerObj[letter] = index + 1;
});

const alphabetUpper = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
let alphabetUpperObj = [];
alphabetUpper.map((letter, index) => {
  alphabetLowerObj[letter] = index + 27;
});

function getRepeatedLetter(string) {
  let firstHalf = string.slice(0, string.length / 2);
  let secondHalf = string.slice(string.length / 2);
  let repeatedLetter;
  [...firstHalf].forEach((letter) => {
    [...secondHalf].forEach((letter2) => {
      if (letter === letter2) {
        repeatedLetter = letter;
      }
    });
  });
  return repeatedLetter;
}

function calculateFinalSum(itemsArray) {
  let finalSum = 0;
  for (const item of itemsArray) {
    let repeatedLetter = getRepeatedLetter(item);
    finalSum +=
      alphabetLowerObj[repeatedLetter] || alphabetUpperObj[repeatedLetter];
  }
  return finalSum;
}

console.log(calculateFinalSum(items));
