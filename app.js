const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const themeToggle = document.querySelector("#themeToggle");

const clickSound = document.querySelector("#clickSound");
const winSound = document.querySelector("#winSound");

let turnO = true;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const resetGame = () => {
  turnO = true;
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
};

boxes.forEach(box => {
  box.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();

    box.innerText = turnO ? "O" : "X";
    box.style.color = turnO ? "#222" : "#d82c0e";
    turnO = !turnO;
    box.disabled = true;

    checkWinner();
  });
});

const showWinner = winner => {
  msg.innerText = `🎉 Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  winSound.play();
  boxes.forEach(box => box.disabled = true);
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText);
    }
  }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

/* 🌙 Dark / Light Toggle */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.innerText =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});


   
