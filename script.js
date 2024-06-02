const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const gameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// function to initialize the game:

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  boxes.forEach((box, index) => {
    box.innerHTML = "";
    boxes[index].style.pointerEvents = "all";

    box.classList = `box box${index + 1}`;
  });
  gameBtn.classList.remove("active");
  gameInfo.innerHTML = `current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let ans = "";
  winningPositions.forEach((pos) => {
    if (
      (gameGrid[pos[0]] !== "" ||
        gameGrid[pos[1]] !== "" ||
        gameGrid[pos[2]] !== "") &&
      gameGrid[pos[0]] === gameGrid[pos[1]] &&
      gameGrid[pos[1]] === gameGrid[pos[2]]
    ) {
      if (gameGrid[pos[0]] === "X") {
        ans = "X";
      } else {
        ans = "O";
      }

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      boxes[pos[0]].classList.add("win");
      boxes[pos[1]].classList.add("win");
      boxes[pos[2]].classList.add("win");
    }
  });

  if (ans !== "") {
    gameInfo.textContent = `${ans} Wins!`;
    gameBtn.classList.add("active");
    return;
  }

  let count = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      count++;
    }
  });

  if (count === 9) {
    gameInfo.textContent = "Draw!";
    gameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    gameGrid[index] = currentPlayer;
    boxes[index].textContent = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

gameBtn.addEventListener("click", initGame);
