/* Part one */

const fs = require("fs");
const elves = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .trim()
  .split("\n")
  .map(Number)
  .reduce(
    (acc, calories) => {
      if (calories === 0) {
        acc.push([]);
      } else {
        acc[acc.length - 1].push(calories);
      }
      return acc;
    },
    [[]]
  );

let caloriesMax = 0;
for (const elf of elves) {
  const caloriesSum = elf.reduce((acc, calories) => acc + calories, 0);
  if (caloriesSum > caloriesMax) {
    caloriesMax = caloriesSum;
  }
}

console.log(caloriesMax);

/* Part two */

let caloriesMaxTop3 = [];

for (const calories of elves) {
  const caloriesSum = calories.reduce((acc, calories) => acc + calories, 0);

  if (caloriesMaxTop3.length < 3) {
    caloriesMaxTop3.push(caloriesSum);
  } else {
    const min = Math.min(...caloriesMaxTop3);

    if (caloriesSum > min) {
      caloriesMaxTop3[caloriesMaxTop3.indexOf(min)] = caloriesSum;
    }
  }
}
console.log(caloriesMaxTop3[0] + caloriesMaxTop3[1] + caloriesMaxTop3[2]);
