let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#newgame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;
let moves = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnX = true;
    enableBoxes();
    moves = 0;
    msgContainer.classList.add("hide");
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

const showWinner = (winner) => {
    if (winner === "X") {
        msg.style.color = "#064789";
    } else if (winner === "O") {
        msg.style.color = "#679436";
    } else {
        msg.style.color = "#3f220f";
    }
    winner == "draw"
        ? (msg.innerText = "This game is a Draw!")
        : (msg.innerText = `The winner is ${winner}`);
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner", pos1val);
                showWinner(pos1val);
            }
        }
    }
    if (moves === 9) {
        showWinner("draw");
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            box.style.color = "#064789";
            turnX = false;
        } else {
            box.innerText = "O";
            box.style.color = "#679436";
            turnX = true;
        }
        box.disabled = true;
        moves++;
        checkWinner();
    });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
