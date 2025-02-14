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

    let availableNames = names.filter(name => !lastSelectedNames.includes(name));

    if (availableNames.length < 3) {
        alert("Not enough names left. Reset or wait for the next round.");
        return;
    }

    let chosen = [];
    while (chosen.length < 3) {
        let randIndex = Math.floor(Math.random() * availableNames.length);
        chosen.push(availableNames.splice(randIndex, 1)[0]);
    }

    lastSelectedNames = [...chosen];
    localStorage.setItem(LAST_SELECTED_KEY, JSON.stringify(lastSelectedNames));

    // Add fade-in and bounce effect
    let selectedNamesElement = document.getElementById("selectedNames");
    selectedNamesElement.innerText = chosen.join(", ");
    selectedNamesElement.classList.remove("show");
    setTimeout(() => selectedNamesElement.classList.add("show"), 50);
}


function resetSelection() {
    localStorage.removeItem(LAST_SELECTED_KEY);
    lastSelectedNames = [];
    document.getElementById("selectedNames").innerText = "";
}
