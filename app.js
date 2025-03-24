
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let modeSelection = document.createElement("div"); 

let turnO = true; 
let count = 0; 
let playWithAI = false; 

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  playWithAI = false; 
  enableBoxes();
  msgContainer.classList.add("hide");
  showModeSelection(); 
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return true;
    }
  }
  return false;
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const aiMove = () => {
  let emptyBoxes = [];
  boxes.forEach((box, index) => {
    if (box.innerText === "") {
      emptyBoxes.push(index);
    }
  });

  if (emptyBoxes.length > 0) {
    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomIndex].innerText = "X";
    boxes[randomIndex].disabled = true;
    count++;

    if (checkWinner()) return;
    if (count === 9) gameDraw();
    turnO = true; 
  }
};


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      box.innerText = turnO ? "O" : "X";
      box.disabled = true;
      count++;

      if (checkWinner()) return;
      if (count === 9) {
        gameDraw();
        return;
      }

      if (playWithAI) {
        turnO = false; 
        setTimeout(aiMove, 500); 
      } else {
        turnO = !turnO; 
      }
    }
  });
});
const showModeSelection = () => {
  modeSelection.innerHTML = `
    <button id="friend-mode">Play with a Friend</button>
    <button id="ai-mode">Play with AI</button>
  `;
  modeSelection.style.textAlign = "center";
  document.body.insertBefore(modeSelection, document.body.firstChild);

  document.querySelector("#friend-mode").addEventListener("click", () => {
    playWithAI = false;
    modeSelection.remove();
  });

  document.querySelector("#ai-mode").addEventListener("click", () => {
    playWithAI = true;
    modeSelection.remove();
  });
};

showModeSelection();

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
