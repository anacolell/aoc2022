const fs = require("fs");
const input = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .trim()
  .split("\n")
  .map((line) => line.split(" "));

//part 1

const moves = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const playerMoves = {
  A: moves.rock,
  B: moves.paper,
  C: moves.scissors,
  X: moves.rock,
  Y: moves.paper,
  Z: moves.scissors,
};

let finalScore = 0;

function wins(opponentMove, ourMove) {
  if (opponentMove === ourMove) {
    finalScore += 3 + ourMove;
  } else if (
    (opponentMove === moves.rock && ourMove === moves.paper) ||
    (opponentMove === moves.paper && ourMove === moves.scissors) ||
    (opponentMove === moves.scissors && ourMove === moves.rock)
  ) {
    finalScore += 6 + ourMove;
  } else {
    finalScore += ourMove;
  }
  return finalScore;
}

for (const move of input) {
  let move1 = playerMoves[move[0]];
  let move2 = playerMoves[move[1]];
  wins(move1, move2);
}

console.log(finalScore);

//part 2

const desiredOutcomes = {
  //rock
  A: {
    X: moves.scissors,
    Y: moves.rock,
    Z: moves.paper,
  },
  //paper
  B: {
    X: moves.rock,
    Y: moves.paper,
    Z: moves.scissors,
  },
  //scissors
  C: {
    X: moves.paper,
    Y: moves.scissors,
    Z: moves.rock,
  },
};

finalScore = 0;

for (const move of input) {
  let move1 = playerMoves[move[0]];
  let move2 = desiredOutcomes[move[0]][move[1]];
  wins(move1, move2);
}

console.log(finalScore);
