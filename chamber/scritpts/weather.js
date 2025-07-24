const apiKey = "YOUR_API_KEY"; // Get from https://openweathermap.org/api
const city = "Johannesburg";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const weatherDiv = document.getElementById("weatherInfo");
    const today = data.list[0];
    const forecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    let html = `<p><strong>Today:</strong> ${today.main.temp.toFixed(1)}°C, ${today.weather[0].description}</p>`;
    html += `<h3>3-Day Forecast:</h3><ul>`;
    forecast.forEach((item) => {
      const date = new Date(item.dt_txt);
      html += `<li>${date.toDateString()}: ${item.main.temp.toFixed(1)}°C, ${item.weather[0].description}</li>`;
    });
    html += `</ul>`;
    weatherDiv.innerHTML = html;
  })
  .catch((err) => {
    console.error("Weather API error:", err);
    document.getElementById("weatherInfo").textContent = "Weather info unavailable.";
  });
