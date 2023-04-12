const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const wetherBox = document.querySelector('.weather-box');
const wetherDetails = document.querySelector('.weather-details');
const erorr404 = document.querySelector('.not-found');

search.addEventListener('click', ()=>{
    const APIKey ='3ecd2a4705f55c08b817737dfd5447f5';
    const city = document.querySelector('.search-box input').value;
    if (city ==='')
    return;

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
.then(response => response.json()).then(json=>{

    if(json.cod ==='404'){
        container.style.height= '400px';
        wetherBox.style.display = 'none';
        wetherDetails.style.display = 'none';
        erorr404.style.display = 'block';
        erorr404.classList.add('fandeIn');
        return;
    }

    erorr404.style.display= 'none';
    erorr404.classList.remove('fadeIn');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');

    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');

    switch(json.weather[0].main){
        case 'Clear' :
            image.src = 'images/clear.png';
            break; 
        case 'Rain' :
            image.src = 'images/rain.png';
            break; 
        case 'Snow' :
            image.src = 'images/snow.png';
            break;   
        case 'Clouds' :
            image.src = 'images/cloud.png';
            break;
        case 'Haze' :
           image.src = 'images/haze.png';
           break;  
                default:
                    image.src ='';

    }

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML =`${(json.main.humidity)}%`;

    new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },500)

    }).then(()=>{
        const wind= document.querySelector(".weather-details .wind span");
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;


    })

    


    wetherDetails.style.display = '';
    wetherDetails.classList.add('fadeIn');
    wetherBox.style.display ='';
    wetherBox.classList.add('fadeIn');
    container.style.height = '540px';


})


})