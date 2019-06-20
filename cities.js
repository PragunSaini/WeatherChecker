// Get a List of cities to generate dropdown menu

// URL for Fetch request
const citiesURL =
    "https://raw.githubusercontent.com/meMo-Minsk/all-countries-and-cities-json/master/countries.json";
// The list of cities we build
const cityList = [];
// The searchbar element
const search = document.querySelector(".search");
// The ul element to display list
const suggestions = document.querySelector(".suggestions");

// Get the list
fetch(citiesURL)
    .then(blob => blob.json())
    .then(data => {
        // For each country
        const keys = Object.keys(data);
        keys.forEach(key => {
            const countryList = [...new Set(data[key])];
            if (key === "United States") {
                key = "United States Of America";
            }
            let code = null;
            fetch(`https://restcountries.eu/rest/v2/name/${key}?fullText=true&fields=alpha2Code`)
                .then(blob => blob.json())
                .then(data => {
                    if (data[0]) code = data[0].alpha2Code;
                })
                .finally(() => {
                    countryList.forEach(city => {
                        cityList.push({
                            name: city,
                            country: key,
                            code: code
                        });
                    });
                })
        });
    });


// Function that finds suitable matches to our keyword
function findMatches(wordToFind, cities) {
    const regex = new RegExp(wordToFind, "gi");
    return cities.filter(
        city => city.name.match(regex) || city.country.match(regex)
    );
}

// Find matches from city list and display list items
function displayMatches() {
    if (this.value.trim().length > 3) {
        const places = findMatches(this.value, cityList);
        suggestions.innerHTML = places
            .map(place => {
                const regex = new RegExp(this.value, "gi");
                const city = place.name.replace(
                    regex,
                    `<span class="hl">${this.value}</span>`
                );
                const country = place.country.replace(
                    regex,
                    `<span class="hl">${this.value}</span>`
                );
                return `<li data-code="${place.code}" id="${
                    place.name
                }">${city}, ${country}</li>`;
            })
            .join("");
    }

    // Add click event listener to each item suggestion
    const items = document.querySelectorAll(".suggestions li");
    if (items) {
        items.forEach(item => item.addEventListener('click', clickEvent));
    }
}

// Replace text field value with value of suggestion
function clickEvent(e) {
    search.value = this.id;
    search.dataset.code = this.dataset.code
    suggestions.innerHTML = "";
}

// Generate suggestions on folllowing event
search.addEventListener("keyup", displayMatches);
search.addEventListener("change", displayMatches);


