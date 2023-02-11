const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
let world = {};


const AfricaBtn = document.querySelector('#africa-btn');
const AmericasBtn = document.querySelector('#americas-btn');
const AsiaBtn = document.querySelector('#asia-btn');
const EuropeBtn = document.querySelector('#europe-btn');
const OceaniaBtn = document.querySelector('#australia-btn');
const btnsContainer = document.querySelector('.continentBtnContainer');
const cityButton = document.querySelector('#citeisBtnsContainer');
const title = document.querySelector('#title');
const spinner = document.querySelector('.spinner')
const loading = document.querySelector('#loading')
const spinnerLoadingdiv = document.querySelector('#spinner-loading')
const pageStyling = document.querySelector('.p1')

function loadingPage() {
   spinner.style.display = 'none'
   loading.style.display = 'none'
   spinnerLoadingdiv.style.display = 'none'
}
loadingPage()

const fetchData = async (url) => {
   try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
   } catch (error) {
      console.log(error);
   }
};

const getCountriesData = async () => {
   for (let i = 0; i < continents.length; i++) {
      const continentName = continents[i];
      const currentRegion = await fetchData(`https://restcountries.com/v3.1/region/${continents[i]}`);
      Object.assign(world, { [continentName]: [] })
      for (let j = 0; j < currentRegion.length; j++) {
         if(currentRegion[j].name.common){
         }
         const countryCommonName = currentRegion[j].name.common;
         const countryOfficialName = currentRegion[j].name.official;
         const countryPopulation = currentRegion[j].population;
         const neighbors = (currentRegion[j].borders !==undefined ?currentRegion[j].borders.length :0);
         fillObject(world[continentName],countryOfficialName,countryCommonName,countryPopulation,neighbors,continentName);
   }
   }
};

function fillObject(arr,Offname,CommonName,pop,neighbors,continent){
   arr.push({
      CommonName: CommonName,
      Officialname: Offname,
      population: pop,
      continent:continent
   })
}

const fetchCityDataFromCountries = async (country) => {
   try{
      const res = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities/filter', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            'limit': 35,
            'order': "asc",
            'orderBy': "name",
            'country': country,
         }),
      });
      const data = await res.json();
      return data ;
   }
   catch(err){
      console.log(err);
   }
};

async function checkCommonOrOfficial(obj){
   const data = await fetchCityDataFromCountries(obj.CommonName);
   if(data.error){
      const response = await fetchCityDataFromCountries(obj.Officialname);
      return response;
   }
   return data;
}

function createAndAppendCanvas(){
   const div = document.querySelector('#myChartContainer');
   div.replaceChildren('');
   const canvas = document.createElement('canvas');
   canvas.id = 'myChart';
   div.appendChild(canvas);
}

Chart.defaults.color = 'black';
Chart.defaults.font.size = 12;

function createChart(labels,populationData){
   
   createAndAppendCanvas();
   spinner.style.display ='block'
   
   const ctx = document.getElementById('myChart');

   const myChart = new Chart(ctx, {
      type: 'line',
      data: {
         labels: labels,
         datasets: [{
            label: 'population',
            data: populationData,
            backgroundColor: 'rgb(5, 107, 5)',
            borderColor: 'black',
            borderWidth: 1
         },
         ]
      },
      options: {
         scales: {
            y: {
               beginAtZero: true
            }
         }
      }
   });
   spinner.style.display ='none'
   loading.style.display = 'none'
   spinnerLoadingdiv.style.display = 'none'
}

function bulidCiteisButtons(arr){
   citeisBtnsContainer.replaceChildren('');
   arr.forEach((element,idx) => {
      const button = document.createElement('button');
      button.classList='citeisBtns';
      button.style.backgroundColor = randomColors()
      button.setAttribute('data-id',idx);
      button.setAttribute('data-country',element.CommonName);
      button.setAttribute('data-continent',element.continent);
      button.textContent = element.CommonName;
      citeisBtnsContainer.appendChild(button);
   });
}


async function handleCiteisEvents(event){
   spinner.style.display = 'block'
      loading.style.display = 'block'
   spinnerLoadingdiv.style.display = 'block'
   const btn = event.target.getAttribute('data-id');
   const btnContinent = event.target.getAttribute('data-continent');
   const res = await checkCommonOrOfficial(world[btnContinent][btn]);
   if(res.data){
      
      const labels = res.data.map((el)=>{
         return  el.city });
      const population = res.data.map((el)=>{
         return el.populationCounts[0].value });
      createChart(labels,population);
      return;
   }
   alert('DATA Not Found 😕')
}
function handleEvents(event){
   spinner.style.display = 'block'
   pageStyling.style.background = 'none'
   title.textContent='World Population'
   const labels = world[event.target.textContent].map(el => el.CommonName);
   const population = world[event.target.textContent].map(el => el.population );
   createChart(labels,population);
   bulidCiteisButtons(world[event.target.textContent]);
}


   getCountriesData();
   btnsContainer.addEventListener('click', handleEvents);
   cityButton.addEventListener('click', handleCiteisEvents);


   function randomColors() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    button.onmouseover = function() 
    {
        this.style.backgroundColor = randomColors();
    }

