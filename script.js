const STORAGE_KEY = "selectedNames";
const LAST_SELECTED_KEY = "lastSelectedNames";

// Predefined names 
const allNames = ["Diego", "Sofi", "Mike", "Barbs", "Isa", "Fer", "Gonza", "Juana", "Mateo", "Nat"];

let lastSelectedNames = JSON.parse(localStorage.getItem(LAST_SELECTED_KEY)) || [];

// Roulette animation variables
let spinningInterval;

// Start Roulette
function startRoulette() {
    let availableNames = allNames.filter(name => !lastSelectedNames.includes(name));

    if (availableNames.length < 3) {
        alert("Not enough names left. Reset or wait for the next round.");
        return;
    }

    let rouletteText = document.getElementById("rouletteText");
    let selectedNamesElement = document.getElementById("selectedNames");
    selectedNamesElement.innerText = "";
    selectedNamesElement.classList.remove("show");

    let index = 0;

    // Start spinning
    spinningInterval = setInterval(() => {
        rouletteText.innerText = availableNames[index % availableNames.length];
        index++;
    }, 100); // Change text every 100ms

    // Stop after 3 seconds and select names
    setTimeout(() => {
        clearInterval(spinningInterval);
        selectNames(availableNames);
    }, 3000);
}

// Select random names
function selectNames(availableNames) {
    let chosen = [];
    while (chosen.length < 3) {
        let randIndex = Math.floor(Math.random() * availableNames.length);
        chosen.push(availableNames.splice(randIndex, 1)[0]);
    }

    lastSelectedNames = [...chosen];
    localStorage.setItem(LAST_SELECTED_KEY, JSON.stringify(lastSelectedNames));

    // Update UI
    let rouletteText = document.getElementById("rouletteText");
    rouletteText.innerText = "✅ " + chosen.join(", ");

   let selectedNamesElement = document.getElementById("selectedNames");
    selectedNamesElement.innerText = chosen.join(", ");
    
    // Add 'show' class to trigger fade-in effect
    selectedNamesElement.classList.add("show");
}

// Reset function
function resetSelection() {
    localStorage.removeItem(LAST_SELECTED_KEY);
    lastSelectedNames = [];
    document.getElementById("selectedNames").innerText = "";
    document.getElementById("rouletteText").innerText = "🎲 Por seleccionar";
}
