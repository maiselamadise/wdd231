const apiKey = "YOUR_API_KEY";
const lat = -26.2041;
const lon = 28.0473;
const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) throw new Error("Weather fetch failed");

    const data = await response.json();
    const weatherSection = document.getElementById("weather");

    const currentTemp = data.current.temp.toFixed(1);
    const description = data.current.weather[0].description;
    
    // Build current weather
    let content = `
      <p><strong>Current:</strong> ${currentTemp}°C, ${description}</p>
      <p><strong>3-Day Forecast:</strong></p>
      <ul>
    `;

    for (let i = 1; i <= 3; i++) {
      const day = data.daily[i];
      const dayTemp = day.temp.day.toFixed(1);
      const desc = day.weather[0].description;
      const date = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
      content += `<li>${date}: ${dayTemp}°C, ${desc}</li>`;
    }

    content += `</ul>`;
    weatherSection.innerHTML = content;

  } catch (error) {
    console.error("Weather error:", error);
    document.getElementById("weather").innerHTML = "<p>Weather unavailable</p>";
  }
}

fetchWeather();
