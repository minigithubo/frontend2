const apiUrl = 'https://overfast-api.tekrop.fr/heroes'; 

let heroes = []; 


const roleDescriptions = {
    "all": "Select a role to see the heroes.",
    "tank": "Tank heroes soak up damage and shatter fortified positions...",
    "damage": "Damage heroes are responsible for engaging and defeating enemies...",
    "support": "Support heroes empower allies by healing and boosting abilities..."
}; //json format
//roleDescriptions["all"]


function fetchHeroes() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json(); // Convert response to JSON
        })
        .then(data => {
            heroes = data; // Store data in heroes array
            filterHeroes("all"); // Display all heroes initially
        })
        .catch(error => {
            console.error("Error fetching heroes:", error);
        });
        //Catches and logs any errors during the fetch process.

}

// Function to filter heroes by role
function filterHeroes(role) {
    document.getElementById("role-description").innerText = roleDescriptions[role];
    //.innerText is used to set or change the text content of this element.

    const filteredHeroes = (role === "all") ? heroes : heroes.filter(hero => hero.role.toLowerCase() === role);
    //If the user wants to see all heroes (role === "all"), show the entire list.
// Otherwise, filter the heroes to show only those whose role matches the selection, ensuring the comparison is not case-sensitive.
// This approach is efficient and clean, combining conditional logic with array filtering in a single line.
// This is an arrow function(=>), which is a shorter syntax for defining functions.
//heroes.filter(function(hero) {
//     return hero.role.toLowerCase() === role;
// });



    const heroContainer = document.getElementById("hero-container");
    heroContainer.innerHTML = ""; 

    filteredHeroes.forEach(hero => {
        //filteredHeroes.forEach(...) loops through each hero in the filtered list.
        const heroCard = document.createElement("div");
        heroCard.classList.add("hero-card");
        //document.createElement("div") creates a new <div> element in the DOM.
        //heroCard.classList.add("hero-card") assigns a CSS class hero-card to the new element for styling.

        heroCard.innerHTML = `
            <img src="${hero.portrait}" alt="${hero.name}">
            <h3>${hero.name}</h3>
        `;
        heroCard.onclick = () => showHeroDetails(hero.name);
        heroContainer.appendChild(heroCard);
    });
//     Event Handler (onclick): When the hero card is clicked, it runs the function showHeroDetails(hero.name).
// showHeroDetails(hero.name) Function:
// This function is expected to display more detailed information about the selected hero.
// It might open a modal or fill a section with hero details.
// 📤 9. Append Child (appendChild):
// heroContainer.appendChild(heroCard);
// appendChild() is a method to add a new HTML element (child) to an existing parent element.

    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    // This step deactivates all filter buttons, ensuring no button is highlighted.
    document.getElementById(`${role}-btn`).classList.add("active");
    // 
}
// Load heroes on page load
window.onload = fetchHeroes;
