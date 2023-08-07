function attachEvents() {
    const getWeatherBtn = document.getElementById('submit');
    const locationBar = document.getElementById('location');
    const currentWeatherInfo = document.getElementById('current');
    const upcomingWeatherInfo = document.getElementById('upcoming');
    const foreCast = document.getElementById('forecast');

    const forecastsDiv = document.createElement('div');
    forecastsDiv.className = 'forecasts';
    const conditionSpan = document.createElement('span');
    conditionSpan.className = 'condition';
    const conditionSymbolSpan = document.createElement('span');
    conditionSymbolSpan.className = 'condition symbol';
    const cityNameSpan = document.createElement('span');
    cityNameSpan.className = 'forecast-data';
    const tempSpam = document.createElement('span');
    tempSpam.className = 'forecast-data';
    const weatherSpan = document.createElement('span');
    weatherSpan.className = 'forecast-data';
    const foreCastInfoDiv = document.createElement('div');
    foreCastInfoDiv.className = 'forecast-info';



    const symbols = {
        sunny: '&#x2600;',
        partlySunny: '&#x26C5;',
        overcast: '&#x2601;',
        rain: '&#x2614;',
        degrees: '&#176;',
    }

    let locationsRequest = 'http://localhost:3030/jsonstore/forecaster/locations';


    getWeatherBtn.addEventListener('click', (e) => {
        foreCast.style.display = 'inline-block';

        fetch(locationsRequest)
            .then(response => response.json())
            .then(data => {
                let findLocation = data.find(location => location.name === locationBar.value);
                let currentWeatherRequest = `http://localhost:3030/jsonstore/forecaster/today/${findLocation.code}`;
                let upcomingWeatherRequest = `http://localhost:3030/jsonstore/forecaster/upcoming/${findLocation.code}`;


                fetch(currentWeatherRequest)
                    .then(res => res.json())
                    .then(data => {
                        switch (data.forecast.condition) {
                            case 'Sunny':
                                conditionSymbolSpan.innerHTML = symbols.sunny;
                                forecastsDiv.appendChild(conditionSymbolSpan);
                                currentWeatherInfo.appendChild(forecastsDiv);
                                cityNameSpan.textContent = `${data.name}`;
                                conditionSpan.appendChild(cityNameSpan);
                                forecastsDiv.appendChild(conditionSpan);
                                tempSpam.innerHTML = `${data.forecast.low}${symbols.degrees}/${data.forecast.high}${symbols.degrees}`;
                                conditionSpan.appendChild(tempSpam);
                                weatherSpan.textContent = `${data.forecast.condition}`;
                                conditionSpan.appendChild(weatherSpan);
                                break;
                            case 'Rain':
                                conditionSymbolSpan.innerHTML = symbols.rain;
                                forecastsDiv.appendChild(conditionSymbolSpan);
                                currentWeatherInfo.appendChild(forecastsDiv);
                                cityNameSpan.textContent = `${data.name}`;
                                conditionSpan.appendChild(cityNameSpan);
                                forecastsDiv.appendChild(conditionSpan);
                                tempSpam.innerHTML = `${data.forecast.low}&#176;/${data.forecast.high}&#176;`;
                                conditionSpan.appendChild(tempSpam);
                                weatherSpan.textContent = `${data.forecast.condition}`;
                                conditionSpan.appendChild(weatherSpan);
                                break;
                        }
                    })


                fetch(upcomingWeatherRequest)
                    .then(res => res.json())
                    .then(data => {
                        data.forecast.forEach((day) => {
                            const upcomingSpan = document.createElement('span');
                            upcomingSpan.className = 'upcoming';
                            const symbolSpan = document.createElement('span');
                            symbolSpan.className = 'symbol';
                            const degreesSpan = document.createElement('span');
                            degreesSpan.className = 'forecast-data';
                            const conditionSpan = document.createElement('span');
                            conditionSpan.className = 'forecast-data';
                            degreesSpan.innerHTML = `${day.low}${symbols.degrees}/${day.high}${symbols.degrees}`;
                            conditionSpan.textContent = day.condition;

                            switch (day.condition) {
                                case 'Sunny':
                                    symbolSpan.innerHTML = symbols.sunny;
                                    break;
                                case 'Rain':
                                    symbolSpan.innerHTML = symbols.rain;
                                    break;

                                case 'Partly sunny':
                                    symbolSpan.innerHTML = symbols.partlySunny;
                                    break;
                                case 'Overcast':
                                    symbolSpan.innerHTML = symbols.overcast;
                                    break;
                            }

                            upcomingWeatherInfo.appendChild(foreCastInfoDiv);
                            foreCastInfoDiv.appendChild(upcomingSpan);
                            upcomingSpan.appendChild(symbolSpan);
                            upcomingSpan.appendChild(degreesSpan);
                            upcomingSpan.appendChild(conditionSpan);
                        })



                    })
            });



    });
}

attachEvents();