const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const input = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

function fetchWeatherData() {
    const APIKey = 'b558db2f1896a1f4e7109a7c429822cd';
    const location = input.value;

    if (location === '')
        return;

    // Determine whether the input is a city name or a zip code
    const isZipCode = /^\d{5}(-\d{4})?$/.test(location);
    const queryParam = isZipCode ? `zip=${location}` : `q=${location}`;

    fetch(`https://api.openweathermap.org/data/2.5/weather?${queryParam}&units=imperial&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            // ... (the rest of the code remains the same)
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });
}

search.addEventListener('click', fetchWeatherData);

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchWeatherData();
    }
});


