const STORAGE_KEY = "selectedNames";
const LAST_SELECTED_KEY = "lastSelectedNames";

let selectedNames = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let lastSelectedNames = JSON.parse(localStorage.getItem(LAST_SELECTED_KEY)) || [];

function selectNames() {
    let names = document.getElementById("namesInput").value.split(",").map(n => n.trim()).filter(n => n);

    if (names.length < 3) {
        alert("Enter at least 3 names.");
        return;
    }

    // Get available names (excluding last selected names)
    let availableNames = names.filter(name => !lastSelectedNames.includes(name));

    if (availableNames.length < 3) {
        alert("Not enough names left. Reset or wait for the next round.");
        return;
    }

    // Randomly select 3 names
    let chosen = [];
    while (chosen.length < 3) {
        let randIndex = Math.floor(Math.random() * availableNames.length);
        chosen.push(availableNames.splice(randIndex, 1)[0]);
    }

    // Update the stored selections
    lastSelectedNames = [...chosen]; // Store current selection for next round
    localStorage.setItem(LAST_SELECTED_KEY, JSON.stringify(lastSelectedNames));

    document.getElementById("selectedNames").innerText = chosen.join(", ");
}

function resetSelection() {
    localStorage.removeItem(LAST_SELECTED_KEY);
    lastSelectedNames = [];
    document.getElementById("selectedNames").innerText = "";
}
