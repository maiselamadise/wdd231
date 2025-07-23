const apiKey = "YOUR_API_KEY";
const lat = 40.7128; // example: New York
const lon = -74.0060;

const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`;

fetch(weatherURL)
  .then(response => response.json())
  .then(data => {
    const weatherDiv = document.getElementById("weatherInfo");

    const current = `
      <p><strong>Current:</strong> ${data.current.temp}°F, ${data.current.weather[0].description}</p>
    `;

    const forecast = data.daily.slice(1, 4).map((day, index) => {
      const date = new Date(day.dt * 1000);
      return `<p><strong>Day ${index + 1}:</strong> ${day.temp.day}°F</p>`;
    }).join("");

    weatherDiv.innerHTML = current + "<h3>3-Day Forecast</h3>" + forecast;
  });
