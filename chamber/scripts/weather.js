// scripts/weather.js

const apiKey = '69ad7fc43b77efbd86e3c82c2b61861a';
const city = 'New York'; // Change this to your preferred city
const units = 'imperial'; // Use 'metric' for Celsius

document.addEventListener('DOMContentLoaded', () => {
  const currentWeather = document.querySelector('.current-weather');
  const forecastContainer = document.getElementById('forecast-container');

  // Fetch current weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const condition = data.weather[0].description;
      const icon = data.weather[0].icon;

      currentWeather.innerHTML = `
        <p><strong>Now:</strong> ${temp.toFixed(1)}°${units === 'imperial' ? 'F' : 'C'}, ${condition}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${condition}" />
      `;
    })
    .catch(() => {
      currentWeather.innerHTML = `<p>Unable to load current weather.</p>`;
    });

  // Fetch 3-day forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const forecastByDay = {};

      data.list.forEach(entry => {
        const date = new Date(entry.dt_txt).toDateString();
        if (!forecastByDay[date]) {
          forecastByDay[date] = [];
        }
        forecastByDay[date].push(entry);
      });

      forecastContainer.innerHTML = '';
      const days = Object.keys(forecastByDay).slice(1, 4); // Skip today

      days.forEach(day => {
        const entries = forecastByDay[day];
        const temps = entries.map(f => f.main.temp);
        const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
        const condition = entries[0].weather[0].description;
        const icon = entries[0].weather[0].icon;

        const div = document.createElement('div');
        div.classList.add('forecast-day');
        div.innerHTML = `
          <strong>${day}</strong><br>
          <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${condition}" /><br>
          Avg: ${avgTemp}°${units === 'imperial' ? 'F' : 'C'}<br>
          ${condition}
        `;
        forecastContainer.appendChild(div);
      });
    })
    .catch(() => {
      forecastContainer.innerHTML = `<p>Unable to load forecast.</p>`;
    });
});
