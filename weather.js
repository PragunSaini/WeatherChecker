// Page elements
const resBox = document.querySelector('.results')
const searchBox = document.querySelector('.search')
const btn = document.querySelector('.gobtn')
const suggestionsBox = document.querySelector('.suggestions')
// API KEY
const apiKey = 'd80b051bb7bf18027d13a11e1ef14f55';

// INSERTS a weather record on the page
function insertRecord(result) {
    const template = `
        <div class='result'>
            <span class="city">${result[0]}, ${result[1]}</span>
            <span class='desc'>
                <span class="desc">${result[2]}</span>
                <img class="icon" src="${result[3]}" alt="?">
            </span>
            <span class="temp">Temperature : ${result[4]}°C</span>
            <span class="min-temp">Min: ${result[5]}°C</span>
            <span class="max-temp">Max: ${result[6]}°C</span>
            <span class="pressure">Pressure: ${result[7]} hPa</span>
            <span class="humidity">Humidity: ${result[8]} %</span>
        </div>`

        resBox.innerHTML = template + resBox.innerHTML
}

// Fetches the weather report from the API
function getWeather(){
    const city = searchBox.value;
    const code = searchBox.dataset.code
    suggestionsBox.innerHTML = ""
    searchBox.value = ""
    if (city.trim().length > 0){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${code}&units=metric&appid=${apiKey}`
        fetch(url)
            .then(blob => blob.json())
            .then(data => {
                let res = []
                res.push(data.name)
                res.push(data.sys.country)
                res.push(data.weather['0'].main)
                res.push(`http://openweathermap.org/img/w/${data.weather['0'].icon}.png`)
                res.push(data.main.temp)
                res.push(data.main.temp_min)
                res.push(data.main.temp_max)
                res.push(data.main.pressure)
                res.push(data.main.humidity)

                insertRecord(res)
            })
            .catch((e) => {
                alert("Sorry, we can't fetch the data for that city")
            })
    }
}


// Gets weather report on button press 
btn.addEventListener('click', getWeather)
