// // Get a List of cities to generate dropdown menu

// // URL for Fetch request
// const citiesURL = 'https://raw.githubusercontent.com/meMo-Minsk/all-countries-and-cities-json/master/countries.json'

// const cityList = []

// // Get the list
// fetch(citiesURL)
//     .then(blob => blob.json())
//     .then(data => {
//         const keys = Object.keys(data)
//         keys.forEach(key => {
//             const countryList = data[key]
//             countryList.forEach(city => {
//                 cityList.push({
//                     name: city,
//                     country: key
//                 })
//             })
//         })
//     })



