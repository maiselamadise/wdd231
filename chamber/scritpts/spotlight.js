fetch("data/members.json")
  .then(response => response.json())
  .then(data => {
    const members = data.members.filter(member =>
      member.membership === "Gold" || member.membership === "Silver"
    );

    const shuffled = members.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2 or 3

    const container = document.getElementById("spotlightContainer");
    container.innerHTML = selected.map(member => `
      <div class="spotlight">
        <img src="${member.logo}" alt="${member.name} logo" loading="lazy" />
        <h3>${member.name}</h3>
        <p>${member.description}</p>
        <a class="button" href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      </div>
    `).join("");
  })
  .catch(error => {
    console.error("Error loading member spotlights:", error);
    document.getElementById("spotlightContainer").innerHTML = "<p>Unable to load member spotlights.</p>";
  });
