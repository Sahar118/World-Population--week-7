

// https://restcountries.com/#api-endpoints-v2-continent

// https://restcountries.com/v3.1/region/europe


// fetch('https://restcountries.com/v3.1/region/europe', {
//      method: 'GET',
//      headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//      }
//  })
//  .then(response => response.json())
//  .then(response => console.log(JSON.stringify(response)))

// fetch('https://restcountries.com/v3.1/region/africa', {
//      method: 'GET',
//      headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//      }
//  })
//  .then(response => response.json())
//  .then(response => console.log(JSON.stringify(response)))

// fetch('https://restcountries.com/v3.1/region/asia', {
//      method: 'GET',
//      headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//      }
//  })
//  .then(response => response.json())
//  .then(response => console.log(JSON.stringify(response)))

// fetch('https://restcountries.com/v3.1/region/americas', {
//      method: 'GET',
//      headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//      }
//  })
//  .then(response => response.json())
//  .then(response => console.log(JSON.stringify(response)))


// fetch('https://restcountries.com/v3.1/region/oceania', {
//      method: 'GET',
//      headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//      }
//  })
//  .then(response => response.json())
//  .then(response => console.log(JSON.stringify(response)))

// // !!!!!!!postman:!!!!!!!!

// // get country :

// fetch('https://countriesnow.space/api/v0.1/countries/population', {
//      method: 'POST',
//      headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//      },
//      body: JSON.stringify({ "country": "nigeria" })
//  })
//  .then(response => response.json())
//  .then(response => console.log(JSON.stringify(response)))






// // get all cities of a country // will get us only cities with population data.. :

//  fetch('https://countriesnow.space/api/v0.1/countries/population/cities/filter', {
//      method: 'POST',
//      headers: {
//         'Accept': 'application/json',
//          'Content-Type': 'application/json'
//      },
//     body: JSON.stringify({
//      	"limit": 1000,
// 	    "order": "asc",
// 	    "orderBy": "name",
// 	    "country": "nigeria" 
//      })
//  })
//  .then(response => response.json())
//  .then(response => console.log(JSON.stringify(response)))



// //get info about a specific city


//   fetch('https://countriesnow.space/api/v0.1/countries/population/cities', {
//      method: 'POST',
//      headers: {
//         'Accept': 'application/json',
//          'Content-Type': 'application/json'
//      },
//     body: JSON.stringify({
//         "city": "Akure"
//      })
//  })
//  .then(response => response.json())
//  .then(response => console.log(JSON.stringify(response)))




// fetch('https://restcountries.com/v3.1/all')
// .then(function(res) {
//     // console.log(res.json());
//     return res.json();
// })
// .then(function(data){
//     // console.log(data);
//     initialize(data);
// })
// .catch(function(err){
//     console.log(`Error: ${err}`)
// })

// Global Variables;
const countriesList = document.querySelector("#countries")

// each tine a new option is selected option value ad an argument
// countriesList.addEventListener("change", function(event){
//     console.log(event.target.value);
// })
countriesList.addEventListener("change", event => displayCountryInfo(event.target.value))

function newCountryInfo(event){
    displayCountryInfo(event.target.value)
}
let countries; // will contain "fetched" data
fetch('https://restcountries.com/v2/all')
.then(res=> res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:", err));

function initialize(countriesData){
    countries = countriesData;
    // the option string will be the innerHTML of the select element.
    // it will look through each country and add the corresponding options
    let options = "";
    for (let i=0; i<countries.length; i++){
        options += `<option value="${countries[i].alpha3Code}">  ${countries[i].name}</option>`;
    }
    // document.getElementById("countries").innerHTML = options;
    countriesList.innerHTML = options;
    displayCountryInfo("AFG")
//  this function will take the value of the option 
}
function displayCountryInfo(countryByAlpha3Code) {
    const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
    console.log(countryData);
    document.getElementById("capital").innerHTML = countryData.capital;
    document.getElementById("dialing-code").innerHTML =` + ${countryData.callingCodes[0]}` ;
    document.getElementById("population").innerHTML = countryData.population.toLocaleString('en-us');
    document.getElementById("currencies").innerHTML = countryData.currencies.map(c => `${c.name} (${c.code})`).join(`, `);
    document.getElementById("region").innerHTML = countryData.region;
    document.getElementById("subregion").innerHTML = countryData.subregion;
    document.querySelector('#flag-container img').src = countryData.flag;
    document.querySelector('#flag-container img').alt = `Flag of ${countryData.name}`;

}

// return the first element in the array 
setTimeout(()=>{
    console.log(countries);
}, 500)
console.log(countries);