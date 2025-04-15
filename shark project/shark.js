const token = '433c7adb3c2ceee819be';
// 임시 CORS 프록시 추가
const apiUrl = 'https://api.allorigins.win/raw?url=https://www.sharkipedia.org/api/v1/species';

let sharks = [];

async function fetchSharks() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        sharks = data.data;
        console.log('Shark Data:', sharks);

        displaySharks();
    } catch (error) {
        console.error('Error fetching shark data:', error);
    }
}

function displaySharks() {
    const container = document.getElementById("sharkspecies-container");

    if (!container) {
        console.error("Error: Container element not found!");
        return;
    }

    container.innerHTML = ""; // Clear previous content

    if (!sharks || sharks.length === 0) {
        container.innerHTML = "<p>No sharks found.</p>";
        return;
    }

    console.log("First shark object:", sharks[0]);

    sharks.forEach(shark => {
        const sharkDiv = document.createElement("div");

        const name = shark.attributes?.binomial_name || shark.name || "Unknown Shark";

        sharkDiv.textContent = name;
        container.appendChild(sharkDiv);
    });
}

window.onload = fetchSharks;
