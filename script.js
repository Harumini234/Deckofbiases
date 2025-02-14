const STORAGE_KEY = "selectedNames";
const LAST_SELECTED_KEY = "lastSelectedNames";

// Predefined names (Your teammates' names)
const allNames = ["Diego", "Sofi", "Mike", "Barbs", "Isa", "Fer", "Gonza", "Juana", "Mateo", "Nat"];

let lastSelectedNames = JSON.parse(localStorage.getItem(LAST_SELECTED_KEY)) || [];

// Display names on page
function displayNames() {
    let nameList = document.getElementById("nameList");
    nameList.innerHTML = allNames.map(name => {
        let isExcluded = lastSelectedNames.includes(name);
        return `<li class="${isExcluded ? 'excluded' : ''}">${name}</li>`;
    }).join("");
}

// Select random names
function selectNames() {
    let availableNames = allNames.filter(name => !lastSelectedNames.includes(name));

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

    // Update UI
    document.getElementById("selectedNames").innerText = chosen.join(", ");
    document.getElementById("selectedNames").classList.remove("show");
    setTimeout(() => document.getElementById("selectedNames").classList.add("show"), 50);

    displayNames();
}

// Reset function
function resetSelection() {
    localStorage.removeItem(LAST_SELECTED_KEY);
    lastSelectedNames = [];
    document.getElementById("selectedNames").innerText = "";
    displayNames();
}

// Load initial names
displayNames();
