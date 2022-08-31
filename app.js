const https = require('https');

function printError(error){
    console.error(error.message);
}

function weatherMessage(cityName, weatherStatus, temperature) {
    message = `嗨! 這裡是${cityName} 目前天氣${weatherStatus} 氣溫${temperature}`;
    console.log(message);
}

function howsWeather(cityName) {
    let body = '';
    const response = https.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=e6b790bd0b9bdcfec35351fe1cbac0ce`,
    (response) => {
        console.log("statusCode:", response.statusCode);
        response.on('data', (data) => {
            body += data.toString();
            })
        response.on('end', () => {
            const weatherData = JSON.parse(body);
            weatherMessage(cityName, weatherData.weather[0].main, weatherData.main.temp);
        })
    }
    );
};


const cities = process.argv.slice(2);

cities.forEach(howsWeather);
