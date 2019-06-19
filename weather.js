const resBox = document.querySelector('.results')

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

        resBox.innerHTML = template += resBox.innerHTML;
}

