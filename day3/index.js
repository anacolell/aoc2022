const fs = require("fs");
const items = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .trim()
  .split("\n");

function hasRepeats(str) {
  return /(.).*\1/.test(str);
}

//part 1

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
  console.log(finalSum);
  return finalSum;
}

calculateFinalSum(items);

//part 2

function calculateFinalSum3() {
  let finalSum = 0;
  for (let i = 0; i < items.length; i += 3) {
    const rucksacks = [[...items[i]], [...items[i + 1]], [...items[i + 2]]];
    let set = new Set(rucksacks[0]);
    let repeatedLetters = rucksacks[1].filter((item) => set.has(item));
    set = new Set(repeatedLetters);
    repeatedLetters = rucksacks[2].filter((item) => set.has(item));
    set = [...new Set(repeatedLetters)];
    finalSum += alphabetLowerObj[set] || alphabetUpperObj[set];
  }
  console.log(finalSum);
  return finalSum;
}

calculateFinalSum3(items);
