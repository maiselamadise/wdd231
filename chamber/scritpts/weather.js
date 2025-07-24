const apiKey = 'YOUR_API_KEY';
const city = 'YOUR_CITY_NAME';

const weatherContainer = document.getElementById("weatherContainer");

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    const current = data.list[0];
    const forecastDays = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    weatherContainer.innerHTML = `
      <p><strong>Current:</strong> ${current.main.temp}°C, ${current.weather[0].description}</p>
      <h4>3-Day Forecast</h4>
      <ul>
        ${forecastDays.map(day => {
          const date = new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'short' });
          return `<li>${date}: ${day.main.temp}°C, ${day.weather[0].main}</li>`;
        }).join("")}
      </ul>
    `;
  } catch (error) {
    console.error("Weather fetch error:", error);
    weatherContainer.innerHTML = "<p>Unable to load weather data.</p>";
  }
}

getWeather();
