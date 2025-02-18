const STORAGE_KEY = "selectedNames";
const LAST_SELECTED_KEY = "lastSelectedNames";

let names = [];
let spinning = false;
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

function setupWheel() {
    names = document.getElementById("nameInput").value.split("\n").filter(n => n.trim() !== "");
    drawWheel();
}

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const slice = (2 * Math.PI) / names.length;
    names.forEach((name, i) => {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, slice * i, slice * (i + 1));
        ctx.fillStyle = `hsl(${(i * 360) / names.length}, 80%, 60%)`;
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fillText(name.trim(), 120, 120 + i * 15);
    });
}

function startRoulette() {
    if (spinning || names.length === 0) return;
    spinning = true;
    let rotations = Math.floor(Math.random() * names.length) + 10;
    let selectedIndex = rotations % names.length;

    let interval = setInterval(() => {
        drawWheel();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(150, 150, 20, 0, 2 * Math.PI);
        ctx.fill();
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        spinning = false;
        document.getElementById("selectedNames").innerText = "✅ " + names[selectedIndex];
    }, 3000);
}

function resetSelection() {
    document.getElementById("nameInput").value = "";
    document.getElementById("selectedNames").innerText = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    names = [];
}

