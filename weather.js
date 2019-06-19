const resBox = document.querySelector('.results')
const searchBox = document.querySelector('.search')
const btn = document.querySelector('.gobtn')
const apiKey = 'd80b051bb7bf18027d13a11e1ef14f55';
const suggestionsBox = document.querySelector('.suggestions')

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


function getWeather(){

    suggestionsBox.innerHTML = ""

    const city = searchBox.value;
    const code = searchBox.dataset.code
    if (city.trim().length > 0){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${code}&units=metric&appid=${apiKey}`
        // console.log(url)
        fetch(url)
            .then(blob => blob.json())
            .then(data => {
                // console.log(data)
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
                searchBox.value = ""
            })
    }
}

btn.addEventListener('click', getWeather)